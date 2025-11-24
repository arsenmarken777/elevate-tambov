import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contacts from "./pages/Contacts";
import Request from "./pages/Request";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminAccess from "./pages/AdminAccess";
import SetupAdmin from "./pages/SetupAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin routes without layout */}
          <Route path="/admin-access" element={<AdminAccess />} />
          <Route path="/setup-admin" element={<SetupAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Public routes with layout */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
          <Route path="/request" element={<Layout><Request /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
