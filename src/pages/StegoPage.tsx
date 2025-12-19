import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, EyeOff, FileImage, ArrowLeft, Download, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Steganography } from '@/lib/Steganography';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<<<<<<< HEAD
=======
const STEGO_TUTORIAL_STEPS = [
  {
    title: "Welcome to StegoVault",
    description: "Learn how to hide secret messages inside images using LSB (Least Significant Bit) steganography.",
    target: "header"
  },
  {
    title: "Choosing a Mode",
    description: "You can either 'Hide' a message into a new image or 'Reveal' a message from an already encoded one.",
    target: "tabs"
  },
  {
    title: "Source Image",
    description: "Start by uploading any PNG or JPG. The bigger the image, the more data it can hide.",
    target: "upload"
  },
  {
    title: "Your Secret Message",
    description: "Type the message you want to hide. It will be converted into bits and woven into the image pixels.",
    target: "message"
  },
  {
    title: "Process & Download",
    description: "Click 'Hide Message' to generate the new image. You can then download it and send it securely.",
    target: "actions"
  }
];

>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
const StegoPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [decodedMessage, setDecodedMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
<<<<<<< HEAD
=======
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setResultImage(null);
      setDecodedMessage('');
    }
  };

<<<<<<< HEAD
=======
  const nextStep = () => {
    if (currentStep < STEGO_TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
      setCurrentStep(0);
    }
  };

>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
  const handleEncode = async () => {
    if (!file || !message) {
      toast.error('Please select an image and enter a message.');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await Steganography.encode(file, message);
      setResultImage(result);
      toast.success('Message hidden successfully! Download the image below.');
    } catch (error) {
      toast.error('Failed to hide message. Image might be too small.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecode = async () => {
    if (!file) {
      toast.error('Please upload an encoded image first.');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await Steganography.decode(file);
      // Clean up result if it contains garbage characters (common in LSB if not perfectly terminated)
      // The Steganography class handles termination, but let's be safe visually.
      const cleanResult = result.replace(/[\x00-\x1F\x7F-\x9F]/g, ""); 
      
      if (!cleanResult || cleanResult.length === 0) {
          toast.warning("No hidden message found or message is empty.");
      } else {
          setDecodedMessage(result);
          toast.success('Hidden message revealed!');
      }
    } catch (error) {
      toast.error('Failed to decode message.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

<<<<<<< HEAD
=======
      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-white p-8 rounded-3xl border-white/20 shadow-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-green-600 text-white shadow-xl">
                <EyeOff className="h-8 w-8" />
            </div>
            
            <div className="text-center mt-4">
              <h2 className="font-display text-2xl font-bold mb-4">{STEGO_TUTORIAL_STEPS[currentStep].title}</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                {STEGO_TUTORIAL_STEPS[currentStep].description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {STEGO_TUTORIAL_STEPS.map((_, i) => (
                    <div key={i} className={`h-1.5 w-4 rounded-full transition-colors ${i === currentStep ? 'bg-green-500' : 'bg-white/10'}`} />
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setShowTutorial(false)}>Skip</Button>
                  <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700 px-8">
                    {currentStep === STEGO_TUTORIAL_STEPS.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
      <div className="w-full max-w-4xl z-10 py-8">
        <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
<<<<<<< HEAD
            <h1 className="font-display text-4xl font-bold flex items-center gap-3">
              <EyeOff className="h-10 w-10 text-green-500" />
              Stego<span className="text-green-500">Vault</span>
            </h1>
            <p className="text-muted-foreground mt-2">
                Hide secret messages inside regular images using LSB Steganography.
            </p>
        </div>

        <Tabs defaultValue="encode" className="w-full">
=======
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className={showTutorial && STEGO_TUTORIAL_STEPS[currentStep].target === 'header' ? 'relative z-[101] ring-4 ring-green-500 ring-offset-8 ring-offset-background rounded-2xl p-2' : ''}>
                    <h1 className="font-display text-4xl font-bold flex items-center gap-3">
                    <EyeOff className="h-10 w-10 text-green-500" />
                    Stego<span className="text-green-500">Vault</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Hide secret messages inside regular images using LSB Steganography.
                    </p>
                </div>
                <Button onClick={() => setShowTutorial(true)} variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                    Tutorial Walkthrough
                </Button>
            </div>
        </div>

        <Tabs defaultValue="encode" className={`w-full ${showTutorial && STEGO_TUTORIAL_STEPS[currentStep].target === 'tabs' ? 'relative z-[101] ring-4 ring-green-500 ring-offset-8 ring-offset-background rounded-2xl' : ''}`}>
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="encode">Hide Message (Encode)</TabsTrigger>
                <TabsTrigger value="decode">Reveal Message (Decode)</TabsTrigger>
            </TabsList>

            {/* ENCODE TAB */}
            <TabsContent value="encode">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6 glass border-white/10 space-y-4">
<<<<<<< HEAD
                        <h3 className="font-semibold flex items-center gap-2"><FileImage className="h-4 w-4" /> 1. Upload Image</h3>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:bg-white/5 transition-colors relative">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                            ) : (
                                <div className="py-8">
                                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">Click to upload PNG/JPG</p>
                                </div>
                            )}
                        </div>

                        <h3 className="font-semibold flex items-center gap-2 pt-4"><Lock className="h-4 w-4" /> 2. Enter Secret</h3>
                        <Textarea 
                            placeholder="Type your secret message here..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-secondary/50 min-h-[120px]"
                        />

                        <Button onClick={handleEncode} disabled={isProcessing || !file} className="w-full bg-green-600 hover:bg-green-700">
                            {isProcessing ? 'Processing...' : 'Hide Message'}
                        </Button>
=======
                        <div className={showTutorial && STEGO_TUTORIAL_STEPS[currentStep].target === 'upload' ? 'relative z-[101] ring-4 ring-green-500 ring-offset-4 ring-offset-background rounded-xl' : ''}>
                            <h3 className="font-semibold flex items-center gap-2 mb-2"><FileImage className="h-4 w-4" /> 1. Upload Image</h3>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:bg-white/5 transition-colors relative">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                                ) : (
                                    <div className="py-8">
                                        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">Click to upload PNG/JPG</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={showTutorial && STEGO_TUTORIAL_STEPS[currentStep].target === 'message' ? 'relative z-[101] ring-4 ring-green-500 ring-offset-4 ring-offset-background rounded-xl' : ''}>
                            <h3 className="font-semibold flex items-center gap-2 pt-4 mb-2"><Lock className="h-4 w-4" /> 2. Enter Secret</h3>
                            <Textarea 
                                placeholder="Type your secret message here..." 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="bg-secondary/50 min-h-[120px]"
                            />
                        </div>

                        <div className={showTutorial && STEGO_TUTORIAL_STEPS[currentStep].target === 'actions' ? 'relative z-[101] ring-4 ring-green-500 ring-offset-4 ring-offset-background rounded-xl' : ''}>
                            <Button onClick={handleEncode} disabled={isProcessing || !file} className="w-full bg-green-600 hover:bg-green-700">
                                {isProcessing ? 'Processing...' : 'Hide Message'}
                            </Button>
                        </div>
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
                    </Card>

                    <Card className="p-6 glass border-white/10 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                        {resultImage ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="p-2 bg-white rounded-xl mb-4">
                                    <img src={resultImage} alt="Result" className="rounded-lg max-h-64 object-contain" />
                                </div>
                                <h3 className="text-xl font-bold text-green-500 mb-2">Message Hidden Successfully!</h3>
                                <p className="text-sm text-muted-foreground mb-6">This image looks identical, but contains your secret data.</p>
                                <a href={resultImage} download={`stego_secret_${Date.now()}.png`}>
                                    <Button size="lg" className="gap-2">
                                        <Download className="h-4 w-4" /> Download Result
                                    </Button>
                                </a>
                            </motion.div>
                        ) : (
                            <div className="text-muted-foreground opacity-50">
                                <EyeOff className="h-16 w-16 mx-auto mb-4" />
                                <p>Result will appear here</p>
                            </div>
                        )}
                    </Card>
                </div>
            </TabsContent>

            {/* DECODE TAB */}
            <TabsContent value="decode">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6 glass border-white/10 space-y-4">
                         <h3 className="font-semibold flex items-center gap-2"><FileImage className="h-4 w-4" /> 1. Upload Encoded Image</h3>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:bg-white/5 transition-colors relative">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                            ) : (
                                <div className="py-8">
                                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">Upload image to scan</p>
                                </div>
                            )}
                        </div>

                        <Button onClick={handleDecode} disabled={isProcessing || !file} className="w-full mt-4" variant="secondary">
                            {isProcessing ? 'Scanning...' : 'Reveal Message'}
                        </Button>
                    </Card>

                    <Card className="p-6 glass border-white/10 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                         {decodedMessage ? (
                             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                                <Unlock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Secret Found:</h3>
                                <div className="bg-black/50 p-4 rounded-lg border border-green-500/30 w-full text-left font-mono text-green-400 break-words">
                                    {decodedMessage}
                                </div>
                             </motion.div>
                         ) : (
                            <div className="text-muted-foreground opacity-50">
                                <Eye className="h-16 w-16 mx-auto mb-4" />
                                <p>Decoded message will appear here</p>
                            </div>
                         )}
                    </Card>
                </div>
            </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default StegoPage;
