import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Scene3D from "./Scene3D";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid">
      <Scene3D />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-spin-slow" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-20 w-20 h-20 border border-primary/20 rotate-45 animate-float" />
      <div className="absolute bottom-32 right-32 w-16 h-16 border border-accent/20 rotate-12 animate-float-delayed" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-32 w-2 h-2 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: "0.5s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary border-glow">
              Open for Internship/Job Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-glow">Sergei Benjamin</span>
            <span className="text-gradient block">Tabanar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            BS Information Technology student specializing in Network &
            Information Security. Passionate about cybersecurity, penetration
            testing, and building secure applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover-glow transition-all"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full glass font-semibold hover:bg-secondary/50 transition-colors glow-border hover-glow"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:sergeibenjamin.tabanar@gmail.com",
                label: "Email",
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-3 rounded-full glass hover:bg-secondary/50 transition-all group hover-glow"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-sm group-hover:text-primary transition-colors">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce group-hover:text-primary transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
