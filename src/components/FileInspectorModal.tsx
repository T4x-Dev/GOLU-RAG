import React from 'react';
import { X, BookMarked, FileCode, FileText, CheckCircle2 } from 'lucide-react';
import { SourceFile, FileRole } from '../types';

interface FileInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: SourceFile | null;
}

export const FileInspectorModal: React.FC<FileInspectorModalProps> = ({
  isOpen,
  onClose,
  file,
}) => {
  if (!isOpen || !file) return null;

  const getRoleBadge = (role: FileRole) => {
    switch (role) {
      case 'syllabus':
        return (
          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
            <BookMarked className="w-3.5 h-3.5" /> 📘 Syllabus (Topic Scope)
          </span>
        );
      case 'model_paper':
        return (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
            <FileCode className="w-3.5 h-3.5" /> 📝 Model Paper (Question Weightage)
          </span>
        );
      default:
        return (
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> 📎 Handouts / Notes (Technical Proofs)
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {getRoleBadge(file.role)}
            <span className="text-xs text-slate-400 font-mono">
              {file.pageCount} pages • {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
          <h3 className="text-lg font-bold text-white truncate">
            {file.name}
          </h3>
          {file.summary && (
            <p className="text-xs text-slate-400 mt-1">
              {file.summary}
            </p>
          )}
        </div>

        {/* Key Topics Extracted */}
        {file.keyTopics && file.keyTopics.length > 0 && (
          <div className="mb-4 p-3 bg-slate-800/60 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Extracted Topics & Terms:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {file.keyTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Extracted Raw Content */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          <span className="text-xs font-bold text-slate-300 block">
            Extracted Document Text for RAG Grounding:
          </span>
          <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-800 selection:bg-blue-600">
            {file.extractedText || 'No text content available.'}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 mt-4 flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Grounding Source
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
