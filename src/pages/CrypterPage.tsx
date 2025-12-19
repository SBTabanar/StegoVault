import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Lock, Unlock, FileText, X, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { CryptoEngine } from '@/lib/CryptoEngine';
import { Link } from 'react-router-dom';

const CRYPTER_TUTORIAL_STEPS = [
  {
    title: "Welcome to CrypterWeb",
    description: "Secure your files with industry-standard AES-GCM encryption, performed entirely in your browser.",
    target: "header"
  },
  {
    title: "Select Your File",
    description: "Drag and drop any file here or click to browse. Remember, nothing is ever uploaded to a server.",
    target: "dropzone"
  },
  {
    title: "Encryption Password",
    description: "Choose a strong password. This password is used to derive the encryption key and is required to decrypt the file later.",
    target: "password"
  },
  {
    title: "Encrypt or Decrypt",
    description: "Use 'Encrypt' to lock a file (it will get a .enc extension). Use 'Unlock' with the original password to get your file back.",
    target: "actions"
  },
  {
    title: "Desktop Version",
    description: "Need to encrypt large files? Download the high-performance Windows desktop application here.",
    target: "download-link"
  }
];

const CrypterPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < CRYPTER_TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
      setCurrentStep(0);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
  };

  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleProcess = async (mode: 'encrypt' | 'decrypt') => {
    if (!file || !password) {
      toast.error('Please select a file and enter a password.');
      return;
    }

    setIsProcessing(true);
    setProgress(10); // Start progress

    try {
      // Small delay to allow UI to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let resultBlob: Blob;
      let outputName: string;

      if (mode === 'encrypt') {
        resultBlob = await CryptoEngine.encryptFile(file, password);
        outputName = file.name + '.enc';
        setProgress(100);
        toast.success('File encrypted successfully!');
      } else {
        resultBlob = await CryptoEngine.decryptFile(file, password);
        outputName = file.name.replace('.enc', '');
        // If no extension remains, maybe append something or just keep it. 
        // Simple logic: if it ends in .enc, remove it. Else add .dec
        if (file.name === outputName) {
            outputName = 'decrypted_' + file.name;
        }
        setProgress(100);
        toast.success('File decrypted successfully!');
      }

      downloadBlob(resultBlob, outputName);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred during processing.');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations matching the portfolio style */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-white p-8 rounded-3xl border-white/20 shadow-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-primary text-primary-foreground shadow-xl">
                <Shield className="h-8 w-8" />
            </div>
            
            <div className="text-center mt-4">
              <h2 className="font-display text-2xl font-bold mb-4">{CRYPTER_TUTORIAL_STEPS[currentStep].title}</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                {CRYPTER_TUTORIAL_STEPS[currentStep].description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {CRYPTER_TUTORIAL_STEPS.map((_, i) => (
                    <div key={i} className={`h-1.5 w-4 rounded-full transition-colors ${i === currentStep ? 'bg-primary' : 'bg-white/10'}`} />
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setShowTutorial(false)}>Skip</Button>
                  <Button onClick={nextStep} className="bg-primary text-primary-foreground px-8">
                    {currentStep === CRYPTER_TUTORIAL_STEPS.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="w-full max-w-2xl z-10">
        <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
            <Button onClick={() => setShowTutorial(true)} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Tutorial Walkthrough
            </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`text-center mb-8 ${showTutorial && CRYPTER_TUTORIAL_STEPS[currentStep].target === 'header' ? 'relative z-[101] ring-4 ring-primary ring-offset-8 ring-offset-background rounded-2xl p-2' : ''}`}>
            <h1 className="font-display text-4xl font-bold mb-2 flex items-center justify-center gap-3 text-white">
              <Shield className="h-10 w-10 text-primary" />
              Crypter<span className="text-primary">Web</span>
            </h1>
            <p className="text-muted-foreground">Secure Client-Side AES-GCM Encryption</p>
          </div>

          <Card className="glass p-8 border-primary/20 backdrop-blur-xl bg-white/5">
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
                file ? 'border-primary/50 bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/5'
              } ${showTutorial && CRYPTER_TUTORIAL_STEPS[currentStep].target === 'dropzone' ? 'relative z-[101] ring-4 ring-primary ring-offset-4 ring-offset-background' : ''}`}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              
              {!file ? (
                <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drag & Drop or Click to Browse</p>
                    <p className="text-sm text-muted-foreground mt-1">Supports any file type</p>
                  </div>
                </label>
              ) : (
                <div className="flex items-center justify-between bg-background/50 p-4 rounded-lg">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="font-medium truncate max-w-[200px] md:max-w-[300px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={removeFile} className="hover:text-destructive">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-8 space-y-6">
              <div className={`space-y-2 ${showTutorial && CRYPTER_TUTORIAL_STEPS[currentStep].target === 'password' ? 'relative z-[101] ring-4 ring-primary ring-offset-4 ring-offset-background rounded-lg p-2' : ''}`}>
                <label className="text-sm font-medium ml-1">Encryption Password</label>
                <Input
                  type="password"
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-input/50 focus:border-primary/50 h-12"
                />
              </div>

              {isProcessing && (
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Processing...</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                 </div>
              )}

              <div className={`grid grid-cols-2 gap-4 ${showTutorial && CRYPTER_TUTORIAL_STEPS[currentStep].target === 'actions' ? 'relative z-[101] ring-4 ring-primary ring-offset-4 ring-offset-background rounded-xl p-2' : ''}`}>
                <Button
                  onClick={() => handleProcess('encrypt')}
                  disabled={!file || !password || isProcessing}
                  className="h-12 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                >
                  <Lock className="mr-2 h-5 w-5" /> Encrypt
                </Button>
                <Button
                  onClick={() => handleProcess('decrypt')}
                  disabled={!file || !password || isProcessing}
                  variant="outline"
                  className="h-12 text-lg font-medium border-primary/20 hover:bg-primary/5 transition-all duration-300"
                >
                  <Unlock className="mr-2 h-5 w-5" /> Decrypt
                </Button>
              </div>
            </div>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-8">
            All encryption happens locally in your browser. Your files are never uploaded to any server.
          </p>

          <div className={`mt-6 flex justify-center ${showTutorial && CRYPTER_TUTORIAL_STEPS[currentStep].target === 'download-link' ? 'relative z-[101] ring-4 ring-primary ring-offset-4 ring-offset-background rounded-lg p-2' : ''}`}>
            <a 
              href="/downloads/CrypterPro.exe" 
              download
              className="flex items-center gap-2 text-sm text-primary hover:underline transition-all"
            >
              <FileText className="h-4 w-4" />
              Download Windows Desktop Version (.exe)
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CrypterPage;
