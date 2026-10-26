import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Loader2,
  Bot,
  User,
  Wand2
} from 'lucide-react';
import { ChatMessage } from '../types';

interface PromptChatBarProps {
  onSendMessage: (text: string) => void;
  isGenerating: boolean;
  messages: ChatMessage[];
}

export const PromptChatBar: React.FC<PromptChatBarProps> = ({
  onSendMessage,
  isGenerating,
  messages,
}) => {
  const [inputText, setInputText] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const quickChips = [
    '🎯 Make Unit 2 notes, 10-mark answers with diagrams',
    '⚡ Make 2-page quick revision cheat sheet',
    '🔮 Predict most likely questions from model papers',
    '🧠 Generate mnemonics for Coffman deadlock conditions',
    '⚖️ Add comparison table for Preemptive vs Non-Preemptive',
  ];

  return (
    <div
      className="no-print p-3 sm:p-4 z-20 space-y-2.5"
      style={{
        background: 'linear-gradient(135deg, #071e2b, #09293d)',
        boxShadow: '0 -4px 16px rgba(2,12,18,0.65)',
        borderTop: '1px solid rgba(23,134,180,0.15)',
      }}
    >
      {/* Quick Suggestion Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs" style={{ scrollbarWidth: 'none' } as React.CSSProperties}>
        <span className="shrink-0 flex items-center gap-1.5" style={{ fontSize: 10.5, color: 'rgba(152,213,238,0.45)', fontWeight: 700 }}>
          <Wand2 size={12} color="#4FB3DA" />
          <span>Quick:</span>
        </span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isGenerating}
            onClick={() => onSendMessage(chip)}
            className="shrink-0 px-3 py-1 transition-all disabled:opacity-40"
            style={{
              background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
              boxShadow: '2px 2px 6px rgba(2,12,18,0.55), -1px -1px 4px rgba(15,94,131,0.1)',
              border: '1px solid rgba(23,134,180,0.2)',
              borderRadius: 999,
              color: 'rgba(152,213,238,0.65)',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(79,179,218,0.4)';
              e.currentTarget.style.color = '#E1F2FA';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(23,134,180,0.2)';
              e.currentTarget.style.color = 'rgba(152,213,238,0.65)';
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat History Drawer */}
      {messages.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 transition-all"
            style={{ fontSize: 11, color: 'rgba(152,213,238,0.45)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4FB3DA'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(152,213,238,0.45)'; }}
          >
            <MessageSquare size={12} color="#4FB3DA" />
            <span>Conversation ({messages.length} messages)</span>
            {showHistory ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          </button>

          {showHistory && (
            <div
              className="mt-2 max-h-48 overflow-y-auto space-y-1.5 p-3 custom-scrollbar"
              style={{
                background: 'linear-gradient(145deg, #061929, #0a2d40)',
                boxShadow: 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)',
                border: '1px solid rgba(23,134,180,0.15)',
                borderRadius: 14,
                fontSize: 12,
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: '8px 10px',
                    background: msg.role === 'user' ? 'rgba(23,134,180,0.12)' : 'rgba(10,60,85,0.3)',
                    border: msg.role === 'user' ? '1px solid rgba(23,134,180,0.2)' : '1px solid rgba(15,94,131,0.2)',
                    borderRadius: 10,
                    marginLeft: msg.role === 'user' ? 24 : 0,
                    marginRight: msg.role === 'user' ? 0 : 24,
                    marginBottom: 6,
                  }}
                >
                  {msg.role === 'user'
                    ? <User size={13} color="#4FB3DA" style={{ flexShrink: 0, marginTop: 1 }} />
                    : <Bot size={13} color="#34d399" style={{ flexShrink: 0, marginTop: 1 }} />
                  }
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#E1F2FA', lineHeight: 1.5, margin: 0 }}>{msg.text}</p>
                    {msg.actionTaken && (
                      <span style={{ fontSize: 9.5, color: '#34d399', fontFamily: 'JetBrains Mono, monospace', display: 'block', marginTop: 3 }}>
                        ✓ {msg.actionTaken}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
            placeholder={`💬 "Make unit 2 notes, 10-mark answers with diagrams..." or "Expand on Banker's algorithm"`}
            className="w-full text-sm px-4 py-2.5 transition-all outline-none"
            style={{
              background: 'linear-gradient(145deg, #061929, #0a2d40)',
              boxShadow: 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)',
              border: '1px solid rgba(23,134,180,0.2)',
              borderRadius: 14,
              color: '#E1F2FA',
              fontFamily: 'inherit',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'rgba(79,179,218,0.4)';
              e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(23,134,180,0.12), 0 0 16px rgba(23,134,180,0.12)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'rgba(23,134,180,0.2)';
              e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)';
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || isGenerating}
          className="px-4 py-2.5 font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none shrink-0"
          style={{
            background: 'linear-gradient(135deg, #1786B4, #0F5E83)',
            boxShadow: '4px 4px 14px rgba(2,12,18,0.7), -2px -2px 8px rgba(23,134,180,0.2), 0 0 20px rgba(23,134,180,0.25)',
            border: '1px solid rgba(79,179,218,0.35)',
            borderRadius: 14,
            color: '#E1F2FA',
            fontFamily: 'inherit',
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
          {isGenerating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span className="hidden sm:inline">Generating...</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Generate</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
