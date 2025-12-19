import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Code2, Network } from "lucide-react";
import profileImage from "@/assets/profile.png";

const features = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Penetration testing and vulnerability assessment using Nmap, Burp Suite, Wireshark, and Metasploitable 2.",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Building applications with Flutter, Dart, Python, and various programming languages.",
  },
  {
    icon: Network,
    title: "Networking",
    description:
      "CCNA certified with expertise in switching, routing, wireless essentials, and IoT.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl overflow-hidden glow-border">
                <img
                  src={profileImage}
                  alt="Sergei Benjamin Tabanar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-primary-foreground">
                  Dev
                </span>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <span className="text-primary font-medium mb-4 block">
                About Me
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Passionate about
                <span className="text-gradient">
                  {" "}
                  Cybersecurity, Web development, Mobile Development
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                I'm a BS Information Technology student at West Visayas State
                University, majoring in Network and Information Security.
                Originally from Kalibo, Aklan, now based in Iloilo City.
              </p>
              <p className="text-muted-foreground text-lg">
                I'm especially drawn to Web Development, Penetration Testing and
                Vulnerability Assessment, with hands-on experience in tools like
                Nmap, Nycto, Metasploitable 2, Burp Suite, and Wireshark. I also
                enjoy building Web and Mobile applications using Flutter, Dart,
                and React.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              className="glass rounded-2xl p-8 hover:bg-secondary/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 glass rounded-2xl p-8 md:p-12"
        >
          <h3 className="font-display text-2xl font-semibold mb-8 text-center">
            Notable Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🥇",
                title: "Gold Medalist",
                description: "2023-2024 WVSU-CICT Recognition",
              },
              {
                icon: "🥈",
                title: "Silver Medalist",
                description: "2024-2025 WVSU-CICT Recognition",
              },
              {
                icon: "📚",
                title: "Research Paper",
                description:
                  "Bahanap @ 26th International Symposium on Advanced Intelligent Systems, South Korea (2025)",
              },
              {
                icon: "🚀",
                title: "Top 10 Finalist",
                description: "Bahanap @ Philippine Startup Challenge X (2025)",
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30"
              >
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-display font-semibold text-lg">
                    {achievement.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
