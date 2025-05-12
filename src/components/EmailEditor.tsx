import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from '@/components/ui/use-toast';
import EmailTemplateLibrary from './EmailTemplateLibrary';
import html2canvas from 'html2canvas';

const EmailEditor = dynamic(() => import('react-email-editor'), { ssr: false });

const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 200;

const EmailEditorComponent: React.FC = () => {
  const emailEditorRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [templateLibraryKey, setTemplateLibraryKey] = useState(0); // for refresh
  const [lastLoadedDesign, setLastLoadedDesign] = useState<any>(null);
  const [lastLoadedHtml, setLastLoadedHtml] = useState<string | null>(null);
  const [hiddenPreviewHtml, setHiddenPreviewHtml] = useState<string | null>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const onLoad = () => {
    setEditorLoaded(true);
    // Only call loadDesign if the method exists
    if (emailEditorRef.current && typeof emailEditorRef.current.loadDesign === 'function') {
      emailEditorRef.current.loadDesign({
        body: {
          rows: [
            {
              cells: [
                {
                  content: {
                    type: 'text',
                    data: { text: 'Hello, World!' }
                  }
                }
              ]
            }
          ]
        }
      });
    }
  };

  const onUseTemplate = (design: any) => {
    if (emailEditorRef.current) {
      emailEditorRef.current.loadDesign(design);
      setLastLoadedDesign(design);
      // Optionally, export HTML after loading to update lastLoadedHtml
      emailEditorRef.current.exportHtml((data: { html: string }) => setLastLoadedHtml(data.html));
      toast({ title: 'Template loaded into editor.' });
    }
  };

  const onSave = () => {
    emailEditorRef.current?.exportHtml((data: { html: string; design: any }) => {
      setLastLoadedDesign(data.design);
      setLastLoadedHtml(data.html);
      console.log('HTML:', data.html);
      console.log('Design:', data.design);
      // Here you can save the HTML or design to your backend
    });
  };

  const onPreview = () => {
    emailEditorRef.current?.exportHtml((data: { html: string }) => {
      setPreviewHtml(data.html);
    });
  };

  const onSendTest = () => {
    emailEditorRef.current?.exportHtml((data: { html: string }) => {
      fetch('/api/email/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testEmail, html: data.html }),
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            toast({ title: 'Test email sent!', description: `Sent to ${testEmail}` });
          } else {
            toast({ title: 'Failed to send test email', description: result.error || 'Unknown error', variant: 'destructive' });
          }
        })
        .catch(err => {
          toast({ title: 'Error sending test email', description: err.message, variant: 'destructive' });
        });
    });
  };

  const onSaveAsTemplate = () => {
    const name = window.prompt('Template name?');
    if (!name) return;
    setThumbnailLoading(true);
    emailEditorRef.current?.exportHtml(async (data: { html: string; design: any }) => {
      setHiddenPreviewHtml(data.html);
      setTimeout(async () => {
        const previewDiv = document.getElementById('hidden-email-preview');
        let thumbnail = '';
        if (previewDiv) {
          const canvas = await html2canvas(previewDiv, {
            backgroundColor: '#fff',
            useCORS: true,
            width: THUMBNAIL_WIDTH,
            height: THUMBNAIL_HEIGHT,
            windowWidth: THUMBNAIL_WIDTH,
            windowHeight: THUMBNAIL_HEIGHT,
            scale: 1,
          });
          thumbnail = canvas.toDataURL('image/png');
        }
        fetch('/api/email/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, design: data.design, html: data.html, thumbnail }),
        })
          .then(res => res.json())
          .then(result => {
            if (result.error) {
              toast({ title: 'Failed to save template', description: result.error, variant: 'destructive' });
            } else {
              toast({ title: 'Template saved!', description: `Saved as "${name}"` });
              setTemplateLibraryKey(k => k + 1); // refresh library
            }
            setHiddenPreviewHtml(null);
            setThumbnailLoading(false);
          })
          .catch(err => {
            toast({ title: 'Error saving template', description: err.message, variant: 'destructive' });
            setHiddenPreviewHtml(null);
            setThumbnailLoading(false);
          });
      }, 100); // Wait for the hidden div to render
    });
  };

  return (
    <div>
      <EmailTemplateLibrary key={templateLibraryKey} onUse={onUseTemplate} lastLoadedDesign={lastLoadedDesign} lastLoadedHtml={lastLoadedHtml} />
      <div className="flex gap-2 mb-4">
        <button onClick={onSave}>Save</button>
        <button onClick={onPreview}>Preview</button>
        <button onClick={onSaveAsTemplate} disabled={thumbnailLoading}>Save as Template</button>
        {thumbnailLoading && <span className="ml-2 text-blue-600 animate-pulse">Generating thumbnail...</span>}
        <input
          type="email"
          placeholder="Test email address"
          value={testEmail}
          onChange={e => setTestEmail(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button onClick={onSendTest} disabled={!testEmail}>Send Test Email</button>
      </div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      {previewHtml && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setPreviewHtml(null)}
            >
              &times;
            </button>
            <div className="overflow-auto max-h-[70vh]" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      )}
      {/* Hidden preview for thumbnail generation */}
      {hiddenPreviewHtml && (
        <div style={{ position: 'fixed', left: -9999, top: 0, width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT, background: '#fff', overflow: 'hidden' }}>
          <div id="hidden-email-preview" style={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT, background: '#fff', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: hiddenPreviewHtml }} />
        </div>
      )}
    </div>
  );
};

export default EmailEditorComponent; 