import React, { useState, useRef } from 'react';
import {
  FileText,
  UploadCloud,
  BookMarked,
  CheckCircle2,
  Clock,
  X,
  Eye,
  HelpCircle,
  FileCode,
  FolderOpen
} from 'lucide-react';
import { SourceFile, FileRole } from '../types';

interface SidebarProps {
  files: SourceFile[];
  onAddFiles: (files: File[], role: FileRole) => void;
  onRemoveFile: (id: string) => void;
  onInspectFile: (file: SourceFile) => void;
  onLoadPreset: (presetKey: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const NEU_CARD: React.CSSProperties = {
  background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
  boxShadow: '6px 6px 18px rgba(2,12,18,0.8), -4px -4px 12px rgba(15,94,131,0.18)',
  border: '1px solid rgba(23,134,180,0.18)',
  borderRadius: 14,
};

const NEU_INSET: React.CSSProperties = {
  background: 'linear-gradient(145deg, #061929, #0a2d40)',
  boxShadow: 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)',
  border: '1px solid rgba(7,30,43,0.8)',
};

export const Sidebar: React.FC<SidebarProps> = ({
  files,
  onAddFiles,
  onRemoveFile,
  onInspectFile,
  onLoadPreset,
  isOpen,
  onToggleOpen,
}) => {
  const [selectedRole, setSelectedRole] = useState<FileRole>('syllabus');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) onAddFiles(Array.from(e.dataTransfer.files), selectedRole);
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length > 0) { onAddFiles(Array.from(e.target.files), selectedRole); e.target.value = ''; }
  };

  const syllabusFiles = files.filter((f) => f.role === 'syllabus');
  const modelPaperFiles = files.filter((f) => f.role === 'model_paper');
  const otherFiles = files.filter((f) => f.role === 'other');

  const getRoleIcon = (role: FileRole) => {
    switch (role) {
      case 'syllabus': return <BookMarked size={14} color="#4FB3DA" />;
      case 'model_paper': return <FileCode size={14} color="#fbbf24" />;
      case 'other': return <FileText size={14} color="#818cf8" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const ROLE_BTNS = [
    { role: 'syllabus' as FileRole, label: '📘 Syllabus', sub: 'Scope', active: 'linear-gradient(135deg, #1786B4, #0F5E83)', glow: 'rgba(23,134,180,0.2)', border: 'rgba(79,179,218,0.3)', color: '#E1F2FA' },
    { role: 'model_paper' as FileRole, label: '📝 Model Qs', sub: 'Weightage', active: 'linear-gradient(135deg, #92400e, #78350f)', glow: 'rgba(245,158,11,0.15)', border: 'rgba(251,191,36,0.3)', color: '#fde68a' },
    { role: 'other' as FileRole, label: '📎 Material', sub: 'Content', active: 'linear-gradient(135deg, #4338ca, #3730a3)', glow: 'rgba(129,140,248,0.15)', border: 'rgba(129,140,248,0.3)', color: '#c4b5fd' },
  ];

  return (
    <aside
      className={`no-print flex-col transition-all duration-300 z-20 shrink-0 ${isOpen ? 'w-80 sm:w-88 flex' : 'w-0 hidden md:flex md:w-16'}`}
      style={{
        background: 'linear-gradient(180deg, #071e2b 0%, #061626 100%)',
        boxShadow: '4px 0 24px rgba(2,12,18,0.8)',
        borderRight: '1px solid rgba(23,134,180,0.15)',
      }}
    >
      {/* Top Banner */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(23,134,180,0.12)', background: 'rgba(4,20,30,0.4)' }}
      >
        <div className="flex items-center space-x-2.5">
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
              boxShadow: '3px 3px 10px rgba(2,12,18,0.65), -2px -2px 7px rgba(15,94,131,0.12), 0 0 12px rgba(23,134,180,0.15)',
              border: '1px solid rgba(23,134,180,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FolderOpen size={16} color="#4FB3DA" />
          </div>
          {isOpen && (
            <div>
              <h2 style={{ fontSize: 12, fontWeight: 800, color: '#E1F2FA', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Source Materials
              </h2>
              <p style={{ fontSize: 10.5, color: 'rgba(152,213,238,0.45)', marginTop: 1 }}>
                {files.length} active groundings
              </p>
            </div>
          )}
        </div>
        <button
          onClick={onToggleOpen}
          type="button"
          className="md:hidden p-1.5 rounded-lg transition-all"
          style={{
            background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
            boxShadow: '2px 2px 6px rgba(2,12,18,0.6), -1px -1px 4px rgba(15,94,131,0.1)',
            border: '1px solid rgba(23,134,180,0.18)',
            color: 'rgba(152,213,238,0.6)',
          }}
        >
          <X size={14} />
        </button>
      </div>

      {isOpen ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

          {/* Role Selector + Drop Zone */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(152,213,238,0.6)', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Upload Role Tag
              </label>
              <div className="flex items-center gap-1" style={{ fontSize: 10, color: 'rgba(152,213,238,0.35)' }}>
                <HelpCircle size={10} />
                <span>RAG groundings</span>
              </div>
            </div>

            {/* Role Selector */}
            <div
              className="grid grid-cols-3 gap-1.5 p-1.5"
              style={{ ...NEU_INSET, borderRadius: 14 }}
            >
              {ROLE_BTNS.map(rb => (
                <button
                  key={rb.role}
                  type="button"
                  onClick={() => setSelectedRole(rb.role)}
                  className="py-2 px-1 flex flex-col items-center gap-0.5 transition-all"
                  style={{
                    background: selectedRole === rb.role ? rb.active : 'transparent',
                    boxShadow: selectedRole === rb.role
                      ? `3px 3px 8px rgba(2,12,18,0.6), -1px -1px 5px ${rb.glow}, 0 0 14px ${rb.glow}`
                      : 'none',
                    border: selectedRole === rb.role ? `1px solid ${rb.border}` : '1px solid transparent',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: selectedRole === rb.role ? rb.color : 'rgba(152,213,238,0.45)' }}>
                    {rb.label}
                  </span>
                  <span style={{ fontSize: 9.5, color: selectedRole === rb.role ? 'rgba(255,255,255,0.55)' : 'rgba(152,213,238,0.25)' }}>
                    {rb.sub}
                  </span>
                </button>
              ))}
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="p-5 text-center cursor-pointer transition-all"
              style={{
                ...NEU_INSET,
                borderRadius: 14,
                border: isDragging
                  ? '2px dashed rgba(79,179,218,0.6)'
                  : '2px dashed rgba(23,134,180,0.3)',
                boxShadow: isDragging
                  ? 'inset 3px 3px 10px rgba(2,12,18,0.7), inset -2px -2px 8px rgba(23,134,180,0.2), 0 0 20px rgba(23,134,180,0.15)'
                  : NEU_INSET.boxShadow,
                transform: isDragging ? 'scale(1.01)' : 'scale(1)',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.txt,.md,image/png,image/jpeg"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(23,134,180,0.2), rgba(15,94,131,0.12))',
                  border: '1px solid rgba(79,179,218,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                }}
              >
                <UploadCloud size={20} color="#4FB3DA" />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#E1F2FA', marginBottom: 4 }}>Drag & drop files here</p>
              <p style={{ fontSize: 11, color: 'rgba(152,213,238,0.4)' }}>
                PDF, Word or images as{' '}
                <span style={{ color: '#4FB3DA', fontWeight: 600 }}>{selectedRole.replace('_', ' ')}</span>
              </p>
            </div>
          </div>

          {/* Sample Packs */}
          <div
            className="p-3 space-y-2"
            style={{ ...NEU_CARD, padding: '14px 16px' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(152,213,238,0.7)', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Quick Sample Packs
              </span>
              <span
                style={{
                  fontSize: 9.5,
                  padding: '2px 7px',
                  borderRadius: 999,
                  background: 'rgba(52,211,153,0.12)',
                  border: '1px solid rgba(52,211,153,0.25)',
                  color: '#34d399',
                  fontWeight: 700,
                }}
              >
                1-Click Load
              </span>
            </div>
            {[
              { key: 'os', label: '🎓 Operating Systems (Unit 2)', count: '3 files' },
              { key: 'cn', label: '🌐 Computer Networks (TCP/IP)', count: '3 files' },
              { key: 'dsa', label: '🌳 DSA (Sorting, Trees & Graphs)', count: '3 files' },
              { key: 'dbms', label: '🗄️ DBMS (SQL & Normalization)', count: '3 files' },
            ].map(preset => (
              <button
                key={preset.key}
                type="button"
                onClick={() => onLoadPreset(preset.key)}
                className="w-full text-left flex items-center justify-between px-3 py-2 transition-all"
                style={{
                  background: 'linear-gradient(145deg, #061929, #0a2d40)',
                  boxShadow: 'inset 2px 2px 6px rgba(2,12,18,0.65), inset -1px -1px 4px rgba(15,94,131,0.1)',
                  border: '1px solid rgba(23,134,180,0.15)',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(79,179,218,0.35)';
                  e.currentTarget.style.background = 'linear-gradient(145deg, #0a2535, #0d3045)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(23,134,180,0.15)';
                  e.currentTarget.style.background = 'linear-gradient(145deg, #061929, #0a2d40)';
                }}
              >
                <span style={{ fontSize: 12, color: '#E1F2FA', fontWeight: 600 }}>{preset.label}</span>
                <span style={{ fontSize: 10, color: '#4FB3DA', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{preset.count}</span>
              </button>
            ))}
          </div>

          {/* File Groups */}
          <div className="space-y-4">
            <FileGroup
              label="📘 Syllabus"
              color="#4FB3DA"
              sub="Topic Scope"
              emptyMsg="No syllabus uploaded yet. Add to define units & boundaries."
              files={syllabusFiles}
              getRoleIcon={getRoleIcon}
              formatFileSize={formatFileSize}
              onRemove={onRemoveFile}
              onInspect={onInspectFile}
            />
            <FileGroup
              label="📝 Model Papers"
              color="#fbbf24"
              sub="Weightage & Qs"
              emptyMsg="No model papers. Add to identify repeated 10M & 5M questions."
              files={modelPaperFiles}
              getRoleIcon={getRoleIcon}
              formatFileSize={formatFileSize}
              onRemove={onRemoveFile}
              onInspect={onInspectFile}
            />
            <FileGroup
              label="📎 Handouts & Text"
              color="#818cf8"
              sub="Content & Proofs"
              emptyMsg="No lecture notes or textbooks attached."
              files={otherFiles}
              getRoleIcon={getRoleIcon}
              formatFileSize={formatFileSize}
              onRemove={onRemoveFile}
              onInspect={onInspectFile}
            />
          </div>
        </div>
      ) : (
        /* Collapsed on Tablet */
        <div className="p-2 space-y-4 flex flex-col items-center pt-4">
          <button
            onClick={onToggleOpen}
            className="p-2 rounded-xl transition-all"
            title="Expand Sources Sidebar"
            style={NEU_CARD}
          >
            <FolderOpen size={18} color="#4FB3DA" />
          </button>
          <div style={{ width: 32, height: 1, background: 'rgba(23,134,180,0.15)' }} />
          <div style={{ fontSize: 9.5, color: 'rgba(152,213,238,0.35)', fontWeight: 700, letterSpacing: 1 }}>
            {files.length}
          </div>
        </div>
      )}
    </aside>
  );
};

/* ── Sub-components ── */

interface FileGroupProps {
  label: string;
  color: string;
  sub: string;
  emptyMsg: string;
  files: SourceFile[];
  getRoleIcon: (role: FileRole) => React.ReactNode;
  formatFileSize: (bytes: number) => string;
  onRemove: (id: string) => void;
  onInspect: (file: SourceFile) => void;
}

const FileGroup: React.FC<FileGroupProps> = ({ label, color, sub, emptyMsg, files, getRoleIcon, formatFileSize, onRemove, onInspect }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span style={{ fontSize: 11, fontWeight: 700, color, display: 'flex', alignItems: 'center', gap: 5 }}>
        {label} ({files.length})
      </span>
      <span style={{ fontSize: 10, color: 'rgba(152,213,238,0.35)', fontWeight: 500 }}>{sub}</span>
    </div>
    {files.length === 0 ? (
      <div
        className="text-center p-3"
        style={{
          background: 'linear-gradient(145deg, #061929, #0a2d40)',
          boxShadow: 'inset 2px 2px 7px rgba(2,12,18,0.65), inset -1px -1px 4px rgba(15,94,131,0.1)',
          border: '1px solid rgba(23,134,180,0.12)',
          borderRadius: 10,
          fontSize: 11,
          color: 'rgba(152,213,238,0.35)',
          fontStyle: 'italic',
        }}
      >
        {emptyMsg}
      </div>
    ) : (
      <div className="space-y-1.5">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onRemove={() => onRemove(file.id)}
            onInspect={() => onInspect(file)}
            formatFileSize={formatFileSize}
            getRoleIcon={getRoleIcon}
          />
        ))}
      </div>
    )}
  </div>
);

interface FileItemProps {
  file: SourceFile;
  onRemove: () => void;
  onInspect: () => void;
  formatFileSize: (bytes: number) => string;
  getRoleIcon: (role: FileRole) => React.ReactNode;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove, onInspect, formatFileSize, getRoleIcon }) => {
  return (
    <div
      className="p-2.5 flex items-center justify-between group transition-all"
      style={{
        background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
        boxShadow: '3px 3px 10px rgba(2,12,18,0.6), -2px -2px 7px rgba(15,94,131,0.12)',
        border: '1px solid rgba(23,134,180,0.18)',
        borderRadius: 12,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(79,179,218,0.35)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '4px 4px 14px rgba(2,12,18,0.7), -2px -2px 9px rgba(23,134,180,0.18)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(23,134,180,0.18)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '3px 3px 10px rgba(2,12,18,0.6), -2px -2px 7px rgba(15,94,131,0.12)';
      }}
    >
      <div className="min-w-0 flex-1 mr-2">
        <div className="flex items-center space-x-1.5">
          {getRoleIcon(file.role)}
          <span style={{ fontSize: 12, fontWeight: 600, color: '#E1F2FA' }} className="truncate" title={file.name}>
            {file.name}
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-1" style={{ fontSize: 10, color: 'rgba(152,213,238,0.35)' }}>
          <span>{formatFileSize(file.size)}</span>
          <span>·</span>
          <span>{file.pageCount} {file.pageCount === 1 ? 'pg' : 'pgs'}</span>
          <span>·</span>
          {file.status === 'ready' && <span style={{ color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}><CheckCircle2 size={10} /> Ready</span>}
          {file.status === 'processing' && <span style={{ color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }} className="animate-pulse"><Clock size={10} /> Parsing</span>}
          {file.status === 'uploading' && <span style={{ color: '#4FB3DA', fontWeight: 700 }} className="animate-pulse">Uploading</span>}
          {file.status === 'error' && <span style={{ color: '#f87171', fontWeight: 700 }}>Error</span>}
        </div>
      </div>

      <div className="flex items-center space-x-1 opacity-60 group-hover:opacity-100 shrink-0">
        <button
          type="button"
          onClick={onInspect}
          className="p-1 rounded-lg transition-all"
          style={{
            background: 'linear-gradient(145deg, #061929, #0a2d40)',
            boxShadow: '2px 2px 5px rgba(2,12,18,0.6), -1px -1px 3px rgba(15,94,131,0.1)',
            border: '1px solid rgba(23,134,180,0.15)',
            color: 'rgba(152,213,238,0.5)',
          }}
          title="Inspect extracted text & RAG chunks"
          onMouseEnter={e => { e.currentTarget.style.color = '#4FB3DA'; e.currentTarget.style.borderColor = 'rgba(79,179,218,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(152,213,238,0.5)'; e.currentTarget.style.borderColor = 'rgba(23,134,180,0.15)'; }}
        >
          <Eye size={12} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 rounded-lg transition-all"
          style={{
            background: 'linear-gradient(145deg, #061929, #0a2d40)',
            boxShadow: '2px 2px 5px rgba(2,12,18,0.6), -1px -1px 3px rgba(15,94,131,0.1)',
            border: '1px solid rgba(23,134,180,0.15)',
            color: 'rgba(152,213,238,0.4)',
          }}
          title="Remove file"
          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(152,213,238,0.4)'; e.currentTarget.style.borderColor = 'rgba(23,134,180,0.15)'; e.currentTarget.style.background = 'linear-gradient(145deg, #061929, #0a2d40)'; }}
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};
