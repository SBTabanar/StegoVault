import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: React.ReactNode;
}

const COMMANDS = {
  help: 'Available commands: about, projects, skills, contact, social, whoami, clear, exit, sudo',
  whoami: 'user: guest\nrole: recruiter / visitor\naccess: restricted (read-only)',
  about: 'Sergei Benjamin Tabanar\nSecurity Researcher & Full Stack Developer.\nSpecialized in Network Security, Penetration Testing, and React/Python development.',
  projects: '1. Crypter (Web App)\n2. Detectr (NIDS)\n3. Bahanap (LoraWAN Research)\n\nType "open [1-3]" to view specific project.',
  skills: 'Network Security, Penetration Testing, Python, React, TypeScript, Cisco Networking.',
  social: 'github: github.com/sbtabanar\nlinkedin: linkedin.com/in/sbtabanar',
  contact: 'email: sergeibenjamin.tabanar@gmail.com',
  clear: 'Clearing terminal...',
  sudo: 'Usage: sudo [command]. Try "sudo su" or "sudo root".',
};

export default function TerminalModal({ isOpen, onClose, onToggleMatrix }: { isOpen: boolean; onClose: () => void; onToggleMatrix?: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'Welcome to SergeiOS v1.0.0' },
    { type: 'system', content: 'Type "help" for a list of commands.' },
    { type: 'system', content: <span className="text-gray-500 text-xs">Hint: Check the browser console...</span> },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Console Easter Egg
    console.log(
        "%c STOP! %c\n\nIf you are looking for vulnerabilities, you are in the right place.\nTry typing 'sudo root' in the terminal.",
        "color: red; font-size: 50px; font-weight: bold;",
        "color: white; font-size: 14px;"
    );
  }, []);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [lines, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines = [...lines, { type: 'input', content: cmd } as TerminalLine];

    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    if (trimmedCmd === 'exit') {
      onClose();
      return;
    }

    if (trimmedCmd === 'sudo root' || trimmedCmd === 'sudo su') {
        if (onToggleMatrix) {
            onToggleMatrix();
            newLines.push({ type: 'output', content: <span className="text-green-400 font-bold">ACCESS GRANTED. MATRIX MODE ACTIVATED.</span> });
        }
    }
    // Special logic for opening projects
    else if (trimmedCmd.startsWith('open ')) {
        const arg = trimmedCmd.split(' ')[1];
        if (arg === '1') {
            window.location.href = '/crypter';
            newLines.push({ type: 'output', content: 'Opening Crypter...' });
        } else if (arg === '2') {
            window.location.href = '/detectr';
            newLines.push({ type: 'output', content: 'Opening Detectr...' });
        } else if (arg === '3') {
            document.getElementById('projects')?.scrollIntoView();
            newLines.push({ type: 'output', content: 'Navigating to Bahanap...' });
        } else {
            newLines.push({ type: 'output', content: `Error: Project "${arg}" not found.` });
        }
    } 
    else if (COMMANDS[trimmedCmd as keyof typeof COMMANDS]) {
      newLines.push({ type: 'output', content: COMMANDS[trimmedCmd as keyof typeof COMMANDS] });
    } else if (trimmedCmd !== '') {
      newLines.push({ type: 'output', content: `Command not found: ${trimmedCmd}. Type "help" for assistance.` });
    }

    setLines(newLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-[#0c0c0c] rounded-lg overflow-hidden shadow-2xl border border-gray-800 font-mono text-sm"
          >
            {/* Terminal Header */}
            <div className="bg-[#1f1f1f] px-4 py-2 flex items-center justify-between border-b border-gray-800 cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2 text-gray-400">
                <TerminalIcon className="w-4 h-4" />
                <span className="text-xs">guest@sergei-portfolio:~</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded"><Minus className="w-3 h-3 text-gray-400" /></button>
                <button className="p-1 hover:bg-white/10 rounded"><Square className="w-3 h-3 text-gray-400" /></button>
                <button onClick={onClose} className="p-1 hover:bg-red-500/20 rounded hover:text-red-400"><X className="w-3 h-3 text-gray-400" /></button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-[400px] overflow-y-auto text-green-500" onClick={() => inputRef.current?.focus()}>
              {lines.map((line, i) => (
                <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-white' : 'whitespace-pre-wrap'}`}>
                  {line.type === 'input' && <span className="text-blue-400 mr-2">➜ ~</span>}
                  {line.content}
                </div>
              ))}
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-400">➜ ~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white caret-green-500"
                  autoFocus
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
