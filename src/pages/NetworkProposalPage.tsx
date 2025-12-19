import React from 'react';
import ProjectWriteupPage from '@/components/ProjectWriteupPage';

const NetworkProposalPage = () => {
  return (
    <ProjectWriteupPage
      title="PPO Network Proposal"
      subtitle="Provincial Population Office Network Infrastructure Proposal"
      summary="This proposal outlines a modern, scalable, and secure network infrastructure design for the Provincial Population Office. It addresses current connectivity bottlenecks and implements robust security measures to protect sensitive population data."
      methodology={[
        "Assessment of current infrastructure and future scalability requirements.",
        "Design of a multi-tier network architecture (Access, Distribution, Core).",
        "Implementation of VLANs and Subnetting for traffic isolation.",
        "Selection of Cisco hardware and security appliances based on budget and performance.",
        "Configuration of security protocols including ACLs, VPNs, and WPA3."
      ]}
      keyFindings={[
        "Proposed a 40% increase in network throughput through hardware upgrades.",
        "Implementation of a site-to-site VPN for secure remote access between branch offices.",
        "Enhanced data security through strict VLAN segmentation and firewall rules.",
        "Reduced potential downtime through redundant link configurations and failover mechanisms."
      ]}
      pdfLink="/downloads/Provincial Population Office Network Proposal.pdf"
      tags={["Networking", "Infrastructure", "Proposal", "Cisco", "VLAN"]}
    />
  );
};

export default NetworkProposalPage;
