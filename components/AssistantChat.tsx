
import React, { useState, useRef, useEffect } from 'react';
import { askAssistant } from '../services/geminiService';
import { REPOS, SERVICES } from '../constants';

const AssistantChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I am your Nexus Infrastructure Assistant. I have analyzed your 4 repos and 7 platform services. How can I help you optimize your stack today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const context = { repos: REPOS, services: SERVICES };
    const answer = await askAssistant(userMessage, context);
    
    setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 p-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
             <span className="text-indigo-500">🤖</span> Nexus Brain AI
          </h2>
          <p className="text-slate-400 text-sm">Ask about repo sync, forensics, or service health.</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
           <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-bold text-green-400 uppercase">Model Connected</span>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar mb-6"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-slate-900 border border-slate-800 text-slate-200'
            }`}>
              {m.role === 'assistant' && (
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Nexus Brain v3</div>
              )}
              <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-2 items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: 'Which repos are out of sync?' or 'Check forensics for the backend'"
          className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-600 transition-all pr-24"
        />
        <button 
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </form>
    </div>
  );
};

export default AssistantChat;
