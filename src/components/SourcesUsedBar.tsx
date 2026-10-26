import React from 'react';
import { 
  ShieldCheck, 
  BookMarked, 
  FileCode, 
  FileText, 
  ChevronRight,
  Info
} from 'lucide-react';
import { FileRole } from '../types';

interface SourceUsedItem {
  fileName: string;
  page: string;
  role: FileRole;
  relevance: string;
}

interface SourcesUsedBarProps {
  sources: SourceUsedItem[];
  onInspectFileByName: (fileName: string) => void;
}

export const SourcesUsedBar: React.FC<SourcesUsedBarProps> = ({
  sources,
  onInspectFileByName,
}) => {
  if (!sources || sources.length === 0) return null;

  const getRoleIcon = (role: FileRole) => {
    switch (role) {
      case 'syllabus':
        return <BookMarked className="w-3.5 h-3.5 text-blue-400" />;
      case 'model_paper':
        return <FileCode className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div
      className="no-print px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs"
      style={{
        background: 'linear-gradient(135deg, #071e2b, #09293d)',
        boxShadow: '0 -2px 12px rgba(2,12,18,0.5), inset 0 1px 0 rgba(23,134,180,0.1)',
        borderTop: '1px solid rgba(23,134,180,0.15)',
      }}
    >
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        <span className="font-semibold flex items-center gap-1.5 shrink-0" style={{ color: 'rgba(152,213,238,0.7)' }}>
          <ShieldCheck size={14} color="#34d399" />
          <span>Sources:</span>
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          {sources.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onInspectFileByName(src.fileName)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 transition-all"
              style={{
                background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
                boxShadow: '2px 2px 6px rgba(2,12,18,0.55), -1px -1px 4px rgba(15,94,131,0.1)',
                border: '1px solid rgba(23,134,180,0.2)',
                borderRadius: 999,
                color: 'rgba(152,213,238,0.7)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              title={`${src.relevance} (Click to inspect source text)`}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(79,179,218,0.4)';
                e.currentTarget.style.color = '#E1F2FA';
                e.currentTarget.style.boxShadow = '2px 2px 8px rgba(2,12,18,0.65), -1px -1px 5px rgba(23,134,180,0.15), 0 0 10px rgba(23,134,180,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(23,134,180,0.2)';
                e.currentTarget.style.color = 'rgba(152,213,238,0.7)';
                e.currentTarget.style.boxShadow = '2px 2px 6px rgba(2,12,18,0.55), -1px -1px 4px rgba(15,94,131,0.1)';
              }}
            >
              {getRoleIcon(src.role)}
              <span style={{ fontWeight: 600, fontSize: 11 }}>{src.fileName}</span>
              <span
                style={{
                  fontSize: 9.5,
                  padding: '1px 6px',
                  borderRadius: 999,
                  background: 'rgba(23,134,180,0.15)',
                  border: '1px solid rgba(23,134,180,0.2)',
                  color: '#4FB3DA',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                }}
              >
                {src.page}
              </span>
              <ChevronRight size={11} style={{ opacity: 0.4 }} />
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-1.5" style={{ fontSize: 10.5, color: 'rgba(152,213,238,0.3)' }}>
        <Info size={12} />
        <span>Grounded RAG · Zero hallucinations · Direct citations</span>
      </div>
    </div>
  );
};
