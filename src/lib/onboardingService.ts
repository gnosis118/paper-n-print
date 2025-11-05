import { supabase } from '@/integrations/supabase/client';

export interface OnboardingStep {
  day: number;
  title: string;
  description: string;
  action: string;
  actionUrl: string;
  completed: boolean;
  completedAt?: string;
}

export interface OnboardingProgress {
  userId: string;
  startedAt: string;
  completedAt?: string;
  currentDay: number;
  steps: OnboardingStep[];
  completionPercentage: number;
}

/**
 * First week onboarding timeline
 */
export const ONBOARDING_TIMELINE: OnboardingStep[] = [
  {
    day: 1,
    title: 'Welcome to ProInvoice',
    description: 'Set up your business profile and industry',
    action: 'Complete Profile',
    actionUrl: '/business-settings',
    completed: false,
  },
  {
    day: 1,
    title: 'Create Your First Estimate',
    description: 'Learn how to create a professional estimate in 2 minutes',
    action: 'Create Estimate',
    actionUrl: '/estimate/new',
    completed: false,
  },
  {
    day: 2,
    title: 'Set Up Payment Collection',
    description: 'Enable Stripe to collect deposits directly from estimates',
    action: 'Configure Payments',
    actionUrl: '/business-settings',
    completed: false,
  },
  {
    day: 3,
    title: 'Send Your First Estimate',
    description: 'Share an estimate with a client and collect a deposit',
    action: 'View Estimates',
    actionUrl: '/estimates',
    completed: false,
  },
  {
    day: 4,
    title: 'Set Up Reminders',
    description: 'Configure automatic payment reminders for unpaid estimates',
    action: 'Configure Reminders',
    actionUrl: '/business-settings',
    completed: false,
  },
  {
    day: 5,
    title: 'Create Your First Template',
    description: 'Save time by creating reusable estimate templates',
    action: 'Create Template',
    actionUrl: '/templates',
    completed: false,
  },
  {
    day: 6,
    title: 'Explore Analytics',
    description: 'View your dashboard and track key metrics',
    action: 'View Dashboard',
    actionUrl: '/invoice',
    completed: false,
  },
  {
    day: 7,
    title: 'Upgrade to Pro',
    description: 'Unlock unlimited estimates and advanced features',
    action: 'View Pricing',
    actionUrl: '/pricing',
    completed: false,
  },
];

/**
 * Generate a sample job for new users
 */
export const generateSampleJob = async (
  userId: string,
  industry: string
): Promise<any> => {
  const sampleJobs: Record<string, any> = {
    electrician: {
      title: 'Residential Electrical Wiring',
      items: [
        { description: 'Outlet installation (10 outlets)', quantity: 10, rate: 50, amount: 500 },
        { description: 'Switch installation (5 switches)', quantity: 5, rate: 40, amount: 200 },
        { description: 'Panel upgrade', quantity: 1, rate: 800, amount: 800 },
      ],
      notes: 'Sample estimate - feel free to modify or delete',
    },
    plumber: {
      title: 'Bathroom Plumbing Installation',
      items: [
        { description: 'Sink installation', quantity: 1, rate: 300, amount: 300 },
        { description: 'Toilet installation', quantity: 1, rate: 250, amount: 250 },
        { description: 'Shower valve installation', quantity: 1, rate: 400, amount: 400 },
      ],
      notes: 'Sample estimate - feel free to modify or delete',
    },
    roofer: {
      title: 'Roof Repair and Replacement',
      items: [
        { description: 'Roof inspection', quantity: 1, rate: 200, amount: 200 },
        { description: 'Shingle replacement (100 sq ft)', quantity: 100, rate: 15, amount: 1500 },
        { description: 'Flashing repair', quantity: 1, rate: 300, amount: 300 },
      ],
      notes: 'Sample estimate - feel free to modify or delete',
    },
    landscaper: {
      title: 'Landscape Design and Installation',
      items: [
        { description: 'Design consultation', quantity: 1, rate: 500, amount: 500 },
        { description: 'Sod installation (500 sq ft)', quantity: 500, rate: 0.5, amount: 250 },
        { description: 'Tree planting (5 trees)', quantity: 5, rate: 150, amount: 750 },
      ],
      notes: 'Sample estimate - feel free to modify or delete',
    },
    handyman: {
      title: 'General Home Repairs',
      items: [
        { description: 'Drywall repair', quantity: 1, rate: 200, amount: 200 },
        { description: 'Paint room (200 sq ft)', quantity: 200, rate: 1, amount: 200 },
        { description: 'Door installation', quantity: 1, rate: 300, amount: 300 },
      ],
      notes: 'Sample estimate - feel free to modify or delete',
    },
  };

  const sampleJob = sampleJobs[industry] || sampleJobs.handyman;
  const subtotal = sampleJob.items.reduce((sum: number, item: any) => sum + item.amount, 0);
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const { data: estimate, error } = await supabase
    .from('estimates')
    .insert({
      user_id: userId,
      client_name: 'Sample Client',
      client_email: 'sample@example.com',
      number: 'SAMPLE-001',
      title: sampleJob.title,
      items: sampleJob.items,
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total,
      deposit_percentage: 30,
      deposit_amount: total * 0.3,
      status: 'pending_payment',
      notes: sampleJob.notes,
      is_bid: true,
    })
    .select()
    .single();

  if (error) throw error;
  return estimate;
};

/**
 * Initialize onboarding for a new user
 */
export const initializeOnboarding = async (
  userId: string,
  industry: string
): Promise<OnboardingProgress> => {
  // Generate sample job
  await generateSampleJob(userId, industry);

  // Create onboarding progress record
  const progress: OnboardingProgress = {
    userId,
    startedAt: new Date().toISOString(),
    currentDay: 1,
    steps: ONBOARDING_TIMELINE,
    completionPercentage: 0,
  };

  // Store in profiles table
  await supabase
    .from('profiles')
    .update({
      onboarding_completed: false,
    })
    .eq('id', userId);

  return progress;
};

/**
 * Mark an onboarding step as completed
 */
export const completeOnboardingStep = async (
  userId: string,
  stepDay: number,
  stepTitle: string
): Promise<OnboardingProgress> => {
  // Update step completion in local state (would be stored in a separate table in production)
  const steps = ONBOARDING_TIMELINE.map((step) => {
    if (step.day === stepDay && step.title === stepTitle) {
      return { ...step, completed: true, completedAt: new Date().toISOString() };
    }
    return step;
  });

  const completedSteps = steps.filter((s) => s.completed).length;
  const completionPercentage = (completedSteps / steps.length) * 100;

  // Check if all steps completed
  if (completionPercentage === 100) {
    await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
      })
      .eq('id', userId);
  }

  return {
    userId,
    startedAt: new Date().toISOString(),
    currentDay: Math.ceil(new Date().getTime() / (1000 * 60 * 60 * 24)),
    steps,
    completionPercentage,
  };
};

/**
 * Get current onboarding progress
 */
export const getOnboardingProgress = async (userId: string): Promise<OnboardingProgress> => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', userId)
    .single();

  const daysSinceSignup = Math.ceil(
    (new Date().getTime() - new Date(profile?.created_at || new Date()).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return {
    userId,
    startedAt: new Date().toISOString(),
    currentDay: Math.min(daysSinceSignup, 7),
    steps: ONBOARDING_TIMELINE,
    completionPercentage: profile?.onboarding_completed ? 100 : 0,
  };
};

/**
 * Send onboarding nudge email
 */
export const sendOnboardingNudge = async (
  userId: string,
  userEmail: string,
  currentDay: number,
  nextStep: OnboardingStep
): Promise<void> => {
  // This would integrate with your email service (Resend, SendGrid, etc.)
  console.log(`Sending onboarding nudge to ${userEmail} for Day ${currentDay}: ${nextStep.title}`);

  // Example: Call your email service
  // await sendEmail({
  //   to: userEmail,
  //   subject: `Day ${currentDay}: ${nextStep.title}`,
  //   template: 'onboarding-nudge',
  //   data: { nextStep, currentDay }
  // });
};

