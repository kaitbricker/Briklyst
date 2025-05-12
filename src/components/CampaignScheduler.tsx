import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface Template {
  id: string;
  name: string;
  html: string;
}
interface Campaign {
  id: string;
  templateId: string;
  subject: string;
  html: string;
  segment: string;
  scheduledAt: string;
  status: string;
  createdAt: string;
  opens?: number;
  clicks?: number;
  recipients?: number;
  linkClicks?: Record<string, number>;
}

const CampaignScheduler: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [subject, setSubject] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [segment, setSegment] = useState('all');
  const [tag, setTag] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [linkStatsCampaign, setLinkStatsCampaign] = useState<Campaign | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTemplate, setFilterTemplate] = useState('all');
  const [sortBy, setSortBy] = useState<'scheduledAt' | 'openRate' | 'clickRate'>('scheduledAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/email/templates')
      .then(res => res.json())
      .then(data => setTemplates(data));
    fetch('/api/email/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data));
    fetch('/api/email/subscribers')
      .then(res => res.json())
      .then(data => {
        const tags = Array.from(new Set(data.flatMap((s: any) => s.tags))).filter(Boolean);
        setAllTags(tags as string[]);
      });
  }, []);

  function addTrackingToHtml(html: string, campaignId: string): string {
    // Inject tracking pixel before </body>
    const pixel = `<img src="/api/email/track/open?cid=${campaignId}" width="1" height="1" style="display:none" />`;
    let trackedHtml = html.replace(/<\/body>/i, pixel + '</body>');
    // Rewrite all links
    trackedHtml = trackedHtml.replace(/<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>/gi, (match, pre, href, post) => {
      if (href.startsWith('/api/email/track/click')) return match; // already rewritten
      const encodedUrl = encodeURIComponent(href);
      return `<a ${pre}href="/api/email/track/click?cid=${campaignId}&url=${encodedUrl}"${post}>`;
    });
    return trackedHtml;
  }

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !templateId || !scheduledAt) {
      toast({ title: 'Please fill all required fields.' });
      return;
    }
    setScheduling(true);
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    const seg = segment === 'tag' ? tag : 'all';
    // Generate a temporary campaign id for tracking (will be replaced by backend id, but works for MVP)
    const tempId = (Date.now() + Math.random()).toString();
    const trackedHtml = addTrackingToHtml(template.html, tempId);
    fetch('/api/email/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId,
        subject,
        html: trackedHtml,
        segment: seg,
        scheduledAt,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          toast({ title: 'Failed to schedule campaign', description: result.error, variant: 'destructive' });
        } else {
          toast({ title: 'Campaign scheduled!', description: result.subject });
          setCampaigns(c => [result, ...c]);
          setSubject('');
          setTemplateId('');
          setSegment('all');
          setTag('');
          setScheduledAt('');
        }
        setScheduling(false);
      })
      .catch(err => {
        toast({ title: 'Error scheduling campaign', description: err.message, variant: 'destructive' });
        setScheduling(false);
      });
  };

  const handleCancel = async (id: string) => {
    if (!window.confirm('Cancel this campaign?')) return;
    const res = await fetch('/api/email/campaigns', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const result = await res.json();
    if (result.success) {
      toast({ title: 'Campaign canceled.' });
      setCampaigns(campaigns => campaigns.filter(c => c.id !== id));
    } else {
      toast({ title: 'Failed to cancel campaign', description: result.error || 'Unknown error', variant: 'destructive' });
    }
  };

  const handleReschedule = async (id: string, current: string) => {
    const newDate = window.prompt('New date/time (YYYY-MM-DDTHH:mm):', current.slice(0, 16));
    if (!newDate) return;
    const res = await fetch('/api/email/campaigns', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, scheduledAt: newDate }),
    });
    const result = await res.json();
    if (!result.error) {
      toast({ title: 'Campaign rescheduled.' });
      setCampaigns(campaigns => campaigns.map(c => c.id === id ? result : c));
    } else {
      toast({ title: 'Failed to reschedule', description: result.error, variant: 'destructive' });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Schedule Campaign</h2>
      <form onSubmit={handleSchedule} className="flex flex-col gap-3 mb-8 max-w-xl">
        <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="border rounded px-2 py-1" required>
          <option value="">Select Template</option>
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="border rounded px-2 py-1"
          required
        />
        <div className="flex gap-2 items-center">
          <label>
            <input type="radio" name="segment" value="all" checked={segment === 'all'} onChange={() => setSegment('all')} /> All Subscribers
          </label>
          <label>
            <input type="radio" name="segment" value="tag" checked={segment === 'tag'} onChange={() => setSegment('tag')} /> By Tag
          </label>
          {segment === 'tag' && (
            <select value={tag} onChange={e => setTag(e.target.value)} className="border rounded px-2 py-1">
              <option value="">Select Tag</option>
              {allTags.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          )}
        </div>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={e => setScheduledAt(e.target.value)}
          className="border rounded px-2 py-1"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={scheduling}>
          {scheduling ? 'Scheduling...' : 'Schedule Campaign'}
        </button>
      </form>
      <h3 className="text-lg font-bold mb-2">Scheduled & Sent Campaigns</h3>
      {loading ? (
        <div>Loading campaigns...</div>
      ) : (
        <table className="w-full border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Template</th>
              <th className="p-2 text-left">Segment</th>
              <th className="p-2 text-left">Scheduled At</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Recipients</th>
              <th className="p-2 text-left">Opens</th>
              <th className="p-2 text-left">Clicks</th>
              <th className="p-2 text-left">Open Rate</th>
              <th className="p-2 text-left">Click Rate</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.subject}</td>
                <td className="p-2">{templates.find(t => t.id === c.templateId)?.name || 'N/A'}</td>
                <td className="p-2">{c.segment === 'all' ? 'All' : c.segment}</td>
                <td className="p-2">{new Date(c.scheduledAt).toLocaleString()}</td>
                <td className="p-2">{c.status}</td>
                <td className="p-2">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="p-2">{c.recipients ?? 0}</td>
                <td className="p-2">{c.opens ?? 0}</td>
                <td className="p-2">{c.clicks ?? 0}</td>
                <td className="p-2">{c.recipients ? ((c.opens ?? 0) / c.recipients * 100).toFixed(1) : '0.0'}%</td>
                <td className="p-2">{c.recipients ? ((c.clicks ?? 0) / c.recipients * 100).toFixed(1) : '0.0'}%</td>
                <td className="p-2 flex gap-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setLinkStatsCampaign(c)}>
                    View Link Stats
                  </button>
                  {c.status === 'scheduled' && (
                    <>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleReschedule(c.id, c.scheduledAt)}>
                        Reschedule
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleCancel(c.id)}>
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Link Stats Modal */}
      {linkStatsCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setLinkStatsCampaign(null)}
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-4">Link Click Stats</h4>
            {linkStatsCampaign.linkClicks && Object.keys(linkStatsCampaign.linkClicks).length > 0 ? (
              <table className="w-full border rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Link</th>
                    <th className="p-2 text-left">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(linkStatsCampaign.linkClicks).map(([url, count]) => (
                    <tr key={url} className="border-t">
                      <td className="p-2 break-all"><a href={decodeURIComponent(url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{decodeURIComponent(url)}</a></td>
                      <td className="p-2">{count as number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No link clicks tracked for this campaign yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignScheduler; 