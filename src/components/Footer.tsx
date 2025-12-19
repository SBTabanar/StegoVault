import { Github, Linkedin, Mail, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-gradient">
              SERGEI TABANAR
            </span>
          </div>

          <div className="flex items-center gap-6">
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
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full hover:bg-secondary transition-colors group"
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with ReactJS © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
