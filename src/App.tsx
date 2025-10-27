import { useState } from "react";
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
import SubscriptionManagement from "./pages/SubscriptionManagement";
import EstimateView from './pages/EstimateView';
import InvoiceView from './pages/InvoiceView';
import Estimates from './pages/Estimates';
import Clients from './pages/Clients';
import NotFound from "@/pages/NotFound";
import ConstructionInvoiceTemplate from "./pages/templates/Construction";
import ConsultingInvoiceTemplate from "./pages/templates/Consulting";
import FreelanceNYCTemplate from "./pages/templates/FreelanceNYC";
import FreelanceCATemplate from "./pages/templates/FreelanceCA";
import ProgrammaticSEO from "./pages/templates/ProgrammaticSEO";

// Import niche invoice templates
import HVACInvoiceTemplate from "./pages/templates/HVACInvoiceTemplate";
import LawnCareInvoiceTemplate from "./pages/templates/LawnCareInvoiceTemplate";
import HandymanInvoiceTemplate from "./pages/templates/HandymanInvoiceTemplate";
import CleaningInvoiceTemplate from "./pages/templates/CleaningInvoiceTemplate";
import RoofingInvoiceTemplate from "./pages/templates/RoofingInvoiceTemplate";
import PlumbingInvoiceTemplate from "./pages/templates/PlumbingInvoiceTemplate";
import ElectricianInvoiceTemplate from "./pages/templates/ElectricianInvoiceTemplate";
import FreelanceDesignerInvoiceTemplate from "./pages/templates/FreelanceDesignerInvoiceTemplate";
import PhotographerInvoiceTemplate from "./pages/templates/PhotographerInvoiceTemplate";
import VideographerInvoiceTemplate from "./pages/templates/VideographerInvoiceTemplate";
import PersonalTrainerInvoiceTemplate from "./pages/templates/PersonalTrainerInvoiceTemplate";
import AutoDetailingInvoiceTemplate from "./pages/templates/AutoDetailingInvoiceTemplate";
import MobileMechanicInvoiceTemplate from "./pages/templates/MobileMechanicInvoiceTemplate";
import PestControlInvoiceTemplate from "./pages/templates/PestControlInvoiceTemplate";
import PressureWashingInvoiceTemplate from "./pages/templates/PressureWashingInvoiceTemplate";
import LandscaperInvoiceTemplate from "./pages/templates/LandscaperInvoiceTemplate";
import RealEstatePhotographerInvoiceTemplate from "./pages/templates/RealEstatePhotographerInvoiceTemplate";
import TattooArtistInvoiceTemplate from "./pages/templates/TattooArtistInvoiceTemplate";
import MakeupArtistInvoiceTemplate from "./pages/templates/MakeupArtistInvoiceTemplate";
import HairStylistInvoiceTemplate from "./pages/templates/HairStylistInvoiceTemplate";
import NotaryInvoiceTemplate from "./pages/templates/NotaryInvoiceTemplate";
import BookkeepingInvoiceTemplate from "./pages/templates/BookkeepingInvoiceTemplate";
import DJInvoiceTemplate from "./pages/templates/DJInvoiceTemplate";
import EventPlannerInvoiceTemplate from "./pages/templates/EventPlannerInvoiceTemplate";
import CatererInvoiceTemplate from "./pages/templates/CatererInvoiceTemplate";
import SnowRemovalInvoiceTemplate from "./pages/templates/SnowRemovalInvoiceTemplate";
import WindowCleaningInvoiceTemplate from "./pages/templates/WindowCleaningInvoiceTemplate";
import MassageTherapistInvoiceTemplate from "./pages/templates/MassageTherapistInvoiceTemplate";
import CarpetCleanerInvoiceTemplate from "./pages/templates/CarpetCleanerInvoiceTemplate";
import GetStarted from './pages/GetStarted';
import EstimateTemplates from './pages/EstimateTemplates';

// Import estimate templates
import HVACEstimateTemplate from "./pages/templates/HVACEstimateTemplate";
import PlumbingEstimateTemplate from "./pages/templates/PlumbingEstimateTemplate";
import ConstructionEstimateTemplate from "./pages/templates/ConstructionEstimateTemplate";
import LandscapingEstimateTemplate from "./pages/templates/LandscapingEstimateTemplate";
import RoofingEstimateTemplate from "./pages/templates/RoofingEstimateTemplate";
import CleaningEstimateTemplate from "./pages/templates/CleaningEstimateTemplate";
import WaveVsProInvoice from './pages/compare/WaveVsProInvoice';
import InvoiceSimpleVsProInvoice from './pages/compare/InvoiceSimpleVsProInvoice';
import WhyEstimatesMatter from './pages/WhyEstimatesMatter';
import DepositCollectionGuide from './pages/DepositCollectionGuide';
import PaymentSpeedCalculator from './pages/PaymentSpeedCalculator';

// Import documentation pages
import CreatingFirstInvoice from './pages/docs/CreatingFirstInvoice';
import UnderstandingTemplates from './pages/docs/UnderstandingTemplates';
import AddingLineItems from './pages/docs/AddingLineItems';
import CustomizingAppearance from './pages/docs/CustomizingAppearance';
import BusinessProfile from './pages/docs/BusinessProfile';
import PaymentLinks from './pages/docs/PaymentLinks';
import AddingClients from './pages/docs/AddingClients';
import FAQ from './pages/docs/FAQ';
import FeatureRequests from './pages/docs/FeatureRequests';
import SystemStatus from './pages/docs/SystemStatus';
import UploadingLogo from './pages/docs/UploadingLogo';
import ManagingBusinessInfo from './pages/docs/ManagingBusinessInfo';
import CustomizingBrandColors from './pages/docs/CustomizingBrandColors';
import EditingClientInfo from './pages/docs/EditingClientInfo';
import ClientHistory from './pages/docs/ClientHistory';
import ManagingContacts from './pages/docs/ManagingContacts';
import PaymentTerms from './pages/docs/PaymentTerms';
import ManagingSubscriptions from './pages/docs/ManagingSubscriptions';
import PaymentSecurity from './pages/docs/PaymentSecurity';

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

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/e/:token" element={<EstimateView />} />
              <Route path="/i/:id" element={<InvoiceView />} />
              <Route path="/estimates" element={<Estimates />} />
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
              <Route path="/docs/creating-your-first-invoice" element={<CreatingFirstInvoice />} />
              <Route path="/docs/understanding-invoice-templates" element={<UnderstandingTemplates />} />
              <Route path="/docs/adding-line-items-and-calculations" element={<AddingLineItems />} />
              <Route path="/docs/customizing-invoice-appearance" element={<CustomizingAppearance />} />
              <Route path="/docs/setting-up-your-business-profile" element={<BusinessProfile />} />
              <Route path="/docs/setting-up-payment-links" element={<PaymentLinks />} />
              <Route path="/docs/adding-new-clients" element={<AddingClients />} />
              <Route path="/docs/faq" element={<FAQ />} />
              <Route path="/docs/feature-requests" element={<FeatureRequests />} />
              <Route path="/docs/system-status" element={<SystemStatus />} />
              <Route path="/docs/uploading-your-business-logo" element={<UploadingLogo />} />
              <Route path="/docs/managing-business-information" element={<ManagingBusinessInfo />} />
              <Route path="/docs/customizing-brand-colors" element={<CustomizingBrandColors />} />
              <Route path="/docs/editing-client-information" element={<EditingClientInfo />} />
              <Route path="/docs/client-history-and-records" element={<ClientHistory />} />
              <Route path="/docs/managing-multiple-contacts" element={<ManagingContacts />} />
              <Route path="/docs/understanding-payment-terms" element={<PaymentTerms />} />
              <Route path="/docs/managing-subscriptions" element={<ManagingSubscriptions />} />
              <Route path="/docs/payment-security-compliance" element={<PaymentSecurity />} />
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
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/business-settings" element={<BusinessSettings />} />
              <Route path="/subscription" element={<SubscriptionManagement />} />
              <Route path="/clients" element={<Clients />} />
              {/* Legacy Template Pages */}
              <Route path="/templates/construction" element={<ConstructionInvoiceTemplate />} />
              <Route path="/templates/consulting" element={<ConsultingInvoiceTemplate />} />
              <Route path="/templates/freelance-nyc" element={<FreelanceNYCTemplate />} />
              <Route path="/templates/freelance-california" element={<FreelanceCATemplate />} />
              
              {/* Niche Template Pages */}
              <Route path="/templates/hvac-invoice-template" element={<HVACInvoiceTemplate />} />
              <Route path="/templates/lawn-care-invoice-template" element={<LawnCareInvoiceTemplate />} />
              <Route path="/templates/handyman-invoice-template" element={<HandymanInvoiceTemplate />} />
              <Route path="/templates/cleaning-invoice-template" element={<CleaningInvoiceTemplate />} />
              <Route path="/templates/roofing-invoice-template" element={<RoofingInvoiceTemplate />} />
              <Route path="/templates/plumber-invoice-template" element={<PlumbingInvoiceTemplate />} />
              <Route path="/templates/electrician-invoice-template" element={<ElectricianInvoiceTemplate />} />
              <Route path="/templates/freelance-designer-invoice-template" element={<FreelanceDesignerInvoiceTemplate />} />
              <Route path="/templates/photographer-invoice-template" element={<PhotographerInvoiceTemplate />} />
              <Route path="/templates/videographer-invoice-template" element={<VideographerInvoiceTemplate />} />
              <Route path="/templates/personal-trainer-invoice-template" element={<PersonalTrainerInvoiceTemplate />} />
              <Route path="/templates/auto-detailing-invoice-template" element={<AutoDetailingInvoiceTemplate />} />
              <Route path="/templates/mobile-mechanic-invoice-template" element={<MobileMechanicInvoiceTemplate />} />
              <Route path="/templates/pest-control-invoice-template" element={<PestControlInvoiceTemplate />} />
              <Route path="/templates/pressure-washing-invoice-template" element={<PressureWashingInvoiceTemplate />} />
              <Route path="/templates/landscaper-invoice-template" element={<LandscaperInvoiceTemplate />} />
              <Route path="/templates/real-estate-photographer-invoice-template" element={<RealEstatePhotographerInvoiceTemplate />} />
              <Route path="/templates/tattoo-artist-invoice-template" element={<TattooArtistInvoiceTemplate />} />
              <Route path="/templates/makeup-artist-invoice-template" element={<MakeupArtistInvoiceTemplate />} />
              <Route path="/templates/hair-stylist-invoice-template" element={<HairStylistInvoiceTemplate />} />
              <Route path="/templates/notary-invoice-template" element={<NotaryInvoiceTemplate />} />
              <Route path="/templates/bookkeeping-invoice-template" element={<BookkeepingInvoiceTemplate />} />
              <Route path="/templates/dj-invoice-template" element={<DJInvoiceTemplate />} />
              <Route path="/templates/event-planner-invoice-template" element={<EventPlannerInvoiceTemplate />} />
              <Route path="/templates/caterer-invoice-template" element={<CatererInvoiceTemplate />} />
              <Route path="/templates/snow-removal-invoice-template" element={<SnowRemovalInvoiceTemplate />} />
              <Route path="/templates/window-cleaning-invoice-template" element={<WindowCleaningInvoiceTemplate />} />
              <Route path="/templates/massage-therapist-invoice-template" element={<MassageTherapistInvoiceTemplate />} />
              <Route path="/templates/carpet-cleaner-invoice-template" element={<CarpetCleanerInvoiceTemplate />} />
              
              {/* Estimate Template Pages */}
              <Route path="/templates/hvac-estimate-template" element={<HVACEstimateTemplate />} />
              <Route path="/templates/plumbing-estimate-template" element={<PlumbingEstimateTemplate />} />
              <Route path="/templates/construction-estimate-template" element={<ConstructionEstimateTemplate />} />
              <Route path="/templates/landscaping-estimate-template" element={<LandscapingEstimateTemplate />} />
              <Route path="/templates/roofing-estimate-template" element={<RoofingEstimateTemplate />} />
              <Route path="/templates/cleaning-estimate-template" element={<CleaningEstimateTemplate />} />
              
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/templates/:trade/:location" element={<ProgrammaticSEO />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/estimate-templates" element={<EstimateTemplates />} />
              <Route path="/compare/wave-vs-proinvoice" element={<WaveVsProInvoice />} />
              <Route path="/compare/invoice-simple-vs-proinvoice" element={<InvoiceSimpleVsProInvoice />} />

              {/* Unique Pages Wave Doesn't Have */}
              <Route path="/why-estimates-matter" element={<WhyEstimatesMatter />} />
              <Route path="/deposit-collection-guide" element={<DepositCollectionGuide />} />
              <Route path="/payment-speed-calculator" element={<PaymentSpeedCalculator />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
