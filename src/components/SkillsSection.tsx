import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Network, Shield, Code2, Palette, Server, Globe } from "lucide-react";

const skillCategories = [
  {
    title: "Networking",
    icon: Network,
    skills: [
      "Network Design & Engineering",
      "VPN & VRF",
      "Routing Protocols (RIP, OSPF)",
      "Dynamic Routing",
      "Cisco Routers & Switches",
      "IPv4 / IPv6 Addressing",
      "IP Subnetting",
      "Ethernet & Switching",
      "Wireless LAN Controllers",
      "High Availability",
      "First-hop Redundancy",
    ],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    skills: [
      "Network Security",
      "Vulnerability Assessment",
      "Penetration Testing",
      "Threat Detection",
      "Cyber Best Practices",
      "Privacy & Data Confidentiality",
      "Security Fundamentals",
      "Nmap",
      "Nycto",
      "Burp Suite",
      "Wireshark",
    ],
  },
  {
    title: "Programming",
    icon: Code2,
    skills: ["C++", "Python", "Dart", "Java", "C#", "SQL", "JavaScript"],
  },
  {
    title: "Web Development",
    icon: Globe,
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Web Design",
      "Responsive Design",
      "Flutter",
    ],
  },
  {
    title: "Design & Creative",
    icon: Palette,
    skills: [
      "Graphic Design",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Cinema 4D",
      "UI/UX Design",
    ],
  },
  {
    title: "Infrastructure",
    icon: Server,
    skills: [
      "Network Administration",
      "Access Connectivity",
      "Access Security",
      "IP Services",
      "IoT / LoraWAN",
      "Metasploitable 2",
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-medium mb-4 block">Expertise</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * categoryIndex }}
              className="glass rounded-2xl p-6 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gradient">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="font-display text-3xl font-bold mb-12 text-center">
            Education & <span className="text-gradient">Journey</span>
          </h3>

          <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent transform -translate-x-1/2" />

            {/* Timeline Items */}
            {[
              {
                year: "2022 - Present",
                title: "BS Information Technology",
                subtitle: "Major in Network & Info. Security",
                institution: "West Visayas State University",
                side: "left",
              },
              {
                year: "Dec 2025",
                title: "Cybersecurity Essentials",
                subtitle: "Certification",
                institution: "Cisco Networking Academy",
                side: "right",
              },
              {
                year: "May 2025",
                title: "Introduction to Cybersecurity",
                subtitle: "Certification",
                institution: "Cisco Networking Academy",
                side: "left",
              },
              {
                year: "Jan 2025",
                title: "CCNA: Switching, Routing & Wireless",
                subtitle: "Certification",
                institution: "Cisco Networking Academy",
                side: "right",
              },
              {
                year: "Aug 2024",
                title: "CCNA: Introduction to Networks",
                subtitle: "Certification",
                institution: "Cisco Networking Academy",
                side: "left",
              },
              {
                year: "2018 - 2020",
                title: "Secondary Education (STEM)",
                subtitle: "Graduated with Honors",
                institution: "Regional Science High School for Region VI",
                side: "right",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className={`relative mb-12 flex flex-col md:flex-row ${
                  item.side === "left" ? "md:flex-row-reverse" : ""
                } items-start md:items-center w-full`}
              >
                {/* Content Side */}
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <div className="glass p-6 rounded-2xl hover:bg-secondary/30 transition-colors border border-white/5">
                    <span className="text-xs font-bold text-primary mb-1 block uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h4 className="font-display font-bold text-lg">
                      {item.title}
                    </h4>
                    <p className="text-sm font-medium text-foreground/80">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.institution}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 mt-6 md:mt-0 z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />

                {/* Empty Side (for layout balance) */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
