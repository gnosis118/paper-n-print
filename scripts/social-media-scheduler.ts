/**
 * Social Media Scheduler
 * 
 * This script schedules automated social media posts to drive organic traffic.
 * Run this with: deno run --allow-net --allow-env scripts/social-media-scheduler.ts
 */

interface PostSchedule {
  day: string;
  time: string;
  type: 'tips' | 'features' | 'testimonials' | 'stats';
  platforms: string[];
}

// Weekly posting schedule
const weeklySchedule: PostSchedule[] = [
  // Monday - Motivation & Tips
  {
    day: 'Monday',
    time: '09:00',
    type: 'tips',
    platforms: ['twitter', 'linkedin', 'facebook']
  },
  {
    day: 'Monday',
    time: '15:00',
    type: 'stats',
    platforms: ['linkedin']
  },
  
  // Tuesday - Features & Product
  {
    day: 'Tuesday',
    time: '10:00',
    type: 'features',
    platforms: ['twitter', 'linkedin']
  },
  {
    day: 'Tuesday',
    time: '16:00',
    type: 'tips',
    platforms: ['facebook']
  },
  
  // Wednesday - Tips & Education
  {
    day: 'Wednesday',
    time: '09:00',
    type: 'tips',
    platforms: ['twitter', 'linkedin']
  },
  {
    day: 'Wednesday',
    time: '14:00',
    type: 'testimonials',
    platforms: ['facebook', 'linkedin']
  },
  
  // Thursday - Features & Stats
  {
    day: 'Thursday',
    time: '10:00',
    type: 'features',
    platforms: ['twitter', 'facebook']
  },
  {
    day: 'Thursday',
    time: '15:00',
    type: 'stats',
    platforms: ['linkedin']
  },
  
  // Friday - Testimonials & Tips
  {
    day: 'Friday',
    time: '09:00',
    type: 'testimonials',
    platforms: ['twitter', 'linkedin', 'facebook']
  },
  {
    day: 'Friday',
    time: '16:00',
    type: 'tips',
    platforms: ['twitter']
  },
  
  // Weekend - Light posting
  {
    day: 'Saturday',
    time: '11:00',
    type: 'tips',
    platforms: ['facebook']
  },
  {
    day: 'Sunday',
    time: '10:00',
    type: 'stats',
    platforms: ['linkedin']
  },
];

// Function to call the Supabase Edge Function
async function schedulePost(schedule: PostSchedule) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    return;
  }
  
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/social-media-poster`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: schedule.type,
        platforms: schedule.platforms,
      }),
    });
    
    const result = await response.json();
    console.log(`✅ Posted ${schedule.type} to ${schedule.platforms.join(', ')} at ${schedule.time}`);
    console.log('Content:', result.content);
    console.log('Results:', result.results);
  } catch (error) {
    console.error(`❌ Failed to post ${schedule.type}:`, error.message);
  }
}

// Main scheduler function
async function runScheduler() {
  console.log('🚀 Social Media Scheduler Started');
  console.log('📅 Weekly Schedule:');
  console.log('-------------------');
  
  weeklySchedule.forEach(schedule => {
    console.log(`${schedule.day} ${schedule.time} - ${schedule.type} → ${schedule.platforms.join(', ')}`);
  });
  
  console.log('\n⏰ Waiting for scheduled times...\n');
  
  // Check every minute if it's time to post
  setInterval(() => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    
    const scheduledPosts = weeklySchedule.filter(
      schedule => schedule.day === currentDay && schedule.time === currentTime
    );
    
    scheduledPosts.forEach(schedule => {
      console.log(`\n📤 Time to post! ${currentDay} ${currentTime}`);
      schedulePost(schedule);
    });
  }, 60000); // Check every minute
}

// Run the scheduler
if (import.meta.main) {
  runScheduler();
}

export { weeklySchedule, schedulePost };

