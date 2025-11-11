import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Critical pages - load immediately
import Index from "./pages/Index";
// Lazy load all other pages
const Invoice = lazy(() => import("./pages/Invoice"));
const Templates = lazy(() => import("./pages/Templates"));
const InvoiceTemplates = lazy(() => import("./pages/InvoiceTemplates"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Auth = lazy(() => import("./pages/Auth"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCanceled = lazy(() => import("./pages/PaymentCanceled"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const DoNotSell = lazy(() => import("./pages/DoNotSell"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Products = lazy(() => import("./pages/Products"));
const Blog = lazy(() => import("./pages/Blog"));
const Docs = lazy(() => import("./pages/Docs"));
const BusinessSettings = lazy(() => import("./pages/BusinessSettings"));
const Security = lazy(() => import("./pages/Security"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const SubscriptionManagement = lazy(() => import("./pages/SubscriptionManagement"));
const EstimateView = lazy(() => import('./pages/EstimateView'));
const InvoiceView = lazy(() => import('./pages/InvoiceView'));
const Estimates = lazy(() => import('./pages/Estimates'));
const Clients = lazy(() => import('./pages/Clients'));
const RecurringBilling = lazy(() => import('./pages/RecurringBilling'));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ConstructionInvoiceTemplate = lazy(() => import("./pages/templates/Construction"));
const ConsultingInvoiceTemplate = lazy(() => import("./pages/templates/Consulting"));
const FreelanceNYCTemplate = lazy(() => import("./pages/templates/FreelanceNYC"));
const FreelanceCATemplate = lazy(() => import("./pages/templates/FreelanceCA"));
const ProgrammaticSEO = lazy(() => import("./pages/templates/ProgrammaticSEO"));

// Import niche invoice templates - lazy loaded
const HVACInvoiceTemplate = lazy(() => import("./pages/templates/HVACInvoiceTemplate"));
const LawnCareInvoiceTemplate = lazy(() => import("./pages/templates/LawnCareInvoiceTemplate"));
const HandymanInvoiceTemplate = lazy(() => import("./pages/templates/HandymanInvoiceTemplate"));
const CleaningInvoiceTemplate = lazy(() => import("./pages/templates/CleaningInvoiceTemplate"));
const RoofingInvoiceTemplate = lazy(() => import("./pages/templates/RoofingInvoiceTemplate"));
const PlumbingInvoiceTemplate = lazy(() => import("./pages/templates/PlumbingInvoiceTemplate"));
const ElectricianInvoiceTemplate = lazy(() => import("./pages/templates/ElectricianInvoiceTemplate"));
const FreelanceDesignerInvoiceTemplate = lazy(() => import("./pages/templates/FreelanceDesignerInvoiceTemplate"));
const PhotographerInvoiceTemplate = lazy(() => import("./pages/templates/PhotographerInvoiceTemplate"));
const VideographerInvoiceTemplate = lazy(() => import("./pages/templates/VideographerInvoiceTemplate"));
const PersonalTrainerInvoiceTemplate = lazy(() => import("./pages/templates/PersonalTrainerInvoiceTemplate"));
const AutoDetailingInvoiceTemplate = lazy(() => import("./pages/templates/AutoDetailingInvoiceTemplate"));
const MobileMechanicInvoiceTemplate = lazy(() => import("./pages/templates/MobileMechanicInvoiceTemplate"));
const PestControlInvoiceTemplate = lazy(() => import("./pages/templates/PestControlInvoiceTemplate"));
const PressureWashingInvoiceTemplate = lazy(() => import("./pages/templates/PressureWashingInvoiceTemplate"));
const LandscaperInvoiceTemplate = lazy(() => import("./pages/templates/LandscaperInvoiceTemplate"));
const RealEstatePhotographerInvoiceTemplate = lazy(() => import("./pages/templates/RealEstatePhotographerInvoiceTemplate"));
const TattooArtistInvoiceTemplate = lazy(() => import("./pages/templates/TattooArtistInvoiceTemplate"));
const MakeupArtistInvoiceTemplate = lazy(() => import("./pages/templates/MakeupArtistInvoiceTemplate"));
const HairStylistInvoiceTemplate = lazy(() => import("./pages/templates/HairStylistInvoiceTemplate"));
const NotaryInvoiceTemplate = lazy(() => import("./pages/templates/NotaryInvoiceTemplate"));
const BookkeepingInvoiceTemplate = lazy(() => import("./pages/templates/BookkeepingInvoiceTemplate"));
const DJInvoiceTemplate = lazy(() => import("./pages/templates/DJInvoiceTemplate"));
const EventPlannerInvoiceTemplate = lazy(() => import("./pages/templates/EventPlannerInvoiceTemplate"));
const CatererInvoiceTemplate = lazy(() => import("./pages/templates/CatererInvoiceTemplate"));
const SnowRemovalInvoiceTemplate = lazy(() => import("./pages/templates/SnowRemovalInvoiceTemplate"));
const WindowCleaningInvoiceTemplate = lazy(() => import("./pages/templates/WindowCleaningInvoiceTemplate"));
const MassageTherapistInvoiceTemplate = lazy(() => import("./pages/templates/MassageTherapistInvoiceTemplate"));
const CarpetCleanerInvoiceTemplate = lazy(() => import("./pages/templates/CarpetCleanerInvoiceTemplate"));
const GetStarted = lazy(() => import('./pages/GetStarted'));
const EstimateTemplates = lazy(() => import('./pages/EstimateTemplates'));
const Estimate = lazy(() => import('./pages/Estimate'));
const Analytics = lazy(() => import('./pages/Analytics'));
const TradesIndex = lazy(() => import('./pages/trades/TradesIndex'));
const TradePage = lazy(() => import('./pages/trades/TradePage'));
const Plumbers = lazy(() => import('./pages/trades/Plumbers'));
const Roofers = lazy(() => import('./pages/trades/Roofers'));
const Electricians = lazy(() => import('./pages/trades/Electricians'));
const Painters = lazy(() => import('./pages/trades/Painters'));
const Landscapers = lazy(() => import('./pages/trades/Landscapers'));
const HVACContractors = lazy(() => import('./pages/trades/HVACContractors'));
const GeneralContractors = lazy(() => import('./pages/trades/GeneralContractors'));

// Import feature pages - lazy loaded
const MilestonePayments = lazy(() => import('./pages/features/MilestonePayments'));
const ChangeOrderManagement = lazy(() => import('./pages/features/ChangeOrderManagement'));
const DepositCollection = lazy(() => import('./pages/features/DepositCollection'));
const ProgressBilling = lazy(() => import('./pages/features/ProgressBilling'));

// Import guide pages - lazy loaded
const ProtectingCashflow = lazy(() => import('./pages/guides/ProtectingCashflow'));
const HandlingChangeOrders = lazy(() => import('./pages/guides/HandlingChangeOrders'));
const MultiDayProjects = lazy(() => import('./pages/guides/MultiDayProjects'));
const HowToGetPaidFaster = lazy(() => import('./pages/guides/HowToGetPaidFaster'));
const HowToReduceLatePayments = lazy(() => import('./pages/guides/HowToReduceLatePayments'));
const HowToCollectDeposits = lazy(() => import('./pages/guides/HowToCollectDeposits'));
const HowToManageMultipleClients = lazy(() => import('./pages/guides/HowToManageMultipleClients'));

// Import estimate templates - lazy loaded
const HVACEstimateTemplate = lazy(() => import("./pages/templates/HVACEstimateTemplate"));
const PlumbingEstimateTemplate = lazy(() => import("./pages/templates/PlumbingEstimateTemplate"));
const ConstructionEstimateTemplate = lazy(() => import("./pages/templates/ConstructionEstimateTemplate"));
const LandscapingEstimateTemplate = lazy(() => import("./pages/templates/LandscapingEstimateTemplate"));
const RoofingEstimateTemplate = lazy(() => import("./pages/templates/RoofingEstimateTemplate"));
const CleaningEstimateTemplate = lazy(() => import("./pages/templates/CleaningEstimateTemplate"));
const WaveVsProInvoice = lazy(() => import('./pages/compare/WaveVsProInvoice'));
const InvoiceSimpleVsProInvoice = lazy(() => import('./pages/compare/InvoiceSimpleVsProInvoice'));
const WhyEstimatesMatter = lazy(() => import('./pages/WhyEstimatesMatter'));
const DepositCollectionGuide = lazy(() => import('./pages/DepositCollectionGuide'));
const PaymentSpeedCalculator = lazy(() => import('./pages/PaymentSpeedCalculator'));

// Import documentation pages - lazy loaded
const CreatingFirstInvoice = lazy(() => import('./pages/docs/CreatingFirstInvoice'));
const UnderstandingTemplates = lazy(() => import('./pages/docs/UnderstandingTemplates'));
const AddingLineItems = lazy(() => import('./pages/docs/AddingLineItems'));
const CustomizingAppearance = lazy(() => import('./pages/docs/CustomizingAppearance'));
const BusinessProfile = lazy(() => import('./pages/docs/BusinessProfile'));
const PaymentLinks = lazy(() => import('./pages/docs/PaymentLinks'));
const AddingClients = lazy(() => import('./pages/docs/AddingClients'));
const FAQ = lazy(() => import('./pages/docs/FAQ'));
const FeatureRequests = lazy(() => import('./pages/docs/FeatureRequests'));
const SystemStatus = lazy(() => import('./pages/docs/SystemStatus'));
const UploadingLogo = lazy(() => import('./pages/docs/UploadingLogo'));
const ManagingBusinessInfo = lazy(() => import('./pages/docs/ManagingBusinessInfo'));
const CustomizingBrandColors = lazy(() => import('./pages/docs/CustomizingBrandColors'));
const EditingClientInfo = lazy(() => import('./pages/docs/EditingClientInfo'));
const ClientHistory = lazy(() => import('./pages/docs/ClientHistory'));
const ManagingContacts = lazy(() => import('./pages/docs/ManagingContacts'));
const PaymentTerms = lazy(() => import('./pages/docs/PaymentTerms'));
const ManagingSubscriptions = lazy(() => import('./pages/docs/ManagingSubscriptions'));
const PaymentSecurity = lazy(() => import('./pages/docs/PaymentSecurity'));

// Import all industry-specific invoice templates - lazy loaded
const ConstructionTemplate = lazy(() => import("./pages/invoice-templates/Construction"));
const ContractorTemplate = lazy(() => import("./pages/invoice-templates/Contractor"));
const PlumberTemplate = lazy(() => import("./pages/invoice-templates/Plumber"));
const ElectricianTemplate = lazy(() => import("./pages/invoice-templates/Electrician"));
const HVACTemplate = lazy(() => import("./pages/invoice-templates/HVAC"));
const RoofingTemplate = lazy(() => import("./pages/invoice-templates/Roofing"));
const PaintingTemplate = lazy(() => import("./pages/invoice-templates/Painting"));
const HandymanTemplate = lazy(() => import("./pages/invoice-templates/Handyman"));
const LandscapingTemplate = lazy(() => import("./pages/invoice-templates/Landscaping"));
const CleaningTemplate = lazy(() => import("./pages/invoice-templates/Cleaning"));
const WindowCleaningTemplate = lazy(() => import("./pages/invoice-templates/WindowCleaning"));
const PestControlTemplate = lazy(() => import("./pages/invoice-templates/PestControl"));
const AutoRepairTemplate = lazy(() => import("./pages/invoice-templates/AutoRepair"));
const CarDetailingTemplate = lazy(() => import("./pages/invoice-templates/CarDetailing"));
const TowingTemplate = lazy(() => import("./pages/invoice-templates/Towing"));
const MovingTemplate = lazy(() => import("./pages/invoice-templates/Moving"));
const TruckingTemplate = lazy(() => import("./pages/invoice-templates/Trucking"));
const CourierTemplate = lazy(() => import("./pages/invoice-templates/Courier"));
const PhotographyTemplate = lazy(() => import("./pages/invoice-templates/Photography"));
const VideographyTemplate = lazy(() => import("./pages/invoice-templates/Videography"));
const GraphicDesignTemplate = lazy(() => import("./pages/invoice-templates/GraphicDesign"));
const WebDesignTemplate = lazy(() => import("./pages/invoice-templates/WebDesign"));
const MarketingTemplate = lazy(() => import("./pages/invoice-templates/Marketing"));
const ConsultingTemplate = lazy(() => import("./pages/invoice-templates/Consulting"));
const CateringTemplate = lazy(() => import("./pages/invoice-templates/Catering"));
const EventPlannerTemplate = lazy(() => import("./pages/invoice-templates/EventPlanner"));
const SalonTemplate = lazy(() => import("./pages/invoice-templates/Salon"));
const MassageTemplate = lazy(() => import("./pages/invoice-templates/Massage"));
const PersonalTrainerTemplate = lazy(() => import("./pages/invoice-templates/PersonalTrainer"));
const TutorTemplate = lazy(() => import("./pages/invoice-templates/Tutor"));

const queryClient = new QueryClient();

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/e/:token" element={<EstimateView />} />
              <Route path="/i/:id" element={<InvoiceView />} />
              <Route path="/estimate/new" element={<ProtectedRoute><Estimate /></ProtectedRoute>} />
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
              <Route path="/recurring-billing" element={<RecurringBilling />} />
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
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/templates/:trade/:location" element={<ProgrammaticSEO />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/estimate-templates" element={<EstimateTemplates />} />
              <Route path="/compare/wave-vs-proinvoice" element={<WaveVsProInvoice />} />
              <Route path="/compare/invoice-simple-vs-proinvoice" element={<InvoiceSimpleVsProInvoice />} />

              {/* Contractor Trades Pages */}
              <Route path="/trades" element={<TradesIndex />} />
              <Route path="/trades/:trade" element={<TradePage />} />
              <Route path="/plumbers" element={<Plumbers />} />
              <Route path="/roofers" element={<Roofers />} />
              <Route path="/electricians" element={<Electricians />} />
              <Route path="/painters" element={<Painters />} />
              <Route path="/landscapers" element={<Landscapers />} />
              <Route path="/hvac-contractors" element={<HVACContractors />} />
              <Route path="/general-contractors" element={<GeneralContractors />} />

              {/* Feature Pages */}
              <Route path="/features/milestone-payments" element={<MilestonePayments />} />
              <Route path="/features/change-order-management" element={<ChangeOrderManagement />} />
              <Route path="/features/deposit-collection" element={<DepositCollection />} />
              <Route path="/features/progress-billing" element={<ProgressBilling />} />

              {/* Guide Pages */}
              <Route path="/guides/protecting-cashflow" element={<ProtectingCashflow />} />
              <Route path="/guides/handling-change-orders" element={<HandlingChangeOrders />} />
              <Route path="/guides/multi-day-projects" element={<MultiDayProjects />} />
              <Route path="/guides/how-to-get-paid-faster" element={<HowToGetPaidFaster />} />
              <Route path="/guides/how-to-reduce-late-payments" element={<HowToReduceLatePayments />} />
              <Route path="/guides/how-to-collect-deposits" element={<HowToCollectDeposits />} />
              <Route path="/guides/how-to-manage-multiple-clients" element={<HowToManageMultipleClients />} />

              {/* Unique Pages Wave Doesn't Have */}
              <Route path="/why-estimates-matter" element={<WhyEstimatesMatter />} />
              <Route path="/deposit-collection-guide" element={<DepositCollectionGuide />} />
              <Route path="/payment-speed-calculator" element={<PaymentSpeedCalculator />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
