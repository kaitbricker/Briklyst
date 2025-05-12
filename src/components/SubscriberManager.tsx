import React, { useEffect, useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import Papa from 'papaparse';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  tags: string[];
  createdAt: string;
}

const SubscriberManager: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [adding, setAdding] = useState(false);
  const [importing, setImporting] = useState(false);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editName, setEditName] = useState('');
  const [editTags, setEditTags] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkTag, setBulkTag] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkRemoveTag, setBulkRemoveTag] = useState('');

  const fetchSubscribers = () => {
    setLoading(true);
    fetch('/api/email/subscribers')
      .then(res => res.json())
      .then(data => setSubscribers(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Get all unique tags for filter dropdown
  const allTags = Array.from(new Set(subscribers.flatMap(s => s.tags))).filter(Boolean);

  // Filtered subscribers based on search and tag
  const filteredSubscribers = subscribers.filter(s => {
    const matchesSearch =
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter ? s.tags.includes(tagFilter) : true;
    return matchesSearch && matchesTag;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    fetch('/api/email/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, tags: tags.split(',').map(t => t.trim()).filter(Boolean) }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          toast({ title: 'Failed to add subscriber', description: result.error, variant: 'destructive' });
        } else {
          toast({ title: 'Subscriber added!', description: result.email });
          setEmail('');
          setName('');
          setTags('');
          fetchSubscribers();
        }
        setAdding(false);
      })
      .catch(err => {
        toast({ title: 'Error adding subscriber', description: err.message, variant: 'destructive' });
        setAdding(false);
      });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this subscriber?')) return;
    fetch('/api/email/subscribers', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          toast({ title: 'Subscriber deleted.' });
          fetchSubscribers();
        } else {
          toast({ title: 'Failed to delete subscriber', description: result.error || 'Unknown error', variant: 'destructive' });
        }
      })
      .catch(err => {
        toast({ title: 'Error deleting subscriber', description: err.message, variant: 'destructive' });
      });
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(
      subscribers.map(({ email, name, tags }) => ({
        email,
        name,
        tags: tags.join(', '),
      }))
    );
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        let imported = 0;
        let failed = 0;
        for (const row of results.data as any[]) {
          if (!row.email) continue;
          const res = await fetch('/api/email/subscribers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: row.email,
              name: row.name || '',
              tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
            }),
          });
          const result = await res.json();
          if (result.error) failed++;
          else imported++;
        }
        toast({ title: 'Import complete', description: `${imported} imported, ${failed} failed.` });
        setImporting(false);
        fetchSubscribers();
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
      error: (err) => {
        toast({ title: 'CSV import error', description: err.message, variant: 'destructive' });
        setImporting(false);
      },
    });
  };

  const startEdit = (s: Subscriber) => {
    setEditingId(s.id);
    setEditEmail(s.email);
    setEditName(s.name);
    setEditTags(s.tags.join(', '));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditEmail('');
    setEditName('');
    setEditTags('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setEditLoading(true);
    fetch('/api/email/subscribers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId,
        email: editEmail,
        name: editName,
        tags: editTags.split(',').map(t => t.trim()).filter(Boolean),
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          toast({ title: 'Failed to update subscriber', description: result.error, variant: 'destructive' });
        } else {
          toast({ title: 'Subscriber updated!', description: result.email });
          fetchSubscribers();
          cancelEdit();
        }
        setEditLoading(false);
      })
      .catch(err => {
        toast({ title: 'Error updating subscriber', description: err.message, variant: 'destructive' });
        setEditLoading(false);
      });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  const selectAll = () => {
    setSelectedIds(filteredSubscribers.map(s => s.id));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const handleBulkDelete = async () => {
    if (!window.confirm('Delete selected subscribers?')) return;
    setBulkLoading(true);
    let deleted = 0, failed = 0;
    for (const id of selectedIds) {
      const res = await fetch('/api/email/subscribers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) deleted++; else failed++;
    }
    toast({ title: 'Bulk delete complete', description: `${deleted} deleted, ${failed} failed.` });
    setBulkLoading(false);
    clearSelection();
    fetchSubscribers();
  };

  const handleBulkTag = async () => {
    if (!bulkTag) return toast({ title: 'Enter a tag to add.' });
    setBulkLoading(true);
    let updated = 0, failed = 0;
    for (const id of selectedIds) {
      const sub = subscribers.find(s => s.id === id);
      if (!sub) continue;
      const tags = Array.from(new Set([...sub.tags, bulkTag]));
      const res = await fetch('/api/email/subscribers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email: sub.email, name: sub.name, tags }),
      });
      const result = await res.json();
      if (!result.error) updated++; else failed++;
    }
    toast({ title: 'Bulk tag complete', description: `${updated} updated, ${failed} failed.` });
    setBulkLoading(false);
    setBulkTag('');
    clearSelection();
    fetchSubscribers();
  };

  const handleBulkRemoveTag = async () => {
    if (!bulkRemoveTag) return toast({ title: 'Enter a tag to remove.' });
    setBulkLoading(true);
    let updated = 0, failed = 0;
    for (const id of selectedIds) {
      const sub = subscribers.find(s => s.id === id);
      if (!sub) continue;
      const tags = sub.tags.filter(t => t !== bulkRemoveTag);
      const res = await fetch('/api/email/subscribers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email: sub.email, name: sub.name, tags }),
      });
      const result = await res.json();
      if (!result.error) updated++; else failed++;
    }
    toast({ title: 'Bulk tag removal complete', description: `${updated} updated, ${failed} failed.` });
    setBulkLoading(false);
    setBulkRemoveTag('');
    clearSelection();
    fetchSubscribers();
  };

  const handleExportSelectedCSV = () => {
    const selectedSubs = subscribers.filter(s => selectedIds.includes(s.id));
    if (selectedSubs.length === 0) return toast({ title: 'No subscribers selected.' });
    const csv = Papa.unparse(
      selectedSubs.map(({ email, name, tags }) => ({
        email,
        name,
        tags: tags.join(', '),
      }))
    );
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Subscribers</h2>
      <div className="flex gap-2 mb-4 flex-wrap">
        <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={handleExportCSV}>
          Export CSV
        </button>
        <label className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer">
          {importing ? 'Importing...' : 'Import CSV'}
          <input
            type="file"
            accept=".csv"
            onChange={handleImportCSV}
            ref={fileInputRef}
            className="hidden"
            disabled={importing}
          />
        </label>
        <input
          type="text"
          placeholder="Search by email or name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={tagFilter}
          onChange={e => setTagFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 mb-2 flex-wrap">
        <button className="bg-gray-200 px-3 py-1 rounded" onClick={selectAll} disabled={filteredSubscribers.length === 0}>Select All</button>
        <button className="bg-gray-200 px-3 py-1 rounded" onClick={clearSelection} disabled={selectedIds.length === 0}>Clear Selection</button>
        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={handleBulkDelete} disabled={selectedIds.length === 0 || bulkLoading}>Bulk Delete</button>
        <input
          type="text"
          placeholder="Tag to add"
          value={bulkTag}
          onChange={e => setBulkTag(e.target.value)}
          className="border rounded px-2 py-1"
          disabled={bulkLoading}
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleBulkTag} disabled={selectedIds.length === 0 || bulkLoading}>Bulk Add Tag</button>
        <input
          type="text"
          placeholder="Tag to remove"
          value={bulkRemoveTag}
          onChange={e => setBulkRemoveTag(e.target.value)}
          className="border rounded px-2 py-1"
          disabled={bulkLoading}
        />
        <button className="bg-yellow-600 text-white px-3 py-1 rounded" onClick={handleBulkRemoveTag} disabled={selectedIds.length === 0 || bulkLoading}>Bulk Remove Tag</button>
        <button className="bg-green-700 text-white px-3 py-1 rounded" onClick={handleExportSelectedCSV} disabled={selectedIds.length === 0}>Export Selected</button>
        {bulkLoading && <span className="ml-2 text-blue-600 animate-pulse">Processing...</span>}
      </div>
      {loading ? (
        <div>Loading subscribers...</div>
      ) : (
        <table className="w-full border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left w-8"><input type="checkbox" checked={selectedIds.length === filteredSubscribers.length && filteredSubscribers.length > 0} onChange={e => e.target.checked ? selectAll() : clearSelection()} /></th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Tags</th>
              <th className="p-2 text-left">Added</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-2"><input type="checkbox" checked={selectedIds.includes(s.id)} onChange={() => toggleSelect(s.id)} /></td>
                {editingId === s.id ? (
                  <>
                    <td className="p-2">
                      <input
                        type="email"
                        value={editEmail}
                        onChange={e => setEditEmail(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={editTags}
                        onChange={e => setEditTags(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
                    <td className="p-2 flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleEditSave as any} disabled={editLoading}>
                        {editLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded" onClick={cancelEdit} disabled={editLoading}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{s.email}</td>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.tags.join(', ')}</td>
                    <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
                    <td className="p-2 flex gap-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => startEdit(s)}>
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(s.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubscriberManager; 