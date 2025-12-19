import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, ShieldCheck, Target, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProjectWriteupProps {
  title: string;
  subtitle: string;
  summary: string;
  methodology: string[];
  keyFindings: string[];
  pdfLink: string;
  icon?: any;
  tags?: string[];
}

const ProjectWriteupPage: React.FC<ProjectWriteupProps> = ({
  title,
  subtitle,
  summary,
  methodology,
  keyFindings,
  pdfLink,
  icon: Icon = FileText,
  tags = []
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-20 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-4xl z-10">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-secondary/50 text-[10px] uppercase tracking-widest font-bold text-primary border border-primary/10">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light italic">
              {subtitle}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-12">
              {/* Executive Summary */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Executive Summary</h2>
                </div>
                <div className="glass p-8 rounded-2xl border-white/5">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {summary}
                  </p>
                </div>
              </section>

              {/* Methodology */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Methodology</h2>
                </div>
                <ul className="space-y-4">
                  {methodology.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5"
                    >
                      <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-accent">{idx + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{item}</p>
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Key Findings */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Lightbulb className="h-6 w-6 text-green-500" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Key Findings</h2>
                </div>
                <div className="grid gap-4">
                  {keyFindings.map((finding, idx) => (
                    <div key={idx} className="p-6 rounded-2xl glass border-green-500/10 hover:border-green-500/30 transition-colors">
                      <p className="text-foreground/90 font-medium">
                        {finding}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="glass p-6 border-white/10 sticky top-32">
                <h3 className="font-display text-xl font-bold mb-4">Project Resources</h3>
                <div className="space-y-4">
                  <Button asChild className="w-full bg-gradient-primary hover:opacity-90 font-bold py-6">
                    <a href={pdfLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" /> View Full PDF
                    </a>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground italic">
                    Requires PDF viewer to open full report.
                  </p>
                </div>

                <hr className="my-6 border-white/5" />

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tech Stack Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded bg-secondary text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectWriteupPage;
