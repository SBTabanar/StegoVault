import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
<<<<<<< HEAD
import StegoPage from "./pages/StegoPage";
=======
import Index from "./pages/Index";
import CrypterPage from "./pages/CrypterPage";
import DetectrPage from "./pages/DetectrPage";
import StegoPage from "./pages/StegoPage";
import PentestCapstonePage from "./pages/PentestCapstonePage";
import ExploitationReportPage from "./pages/ExploitationReportPage";
import NetworkProposalPage from "./pages/NetworkProposalPage";
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<StegoPage />} />
=======
            <Route path="/" element={<Index />} />
            <Route path="/crypter" element={<CrypterPage />} />
            <Route path="/detectr" element={<DetectrPage />} />
            <Route path="/stego" element={<StegoPage />} />
            <Route path="/writeup/pentest-capstone" element={<PentestCapstonePage />} />
            <Route path="/writeup/exploitation-report" element={<ExploitationReportPage />} />
            <Route path="/writeup/network-proposal" element={<NetworkProposalPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
>>>>>>> 4d5c1381aef7e7c4c6154aa09928489084c56b59
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;