import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";
import { SoundEffectsProvider } from "@/hooks/use-sound-effects";
import { NavigationProvider } from "@/hooks/use-grid-navigation";
import { AuthProvider } from "@/hooks/use-auth";
import CursorFollower from "@/components/animations/CursorFollower";
import ScrollProgress from "@/components/animations/ScrollProgress";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import Brands from "./pages/Brands";
import Opportunities from "./pages/Opportunities";
import SalaryIntelligence from "./pages/SalaryIntelligence";
import CareerIntelligence from "./pages/CareerIntelligence";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ReferrerDashboard from "./pages/ReferrerDashboard";
import NotFound from "./pages/NotFound";
import Showcase from "./pages/Showcase";
import InvestorDeck from "./pages/InvestorDeck";
import Effects from "./pages/Effects";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/salary-intelligence" element={<SalaryIntelligence />} />
        <Route path="/career-intelligence" element={<CareerIntelligence />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/referrer" element={<ProtectedRoute><ReferrerDashboard /></ProtectedRoute>} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/invest" element={<InvestorDeck />} />
        <Route path="/effects" element={<Effects />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SoundEffectsProvider>
        <TooltipProvider>
          <AuthProvider>
            <CursorFollower />
            <ScrollProgress />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <NavigationProvider>
                <AnimatedRoutes />
              </NavigationProvider>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </SoundEffectsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
