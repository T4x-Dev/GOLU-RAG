import React from 'react';
import {
  GraduationCap,
  Download,
  Share2,
  Sparkles,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onOpenDownload: () => void;
  onOpenShare: () => void;
  onLoadSample: () => void;
  enableThinking: boolean;
  onToggleThinking: () => void;
  isGenerating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onTitleChange,
  onOpenDownload,
  onOpenShare,
  onLoadSample,
  enableThinking,
  onToggleThinking,
  isGenerating,
}) => {
  return (
    <header
      className="no-print sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6"
      style={{
        background: 'linear-gradient(135deg, #071e2b 0%, #09293d 100%)',
        boxShadow: '0 4px 20px rgba(2,12,18,0.7), inset 0 -1px 0 rgba(23,134,180,0.15)',
        borderBottom: '1px solid rgba(23,134,180,0.18)',
      }}
    >
      {/* Brand & Document Title */}
      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1 mr-4">
        <div className="flex items-center space-x-2.5 shrink-0">
          {/* Logo */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #1786B4, #4FB3DA)',
              boxShadow: '4px 4px 12px rgba(2,12,18,0.7), -2px -2px 8px rgba(23,134,180,0.2), 0 0 20px rgba(23,134,180,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(79,179,218,0.35)',
              flexShrink: 0,
            }}
          >
            <GraduationCap size={20} color="#E1F2FA" strokeWidth={2.5} />
          </div>

          <div className="hidden sm:block">
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.3px', color: '#E1F2FA', lineHeight: 1.1 }}>
                GOLU
              </span>
              <span
                style={{
                  fontSize: 10,
                  padding: '2px 8px',
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, rgba(23,134,180,0.25), rgba(15,94,131,0.2))',
                  border: '1px solid rgba(79,179,218,0.35)',
                  color: '#4FB3DA',
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  boxShadow: '2px 2px 6px rgba(2,12,18,0.5), -1px -1px 4px rgba(23,134,180,0.12)',
                }}
              >
                AI
              </span>
            </div>
            <span style={{ fontSize: 9.5, color: 'rgba(152,213,238,0.45)', fontWeight: 500, letterSpacing: 0.3, display: 'block', lineHeight: 1 }}>
              Genius Optimizing Learning Universally
            </span>
          </div>
        </div>

        <div style={{ width: 1, height: 24, background: 'rgba(23,134,180,0.25)' }} className="hidden sm:block" />

        {/* Editable Title */}
        <div className="flex items-center space-x-2 min-w-0 flex-1 max-w-xl">
          <BookOpen size={14} color="rgba(152,213,238,0.4)" className="shrink-0 hidden md:block" />
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full text-sm sm:text-base font-semibold truncate transition-all outline-none"
            style={{
              background: 'transparent',
              color: '#E1F2FA',
              padding: '6px 10px',
              borderRadius: 10,
              border: '1px solid transparent',
              transition: 'all 0.2s',
            }}
            onFocus={e => {
              e.currentTarget.style.background = 'linear-gradient(145deg, #061929, #0a2d40)';
              e.currentTarget.style.boxShadow = 'inset 3px 3px 8px rgba(2,12,18,0.7), inset -2px -2px 6px rgba(15,94,131,0.15)';
              e.currentTarget.style.borderColor = 'rgba(23,134,180,0.3)';
            }}
            onBlur={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            placeholder="Document Title (e.g., Operating Systems – Unit 2)"
            title="Click to rename notes"
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
        {/* Deep Thinking Toggle */}
        <button
          onClick={onToggleThinking}
          type="button"
          title="Deep Reasoning Mode for tough university exam proofs & 10M questions"
          className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all"
          style={enableThinking ? {
            background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
            boxShadow: '3px 3px 10px rgba(2,12,18,0.65), -2px -2px 7px rgba(15,94,131,0.12), 0 0 16px rgba(139,92,246,0.2)',
            border: '1px solid rgba(139,92,246,0.35)',
            color: '#c4b5fd',
          } : {
            background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
            boxShadow: '3px 3px 10px rgba(2,12,18,0.65), -2px -2px 7px rgba(15,94,131,0.12)',
            border: '1px solid rgba(23,134,180,0.2)',
            color: 'rgba(152,213,238,0.55)',
          }}
        >
          <Sparkles size={13} style={{ color: enableThinking ? '#a78bfa' : 'rgba(152,213,238,0.4)' }} className={enableThinking ? 'animate-pulse' : ''} />
          <span>Deep Reasoning {enableThinking ? 'ON' : 'OFF'}</span>
        </button>

        {/* Load Sample */}
        <button
          onClick={onLoadSample}
          type="button"
          title="Load pre-built Operating Systems Unit 2 exam pack"
          className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all"
          style={{
            background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
            boxShadow: '3px 3px 10px rgba(2,12,18,0.65), -2px -2px 7px rgba(15,94,131,0.12)',
            border: '1px solid rgba(23,134,180,0.2)',
            color: 'rgba(152,213,238,0.7)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(79,179,218,0.4)';
            e.currentTarget.style.color = '#E1F2FA';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(23,134,180,0.2)';
            e.currentTarget.style.color = 'rgba(152,213,238,0.7)';
          }}
        >
          <RotateCcw size={12} color="#4FB3DA" />
          <span>Load Sample</span>
        </button>

        {/* Download */}
        <button
          onClick={onOpenDownload}
          type="button"
          disabled={isGenerating}
          className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl transition-all disabled:opacity-50 disabled:pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #1786B4, #0F5E83)',
            boxShadow: '4px 4px 14px rgba(2,12,18,0.7), -2px -2px 8px rgba(23,134,180,0.2), 0 0 20px rgba(23,134,180,0.25)',
            border: '1px solid rgba(79,179,218,0.35)',
            color: '#E1F2FA',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #4FB3DA, #1786B4)';
            e.currentTarget.style.boxShadow = '4px 4px 18px rgba(2,12,18,0.8), -2px -2px 10px rgba(79,179,218,0.25), 0 0 28px rgba(79,179,218,0.35)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #1786B4, #0F5E83)';
            e.currentTarget.style.boxShadow = '4px 4px 14px rgba(2,12,18,0.7), -2px -2px 8px rgba(23,134,180,0.2), 0 0 20px rgba(23,134,180,0.25)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Download size={15} />
          <span>Download</span>
        </button>

        {/* Share */}
        <button
          onClick={onOpenShare}
          type="button"
          className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all"
          style={{
            background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
            boxShadow: '3px 3px 10px rgba(2,12,18,0.65), -2px -2px 7px rgba(15,94,131,0.12)',
            border: '1px solid rgba(23,134,180,0.2)',
            color: 'rgba(152,213,238,0.8)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(79,179,218,0.4)';
            e.currentTarget.style.color = '#E1F2FA';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(23,134,180,0.2)';
            e.currentTarget.style.color = 'rgba(152,213,238,0.8)';
          }}
        >
          <Share2 size={15} color="#4FB3DA" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </header>
  );
};
