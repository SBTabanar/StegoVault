import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Shield,
  Layout,
  Code,
  User,
  Mail,
  Github,
  Linkedin,
  Terminal,
  FileText,
  Search,
  EyeOff,
<<<<<<< HEAD
=======
  ShieldAlert,
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
} from 'lucide-react';
import { toast } from 'sonner';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
         <button 
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
         >
           <Search className="h-5 w-5" />
         </button>
      </div>
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <kbd className="pointer-events-none inline-flex h-10 select-none items-center gap-1 rounded border bg-muted px-3 font-mono text-sm font-medium text-muted-foreground opacity-100 glass">
          <span className="text-xs">{navigator.platform.indexOf('Mac') > -1 ? '⌘' : 'Ctrl'}</span>K <span className="ml-2">to search</span>
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => {
                 document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            })}>
              <User className="mr-2 h-4 w-4" />
              <span>About Me</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
                 document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            })}>
              <Layout className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
                 document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
            })}>
              <Code className="mr-2 h-4 w-4" />
              <span>Skills</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
                 document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            })}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools & Apps">
            <CommandItem onSelect={() => runCommand(() => navigate('/crypter'))}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Crypter Web App</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/detectr'))}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Detectr Demo</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/stego'))}>
              <EyeOff className="mr-2 h-4 w-4" />
              <span>StegoVault (Hide Msg)</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Social">
            <CommandItem onSelect={() => runCommand(() => window.open('https://github.com', '_blank'))}>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open('https://linkedin.com', '_blank'))}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => {
                navigator.clipboard.writeText('sergeibenjamin.tabanar@gmail.com');
                toast.success('Email copied to clipboard!');
            })}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Copy Email Address</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
                window.print();
            })}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Print Page / Save PDF</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
