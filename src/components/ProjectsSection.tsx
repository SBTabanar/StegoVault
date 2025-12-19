import { motion } from "framer-motion";
import { useInView } from "framer-motion";
<<<<<<< HEAD
import { useRef } from 'react';
import { ArrowUpRight, Github, Shield, Wifi, Smartphone, FileCode, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
=======
import { useRef } from "react";
import {
  ArrowUpRight,
  Github,
  Shield,
  Wifi,
  Smartphone,
  FileCode,
  EyeOff,
  Activity,
  ShieldAlert,
  Globe as GlobeIcon,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
import bahanapImg from "../assets/bahanap.png";
import crypterImg from "../assets/crypter.jpg";
import detectrImg from "../assets/detectr.jpg";
import stegoImg from "../assets/stego.png";

const projects = [
  {
    title: "Bahanap: a Flood Rescue System Utilizing LoraWAN",
    description:
      "An offline communication and flood rescue system using LoraWAN technology, completely unreliant on internet and cellular technology. Co-authored research accepted at 26th International Symposium on Advanced Intelligent Systems in 2025 in Cheongju, South Korea",
    tags: ["IoT", "LoraWAN", "Research", "Networking"],
    icon: Wifi,
    color: "from-cyan-500 to-blue-500",
    status: "Research Paper",
    image: bahanapImg,
  },
<<<<<<< HEAD
import { EyeOff } from 'lucide-react';
// ... existing imports

const projects = [
  // ... existing projects
=======
  {
    title: "Penetration Testing Simulation & Hardening Plan",
    description:
      "A comprehensive Information Assurance Capstone project detailing a penetration testing simulation and a strategic network hardening plan.",
    tags: ["Pentesting", "Hardening", "Capstone", "Security"],
    icon: ShieldAlert,
    color: "from-red-500 to-orange-600",
    status: "PDF Report",
    link: "/writeup/pentest-capstone",
  },
  {
    title: "Pentest-Ground Exploitation Report",
    description:
      "Detailed report on penetration testing and exploitation performed on Pentest-Ground, covering vulnerabilities found and remediation steps.",
    tags: ["Exploitation", "Pentest", "Security Audit"],
    icon: ShieldAlert,
    color: "from-purple-600 to-indigo-700",
    status: "PDF Report",
    link: "/writeup/exploitation-report",
  },
  {
    title: "Provincial Population Office Network Proposal",
    description:
      "Professional network infrastructure proposal designed for the Provincial Population Office, focusing on scalability and security.",
    tags: ["Networking", "Infrastructure", "Proposal"],
    icon: GlobeIcon,
    color: "from-blue-600 to-cyan-700",
    status: "PDF Proposal",
    link: "/writeup/network-proposal",
  },
  {
    title: "StegoVault",
    description:
      "A browser-based Steganography tool that hides secret text messages inside image files (LSB encoding). Zero server uploads required.",
    tags: ["React", "Steganography", "Bitwise Ops", "Privacy"],
    icon: EyeOff,
    color: "from-green-500 to-emerald-700",
    status: "Live Web App",
    link: "/stego",
    image: stegoImg,
  },
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
  {
    title: 'StegoVault',
    description: 'A browser-based Steganography tool that hides secret text messages inside image files (LSB encoding). Zero server uploads required.',
    tags: ['React', 'Steganography', 'Bitwise Ops', 'Privacy'],
    icon: EyeOff,
    color: 'from-green-500 to-emerald-700',
    status: 'Live Web App',
    link: '/stego'
  },
  {
    title: 'Crypter',
    description:
      "A professional-grade encryption tool for Windows, now available as a secure web application. Features password-based AES-GCM encryption entirely in your browser.",
    tags: ["React", "Cryptography", "AES-GCM", "Web Security"],
    icon: Shield,
    color: "from-blue-500 to-purple-500",
    status: "Live Web App",
    link: "/crypter",
    image: crypterImg,
  },
  {
    title: "Detectr",
    description:
      "A lightweight Network Intrusion Detection System (NIDS) with a modern GUI. Monitors network traffic in real-time to detect threats like DoS attacks and Port Scans.",
    tags: [
      "Python",
      "Intrusion Detection",
      "Network Monitoring",
      "Cybersecurity",
    ],
    icon: Wifi,
    color: "from-blue-500 to-purple-500",
    status: "Demo Available",
    link: "/detectr",
    image: detectrImg,
  },
  {
    title: "Philippine Startup Challenge X: Bahanap",
    description:
      "Top 10 Regional Finalist in the prestigious Philippine Startup Challenge X competition (2025).",
    tags: ["Startup", "Innovation", "Competition"],
    icon: FileCode,
    color: "from-green-500 to-teal-500",
    status: "Competition",
    image: bahanapImg,
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-medium mb-4 block">My Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const ProjectCard = (
              <div className="glass rounded-2xl overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]">
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <project.icon className="w-20 h-20 text-white/80" />
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-2xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.link && (
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                key={project.title + index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * index }}
                className="group"
              >
                {project.link ? (
                  project.isExternal ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {ProjectCard}
                    </a>
                  ) : (
                    <Link to={project.link} className="block h-full">
                      {ProjectCard}
                    </Link>
                  )
                ) : (
                  ProjectCard
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <h3 className="font-display text-2xl font-semibold mb-6 text-center">
            Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Introduction to Cybersecurity",
                issuer: "Cisco",
                date: "May 2025",
              },
              {
                title: "CCNA: Switching, Routing & Wireless",
                issuer: "Cisco",
                date: "Jan 2025",
              },
              {
                title: "CCNA: Introduction to Networks",
                issuer: "Cisco",
                date: "Aug 2024",
              },
              {
                title: "Cybersecurity Essentials",
                issuer: "Cisco",
                date: "Dec 2025",
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/30 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-display font-semibold mb-1">
                  {cert.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
