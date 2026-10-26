import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Globe, 
  QrCode, 
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { ExamNotesResult } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: ExamNotesResult;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  notes,
}) => {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const generateLink = async () => {
      setIsGeneratingLink(true);
      try {
        // Attempt backend share ID
        const res = await fetch('/api/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.shareId) {
            const url = `${window.location.origin}${window.location.pathname}?share=${data.shareId}`;
            setShareUrl(url);
            setIsGeneratingLink(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend share failed, falling back to URL payload encode:', err);
      }

      // Fallback: encode a safe compressed JSON summary into URL hash
      try {
        const compact = {
          t: notes.title,
          s: notes.subject,
          u: notes.unit,
          d: notes.depth,
          e: notes.executiveSummary,
          sec: notes.sections.map(sec => ({
            h: sec.heading,
            m: sec.targetMarks,
            d: sec.keyDefinition,
            b: sec.bulletPoints,
            mn: sec.mnemonic,
            dia: sec.diagram,
            ans: sec.examAnswerStructure,
          })),
          src: notes.sourcesUsed,
        };
        const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(compact)))));
        setShareUrl(`${window.location.origin}${window.location.pathname}#study=${encoded}`);
      } catch {
        setShareUrl(window.location.href);
      } finally {
        setIsGeneratingLink(false);
      }
    };

    generateLink();
  }, [isOpen, notes]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: notes.title || 'ExamPrep Notes',
          text: `Check out these exam revision notes for ${notes.title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled or not supported');
      }
    } else {
      handleCopy();
    }
  };

  // Safe QR Code URL from qrserver API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Share Study Notes
            </h3>
            <p className="text-xs text-slate-400">
              Anyone with this link can view the exact generated exam notes and diagrams
            </p>
          </div>
        </div>

        {/* Link Box */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Public Study Link:
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono truncate select-all">
                {isGeneratingLink ? 'Generating secure share link...' : shareUrl}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                disabled={isGeneratingLink}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code & Mobile Sharing */}
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 flex items-center gap-4">
            <div className="w-20 h-20 bg-white p-1 rounded-lg shadow-inner shrink-0 flex items-center justify-center">
              {shareUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code for study link"
                  className="w-full h-full object-contain"
                />
              ) : (
                <QrCode className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-200 block">
                Mobile & Group Study Friendly
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Scan to instantly read notes on iOS or Android, or send directly to classmates.
              </p>
              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex items-center gap-1 text-emerald-400 font-semibold hover:text-emerald-300 pt-1"
              >
                <Send className="w-3 h-3" />
                <span>Open Native Share Menu</span>
              </button>
            </div>
          </div>

          {/* Privacy & Grounding Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Includes all diagram visualizations, definitions, and citations.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
