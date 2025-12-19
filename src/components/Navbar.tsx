import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Terminal, Code } from "lucide-react";
import TerminalModal from "./TerminalModal";
import MatrixRain from "./MatrixRain";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  return (
    <>
    {isMatrixMode && <MatrixRain />}
    <TerminalModal 
        isOpen={showTerminal} 
        onClose={() => setShowTerminal(false)} 
        onToggleMatrix={() => setIsMatrixMode(!isMatrixMode)}
    />
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold text-gradient">
            <Terminal className="h-6 w-6 text-primary" />
            SERGEI
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            
            <button 
                onClick={() => setShowTerminal(true)}
                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
                title="Open Terminal"
            >
                <Code className="h-5 w-5" />
            </button>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="px-5 py-2 rounded-full bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 glass rounded-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                    setIsOpen(false);
                    setShowTerminal(true);
                }}
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors text-left flex items-center gap-2"
              >
                <Code className="h-5 w-5" /> Terminal
              </button>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="px-5 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium text-center"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
    </>
  );
}
