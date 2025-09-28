import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Invoice from "./pages/Invoice";
import Templates from "./pages/Templates";
import InvoiceTemplates from "./pages/InvoiceTemplates";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import DoNotSell from "./pages/DoNotSell";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import Docs from "./pages/Docs";
import BusinessSettings from "./pages/BusinessSettings";
import Security from "./pages/Security";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";
import ConstructionInvoiceTemplate from "./pages/templates/Construction";
import ConsultingInvoiceTemplate from "./pages/templates/Consulting";
import FreelanceNYCTemplate from "./pages/templates/FreelanceNYC";
import FreelanceCATemplate from "./pages/templates/FreelanceCA";
import ProgrammaticSEO from "./pages/templates/ProgrammaticSEO";

// Import all industry-specific invoice templates
import ConstructionTemplate from "./pages/invoice-templates/Construction";
import ContractorTemplate from "./pages/invoice-templates/Contractor";
import PlumberTemplate from "./pages/invoice-templates/Plumber";
import ElectricianTemplate from "./pages/invoice-templates/Electrician";
import HVACTemplate from "./pages/invoice-templates/HVAC";
import RoofingTemplate from "./pages/invoice-templates/Roofing";
import PaintingTemplate from "./pages/invoice-templates/Painting";
import HandymanTemplate from "./pages/invoice-templates/Handyman";
import LandscapingTemplate from "./pages/invoice-templates/Landscaping";
import CleaningTemplate from "./pages/invoice-templates/Cleaning";
import WindowCleaningTemplate from "./pages/invoice-templates/WindowCleaning";
import PestControlTemplate from "./pages/invoice-templates/PestControl";
import AutoRepairTemplate from "./pages/invoice-templates/AutoRepair";
import CarDetailingTemplate from "./pages/invoice-templates/CarDetailing";
import TowingTemplate from "./pages/invoice-templates/Towing";
import MovingTemplate from "./pages/invoice-templates/Moving";
import TruckingTemplate from "./pages/invoice-templates/Trucking";
import CourierTemplate from "./pages/invoice-templates/Courier";
import PhotographyTemplate from "./pages/invoice-templates/Photography";
import VideographyTemplate from "./pages/invoice-templates/Videography";
import GraphicDesignTemplate from "./pages/invoice-templates/GraphicDesign";
import WebDesignTemplate from "./pages/invoice-templates/WebDesign";
import MarketingTemplate from "./pages/invoice-templates/Marketing";
import ConsultingTemplate from "./pages/invoice-templates/Consulting";
import CateringTemplate from "./pages/invoice-templates/Catering";
import EventPlannerTemplate from "./pages/invoice-templates/EventPlanner";
import SalonTemplate from "./pages/invoice-templates/Salon";
import MassageTemplate from "./pages/invoice-templates/Massage";
import PersonalTrainerTemplate from "./pages/invoice-templates/PersonalTrainer";
import TutorTemplate from "./pages/invoice-templates/Tutor";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-canceled" element={<PaymentCanceled />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/do-not-sell" element={<DoNotSell />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/security" element={<Security />} />
              <Route path="/accessibility" element={<Accessibility />} />
              
              {/* Invoice Templates Hub */}
              <Route path="/invoice-templates" element={<InvoiceTemplates />} />
              
              {/* Industry-Specific Invoice Templates */}
              <Route path="/invoice-template/construction" element={<ConstructionTemplate />} />
              <Route path="/invoice-template/contractor" element={<ContractorTemplate />} />
              <Route path="/invoice-template/plumber" element={<PlumberTemplate />} />
              <Route path="/invoice-template/electrician" element={<ElectricianTemplate />} />
              <Route path="/invoice-template/hvac" element={<HVACTemplate />} />
              <Route path="/invoice-template/roofing" element={<RoofingTemplate />} />
              <Route path="/invoice-template/painting" element={<PaintingTemplate />} />
              <Route path="/invoice-template/handyman" element={<HandymanTemplate />} />
              <Route path="/invoice-template/landscaping" element={<LandscapingTemplate />} />
              <Route path="/invoice-template/cleaning" element={<CleaningTemplate />} />
              <Route path="/invoice-template/window-cleaning" element={<WindowCleaningTemplate />} />
              <Route path="/invoice-template/pest-control" element={<PestControlTemplate />} />
              <Route path="/invoice-template/auto-repair" element={<AutoRepairTemplate />} />
              <Route path="/invoice-template/car-detailing" element={<CarDetailingTemplate />} />
              <Route path="/invoice-template/towing" element={<TowingTemplate />} />
              <Route path="/invoice-template/moving" element={<MovingTemplate />} />
              <Route path="/invoice-template/trucking" element={<TruckingTemplate />} />
              <Route path="/invoice-template/courier" element={<CourierTemplate />} />
              <Route path="/invoice-template/photography" element={<PhotographyTemplate />} />
              <Route path="/invoice-template/videography" element={<VideographyTemplate />} />
              <Route path="/invoice-template/graphic-design" element={<GraphicDesignTemplate />} />
              <Route path="/invoice-template/web-design" element={<WebDesignTemplate />} />
              <Route path="/invoice-template/marketing" element={<MarketingTemplate />} />
              <Route path="/invoice-template/consulting" element={<ConsultingTemplate />} />
              <Route path="/invoice-template/catering" element={<CateringTemplate />} />
              <Route path="/invoice-template/event-planner" element={<EventPlannerTemplate />} />
              <Route path="/invoice-template/salon" element={<SalonTemplate />} />
              <Route path="/invoice-template/massage" element={<MassageTemplate />} />
              <Route path="/invoice-template/personal-trainer" element={<PersonalTrainerTemplate />} />
              <Route path="/invoice-template/tutor" element={<TutorTemplate />} />
              
              {/* Main Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/invoice" element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              } />
              <Route path="/templates" element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              } />
              <Route path="/business-settings" element={
                <ProtectedRoute>
                  <BusinessSettings />
                </ProtectedRoute>
              } />
              {/* Legacy Template Pages */}
              <Route path="/templates/construction" element={<ConstructionInvoiceTemplate />} />
              <Route path="/templates/consulting" element={<ConsultingInvoiceTemplate />} />
              <Route path="/templates/freelance-nyc" element={<FreelanceNYCTemplate />} />
              <Route path="/templates/freelance-california" element={<FreelanceCATemplate />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/templates/:trade/:location" element={<ProgrammaticSEO />} />
              <Route path="/get-started" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
