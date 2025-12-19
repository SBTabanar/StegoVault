import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Lock, AlertTriangle, Play, Square, Download, ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Simulated data for the demo
const SIMULATED_LOGS = [
    "[10:42:01] System: Packet Sniffer Initialized",
    "[10:42:05] INFO: Traffic normal on interface eth0",
    "[10:42:12] TCP: Connection established 192.168.1.105 -> 142.250.190.46:443",
    "[10:42:15] UDP: DNS Query to 8.8.8.8 for example.com",
    "[10:42:22] ALERT: High packet rate detected from 10.0.0.5 (DoS Warning)",
    "[10:42:23] ALERT: Port scan detected on 10.0.0.5 (Ports: 21, 22, 80, 443)",
    "[10:42:25] BLOCK: IP 10.0.0.5 blocked temporarily",
    "[10:42:30] INFO: Resuming normal monitoring..."
];

const TUTORIAL_STEPS = [
  {
    title: "Welcome to DetectrPro",
    description: "This interactive tutorial will guide you through the features of this Network Intrusion Detection System. Click 'Next' to begin.",
    target: "header"
  },
  {
    title: "Control Panel",
    description: "Here you can adjust the detection sensitivity. Thresholds determine how many packets per second trigger a DoS alert.",
    target: "controls"
  },
  {
    title: "Real-time Metrics",
    description: "Monitor live packet counts across different protocols. Keep an eye on the 'Security Alerts' count for potential threats.",
    target: "stats"
  },
  {
    title: "Live Traffic Log",
    description: "Every packet is inspected and logged here. Alerts and blocked IPs will appear in red to grab your attention immediately.",
    target: "terminal"
  },
  {
    title: "Start the Engine",
    description: "Ready to see it in action? Click 'Start Demo' to simulate live network traffic and watch how DetectrPro responds.",
    target: "start-button"
  }
];

const DetectrPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    tcp: 0,
    udp: 0,
    arp: 0,
    alerts: 0
  });

  // Simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        // Randomly update stats
        setStats(prev => ({
          total: prev.total + Math.floor(Math.random() * 10),
          tcp: prev.tcp + Math.floor(Math.random() * 5),
          udp: prev.udp + Math.floor(Math.random() * 3),
          arp: prev.arp + (Math.random() > 0.8 ? 1 : 0),
          alerts: prev.alerts + (Math.random() > 0.95 ? 1 : 0)
        }));

        // Randomly add a log
        if (Math.random() > 0.7) {
           const randomLog = SIMULATED_LOGS[Math.floor(Math.random() * SIMULATED_LOGS.length)];
           const timestamp = new Date().toLocaleTimeString();
           setLogs(prev => [`[${timestamp}] ${randomLog.substring(10)}`, ...prev].slice(0, 50));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    if (!isRunning && logs.length === 0) {
        setLogs(["[SYSTEM] Starting simulation...", ...SIMULATED_LOGS.slice(0, 3)]);
    }
  };

  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-white p-8 rounded-3xl border-white/20 shadow-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-blue-600 text-white shadow-xl">
                <Shield className="h-8 w-8" />
            </div>
            
            <div className="text-center mt-4">
              <h2 className="font-display text-2xl font-bold mb-4">{TUTORIAL_STEPS[currentStep].title}</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                {TUTORIAL_STEPS[currentStep].description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {TUTORIAL_STEPS.map((_, i) => (
                    <div key={i} className={`h-1.5 w-4 rounded-full transition-colors ${i === currentStep ? 'bg-blue-500' : 'bg-white/10'}`} />
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setShowTutorial(false)}>Skip</Button>
                  <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 px-8">
                    {currentStep === TUTORIAL_STEPS.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="container mx-auto z-10 py-8">
        <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className={showTutorial && TUTORIAL_STEPS[currentStep].target === 'header' ? 'relative z-[101] ring-4 ring-blue-500 ring-offset-8 ring-offset-background rounded-2xl' : ''}>
                    <h1 className="font-display text-4xl font-bold flex items-center gap-3">
                    <Activity className="h-10 w-10 text-blue-500" />
                    Detectr<span className="text-blue-500">Pro</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-xl">
                        A lightweight Network Intrusion Detection System (NIDS) built with Python and Scapy. 
                        Detects DoS attacks, Port Scans, and ARP Spoofing in real-time.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => setShowTutorial(true)} variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                        Tutorial Walkthrough
                    </Button>
                    <a href="/downloads/Detectr.exe" download>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Download className="mr-2 h-4 w-4" /> Download for Windows
                        </Button>
                    </a>
                </div>
            </div>
        </div>

        {/* Dashboard Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Controls (Simulated) */}
            <Card className={`p-6 glass border-white/10 space-y-6 lg:col-span-1 h-fit transition-all duration-300 ${showTutorial && TUTORIAL_STEPS[currentStep].target === 'controls' ? 'relative z-[101] ring-4 ring-blue-500 ring-offset-4 ring-offset-background' : ''}`}>
                <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Control Panel</h3>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs">DoS Threshold (pps)</label>
                            <input type="number" disabled value="100" className="w-full bg-secondary/50 rounded px-3 py-2 text-sm border-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs">Scan Limit (ports)</label>
                            <input type="number" disabled value="15" className="w-full bg-secondary/50 rounded px-3 py-2 text-sm border-none" />
                        </div>
                    </div>
                </div>

                <div className={showTutorial && TUTORIAL_STEPS[currentStep].target === 'start-button' ? 'relative z-[101] ring-4 ring-blue-500 ring-offset-4 ring-offset-background rounded-lg' : ''}>
                    <Button 
                        onClick={toggleSimulation}
                        variant={isRunning ? "destructive" : "default"} 
                        className={`w-full ${!isRunning ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    >
                        {isRunning ? <><Square className="mr-2 h-4 w-4 fill-current" /> Stop Simulation</> : <><Play className="mr-2 h-4 w-4 fill-current" /> Start Demo</>}
                    </Button>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Status</span>
                        <Badge variant={isRunning ? "default" : "secondary"} className={isRunning ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : ""}>
                            {isRunning ? "MONITORING" : "IDLE"}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        * This is a web simulation. Actual network traffic analysis requires the desktop application.
                    </p>
                </div>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
                {/* Stats Grid */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-300 ${showTutorial && TUTORIAL_STEPS[currentStep].target === 'stats' ? 'relative z-[101] ring-4 ring-blue-500 ring-offset-4 ring-offset-background rounded-2xl' : ''}`}>
                    {[
                        { label: 'Total Packets', value: stats.total, icon: Activity, color: 'text-blue-500' },
                        { label: 'TCP Traffic', value: stats.tcp, icon: Activity, color: 'text-green-500' },
                        { label: 'UDP Traffic', value: stats.udp, icon: Activity, color: 'text-orange-500' },
                        { label: 'Security Alerts', value: stats.alerts, icon: AlertTriangle, color: 'text-red-500' },
                    ].map((stat) => (
                        <Card key={stat.label} className="p-4 glass border-white/10 flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                                <span className="text-xs text-muted-foreground font-medium uppercase">{stat.label}</span>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                            <div className="mt-4 text-2xl font-bold font-mono">
                                {stat.value.toLocaleString()}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Terminal / Logs */}
                <Card className={`glass border-white/10 overflow-hidden flex flex-col h-[500px] transition-all duration-300 ${showTutorial && TUTORIAL_STEPS[currentStep].target === 'terminal' ? 'relative z-[101] ring-4 ring-blue-500 ring-offset-4 ring-offset-background rounded-2xl' : ''}`}>
                    <div className="p-3 bg-black/40 border-b border-white/5 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">live_traffic_monitor.log</span>
                    </div>
                    <ScrollArea className="flex-1 p-4 font-mono text-sm">
                        <div className="space-y-1">
                            {logs.length === 0 ? (
                                <span className="text-muted-foreground opacity-50">System ready. waiting for input...</span>
                            ) : (
                                logs.map((log, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`break-all ${
                                            log.includes("ALERT") || log.includes("BLOCK") 
                                                ? "text-red-400 font-bold" 
                                                : log.includes("TCP") 
                                                ? "text-green-400"
                                                : log.includes("UDP")
                                                ? "text-orange-400"
                                                : "text-blue-200"
                                        }`}
                                    >
                                        {log}
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetectrPage;
