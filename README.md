<<<<<<< HEAD
# StegoVault - Browser-Based LSB Steganography 🕵️‍♂️

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A secure, client-side steganography tool that allows you to hide secret text messages within image files using the Least Significant Bit (LSB) encoding technique. 

## 🌟 Key Features

*   **🔒 100% Private:** All processing is done locally in your browser using the Canvas API. Your images and messages are never sent to a server.
*   **🖼️ LSB Encoding:** Uses the Least Significant Bit method to hide data, making the changes to the image invisible to the human eye.
*   **📂 Multiple Formats:** Supports PNG and JPG files.
*   **⚡ Instant Reveal:** Quickly scan and decode messages from StegoVault-encoded images.
*   **📱 Responsive Design:** Modern, sleek UI that works perfectly on desktop and mobile browsers.

## 🛠️ How it Works

1.  **Bitwise Manipulation:** The tool extracts the pixel data from an uploaded image.
2.  **Message Conversion:** Your secret message is converted into a binary string.
3.  **Woven into Pixels:** Each bit of the message replaces the least significant bit of the image's color channels (R, G, B).
4.  **Reconstruction:** A new PNG image is generated with the hidden data embedded.

## 🚀 Quick Start

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run development server:**
    ```bash
    npm run dev
    ```
3.  **Build for production:**
    ```bash
    npm run build
    ```

## 🧑‍💻 Technologies

- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS & Shadcn/UI
- **Animations:** Framer Motion
- **Icons:** Lucide-React

## 🧑‍💻 Author

**Sergei Benjamin Tabanar**
*BS IT Student | Security Enthusiast*
[Portfolio](https://sergeibenjamin.com)
=======
# Professional Cybersecurity & Development Portfolio 🚀

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A high-performance, visually stunning portfolio showcasing expertise in **Network & Information Security**, **Penetration Testing**, and **Full-stack Development**.

## 🌐 Live Demo
[sergeibenjamin.com](https://sergeibenjamin.com)

## ✨ Key Features

- **🛡️ Security Focus:** Integrated project pages for NIDS (DetectrPro), Cryptography (CrypterWeb), and Steganography (StegoVault).
- **📝 Technical Writeups:** Detailed project pages for penetration testing simulations and network infrastructure proposals.
- **🖥️ Interactive Terminal:** A functional command-line interface component for a "hacker" aesthetic.
- **✨ Sleek UI/UX:** Ultra-modern dark theme with glassmorphism, 3D scenes (Three.js), and smooth Framer Motion animations.
- **📱 Fully Responsive:** Optimized for all devices, from mobile to ultra-wide monitors.
- **📖 Tutorial Walkthroughs:** Interactive step-by-step guides for complex tools.

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Shadcn/UI
- **Animations:** Framer Motion
- **3D Elements:** Three.js / React Three Fiber
- **Icons:** Lucide-React
- **State Management:** React Hooks & Context API

## 📂 Project Structure

- `/src/components`: Reusable UI components (Navbar, Hero, Projects, etc.)
- `/src/pages`: Individual project detail pages and main landing page.
- `/src/lib`: Core logic for Cryptography and Steganography engines.
- `/public/downloads`: Distributable binaries for desktop versions of the tools.

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start Development Server:**
   ```bash
   npm run dev
   ```
3. **Production Build:**
   ```bash
   npm run build
   ```

## 🧑‍💻 About the Author

**Sergei Benjamin Tabanar**
*BS IT Student | Major in Network & Information Security*
Specializing in bridging the gap between robust security infrastructure and modern user experiences.

---
*Built with ❤️ and a lot of ☕*
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
