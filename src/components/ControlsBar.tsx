import React from 'react';
import {
  FileText,
  PenTool,
  Flame,
  Columns,
  Sparkles,
  Zap,
  FileSignature
} from 'lucide-react';
import { OutputFormat, DepthMode, MarksFilter } from '../types';

interface ControlsBarProps {
  outputFormat: OutputFormat;
  onOutputFormatChange: (format: OutputFormat) => void;
  depth: DepthMode;
  onDepthChange: (depth: DepthMode) => void;
  marksFilter: MarksFilter;
  onMarksFilterChange: (filter: MarksFilter) => void;
  activeTab: 'notes' | 'questions' | 'comparisons' | 'flashcards' | 'practice';
  onActiveTabChange: (tab: 'notes' | 'questions' | 'comparisons' | 'flashcards' | 'practice') => void;
  handwritingFont: 'kalam' | 'caveat' | 'patrick';
  onHandwritingFontChange: (font: 'kalam' | 'caveat' | 'patrick') => void;
  paperPattern: 'ruled' | 'grid';
  onPaperPatternChange: (pattern: 'ruled' | 'grid') => void;
  importantQuestionsCount: number;
  comparisonsCount: number;
  flashcardsCount: number;
}

const NEU_ACTIVE: React.CSSProperties = {
  background: 'linear-gradient(145deg, #061929, #0a2d40)',
  boxShadow: 'inset 3px 3px 8px rgba(2,12,18,0.75), inset -2px -2px 6px rgba(15,94,131,0.15)',
  border: '1px solid rgba(23,134,180,0.3)',
  borderRadius: 10,
};

const NEU_INACTIVE: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: 10,
};

const NEU_TOGGLE_WRAP: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  padding: 4,
  background: 'linear-gradient(145deg, #061929, #0a2d40)',
  boxShadow: 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)',
  border: '1px solid rgba(7,30,43,0.8)',
  borderRadius: 14,
};

const NEU_SELECT: React.CSSProperties = {
  background: 'linear-gradient(145deg, #061929, #0a2d40)',
  boxShadow: 'inset 2px 2px 6px rgba(2,12,18,0.7), inset -1px -1px 4px rgba(15,94,131,0.12)',
  border: '1px solid rgba(23,134,180,0.2)',
  borderRadius: 10,
  color: '#E1F2FA',
  padding: '5px 10px',
  fontSize: 11,
  fontWeight: 600,
  outline: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

export const ControlsBar: React.FC<ControlsBarProps> = ({
  outputFormat,
  onOutputFormatChange,
  depth,
  onDepthChange,
  marksFilter,
  onMarksFilterChange,
  activeTab,
  onActiveTabChange,
  handwritingFont,
  onHandwritingFontChange,
  paperPattern,
  onPaperPatternChange,
  importantQuestionsCount,
  comparisonsCount,
  flashcardsCount,
}) => {
  return (
    <div
      className="no-print px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-10"
      style={{
        background: 'linear-gradient(135deg, #071e2b, #09293d)',
        boxShadow: '0 4px 16px rgba(2,12,18,0.65), inset 0 1px 0 rgba(23,134,180,0.1)',
        borderBottom: '1px solid rgba(23,134,180,0.15)',
      }}
    >
      {/* Left: Format Toggle & View Tabs */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Output Format Toggle */}
        <div style={NEU_TOGGLE_WRAP}>
          <button
            type="button"
            onClick={() => onOutputFormatChange('document')}
            className="flex items-center space-x-1.5 px-3 py-1.5 font-semibold transition-all"
            style={{
              ...(outputFormat === 'document' ? {
                background: 'linear-gradient(135deg, #1786B4, #0F5E83)',
                boxShadow: '3px 3px 8px rgba(2,12,18,0.6), -1px -1px 5px rgba(23,134,180,0.15), 0 0 14px rgba(23,134,180,0.2)',
                border: '1px solid rgba(79,179,218,0.3)',
                color: '#E1F2FA',
              } : {
                background: 'transparent',
                border: '1px solid transparent',
                color: 'rgba(152,213,238,0.5)',
              }),
              borderRadius: 10,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <FileText size={13} />
            <span>Document</span>
          </button>
          <button
            type="button"
            onClick={() => onOutputFormatChange('handwritten')}
            className="flex items-center space-x-1.5 px-3 py-1.5 font-semibold transition-all"
            style={{
              ...(outputFormat === 'handwritten' ? {
                background: 'linear-gradient(135deg, #92400e, #78350f)',
                boxShadow: '3px 3px 8px rgba(2,12,18,0.6), -1px -1px 5px rgba(251,191,36,0.12), 0 0 14px rgba(245,158,11,0.2)',
                border: '1px solid rgba(251,191,36,0.3)',
                color: '#fde68a',
              } : {
                background: 'transparent',
                border: '1px solid transparent',
                color: 'rgba(152,213,238,0.5)',
              }),
              borderRadius: 10,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <PenTool size={13} />
            <span>Handwritten</span>
          </button>
        </div>

        {/* View Tabs */}
        <div
          className="flex items-center gap-1"
          style={{
            borderLeft: '1px solid rgba(23,134,180,0.2)',
            paddingLeft: 12,
          }}
        >
          {/* Notes */}
          <button
            type="button"
            onClick={() => onActiveTabChange('notes')}
            className="px-2.5 py-1.5 font-semibold transition-all"
            style={{
              ...(activeTab === 'notes' ? NEU_ACTIVE : NEU_INACTIVE),
              color: activeTab === 'notes' ? '#4FB3DA' : 'rgba(152,213,238,0.5)',
              fontSize: 11,
              fontWeight: activeTab === 'notes' ? 700 : 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Notes Preview
          </button>

          {/* Questions */}
          <button
            type="button"
            onClick={() => onActiveTabChange('questions')}
            className="flex items-center space-x-1 px-2.5 py-1.5 font-semibold transition-all"
            style={{
              ...(activeTab === 'questions' ? {
                ...NEU_ACTIVE,
                boxShadow: 'inset 3px 3px 8px rgba(2,12,18,0.75), inset -2px -2px 6px rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.25)',
              } : NEU_INACTIVE),
              color: activeTab === 'questions' ? '#fbbf24' : 'rgba(152,213,238,0.5)',
              fontSize: 11,
              fontWeight: activeTab === 'questions' ? 700 : 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Flame size={12} style={{ color: '#f59e0b' }} />
            <span>Important Qs</span>
            <span
              style={{
                marginLeft: 2,
                padding: '0 5px',
                borderRadius: 999,
                background: 'rgba(245,158,11,0.15)',
                border: '1px solid rgba(245,158,11,0.25)',
                color: '#fbbf24',
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {importantQuestionsCount}
            </span>
          </button>

          {/* Comparisons */}
          <button
            type="button"
            onClick={() => onActiveTabChange('comparisons')}
            className="flex items-center space-x-1 px-2.5 py-1.5 font-semibold transition-all"
            style={{
              ...(activeTab === 'comparisons' ? NEU_ACTIVE : NEU_INACTIVE),
              color: activeTab === 'comparisons' ? '#818cf8' : 'rgba(152,213,238,0.5)',
              fontSize: 11,
              fontWeight: activeTab === 'comparisons' ? 700 : 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Columns size={12} style={{ color: '#818cf8' }} />
            <span>Comparisons</span>
            {comparisonsCount > 0 && (
              <span
                style={{
                  marginLeft: 2,
                  padding: '0 5px',
                  borderRadius: 999,
                  background: 'rgba(129,140,248,0.15)',
                  border: '1px solid rgba(129,140,248,0.25)',
                  color: '#818cf8',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {comparisonsCount}
              </span>
            )}
          </button>

          {/* Flashcards */}
          <button
            type="button"
            onClick={() => onActiveTabChange('flashcards')}
            className="flex items-center space-x-1 px-2.5 py-1.5 font-semibold transition-all"
            style={{
              ...(activeTab === 'flashcards' ? NEU_ACTIVE : NEU_INACTIVE),
              color: activeTab === 'flashcards' ? '#34d399' : 'rgba(152,213,238,0.5)',
              fontSize: 11,
              fontWeight: activeTab === 'flashcards' ? 700 : 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Sparkles size={12} style={{ color: '#34d399' }} />
            <span>Flashcards</span>
            {flashcardsCount > 0 && (
              <span
                style={{
                  marginLeft: 2,
                  padding: '0 5px',
                  borderRadius: 999,
                  background: 'rgba(52,211,153,0.12)',
                  border: '1px solid rgba(52,211,153,0.25)',
                  color: '#34d399',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {flashcardsCount}
              </span>
            )}
          </button>

          {/* Practice Exam */}
          <button
            type="button"
            onClick={() => onActiveTabChange('practice')}
            className="flex items-center space-x-1 px-2.5 py-1.5 font-semibold transition-all"
            style={{
              ...(activeTab === 'practice' ? NEU_ACTIVE : NEU_INACTIVE),
              color: activeTab === 'practice' ? '#c084fc' : 'rgba(152,213,238,0.5)',
              fontSize: 11,
              fontWeight: activeTab === 'practice' ? 700 : 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <FileSignature size={12} style={{ color: '#c084fc' }} />
            <span>Practice Exam</span>
          </button>
        </div>
      </div>

      {/* Right: Depth & Marks Filters & Handwritten Stylings */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {/* Handwritten Specific Controls */}
        {outputFormat === 'handwritten' && (
          <div
            className="flex items-center space-x-2 px-2.5 py-1.5"
            style={{
              background: 'linear-gradient(145deg, #2d1a00, #1c1000)',
              boxShadow: 'inset 2px 2px 7px rgba(2,12,18,0.7), inset -1px -1px 4px rgba(251,191,36,0.08)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 11, color: '#fbbf24', fontWeight: 600 }}>Font:</span>
            <select
              value={handwritingFont}
              onChange={(e) => onHandwritingFontChange(e.target.value as any)}
              style={{ ...NEU_SELECT, background: 'rgba(2,12,18,0.6)', border: '1px solid rgba(245,158,11,0.2)', color: '#fde68a' }}
            >
              <option value="kalam">Kalam (Indian Style)</option>
              <option value="caveat">Caveat (Cursive)</option>
              <option value="patrick">Patrick Hand (Felt Tip)</option>
            </select>
            <span style={{ fontSize: 11, color: '#fbbf24', fontWeight: 600 }}>Paper:</span>
            <select
              value={paperPattern}
              onChange={(e) => onPaperPatternChange(e.target.value as any)}
              style={{ ...NEU_SELECT, background: 'rgba(2,12,18,0.6)', border: '1px solid rgba(245,158,11,0.2)', color: '#fde68a' }}
            >
              <option value="ruled">Ruled Notebook</option>
              <option value="grid">Engineering Grid</option>
            </select>
          </div>
        )}

        {/* Depth Mode Selector */}
        <div
          className="flex items-center space-x-1.5 px-2.5 py-1.5"
          style={NEU_SELECT as any}
        >
          <Zap size={12} color="#facc15" />
          <span style={{ fontSize: 10, color: 'rgba(152,213,238,0.5)', fontWeight: 600 }}>Depth:</span>
          <select
            value={depth}
            onChange={(e) => onDepthChange(e.target.value as DepthMode)}
            style={{ background: 'transparent', color: '#E1F2FA', fontWeight: 600, outline: 'none', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}
          >
            <option value="quick" style={{ background: '#071e2b' }}>Quick Revision</option>
            <option value="standard" style={{ background: '#071e2b' }}>Standard Exam Prep</option>
            <option value="mastery" style={{ background: '#071e2b' }}>10-Mark Mastery</option>
          </select>
        </div>

        {/* Marks Filter */}
        <div
          className="flex items-center space-x-1.5 px-2.5 py-1.5"
          style={NEU_SELECT as any}
        >
          <span style={{ fontSize: 10, color: 'rgba(152,213,238,0.5)', fontWeight: 600 }}>Marks:</span>
          <select
            value={marksFilter}
            onChange={(e) => onMarksFilterChange(e.target.value as MarksFilter)}
            style={{ background: 'transparent', color: '#E1F2FA', fontWeight: 600, outline: 'none', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}
          >
            <option value="all" style={{ background: '#071e2b' }}>All Marks</option>
            <option value="2-mark" style={{ background: '#071e2b' }}>2-Mark Definitions</option>
            <option value="5-mark" style={{ background: '#071e2b' }}>5-Mark Concepts</option>
            <option value="10-mark" style={{ background: '#071e2b' }}>10-Mark Essays</option>
          </select>
        </div>
      </div>
    </div>
  );
};
