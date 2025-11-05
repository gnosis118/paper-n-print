import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, ArrowRight, Zap } from 'lucide-react';
import {
  getOnboardingProgress,
  completeOnboardingStep,
  ONBOARDING_TIMELINE,
} from '@/lib/onboardingService';

interface OnboardingWizardProps {
  userId: string;
  onComplete?: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ userId, onComplete }) => {
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  useEffect(() => {
    loadProgress();
  }, [userId]);

  const loadProgress = async () => {
    try {
      const data = await getOnboardingProgress(userId);
      setProgress(data);
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteStep = async (stepId: string) => {
    try {
      await completeOnboardingStep(userId, stepId);
      await loadProgress();
    } catch (error) {
      console.error('Error completing step:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">Loading onboarding progress...</div>
        </CardContent>
      </Card>
    );
  }

  const completedSteps = progress?.completed_steps?.length || 0;
  const totalSteps = ONBOARDING_TIMELINE.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  // Group steps by day
  const stepsByDay = ONBOARDING_TIMELINE.reduce((acc: any, step: any) => {
    if (!acc[step.day]) {
      acc[step.day] = [];
    }
    acc[step.day].push(step);
    return acc;
  }, {});

  const days = Object.keys(stepsByDay).map(Number).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                First Week Onboarding
              </CardTitle>
              <CardDescription>Get up and running in 7 days</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{completedSteps}</div>
              <div className="text-sm text-muted-foreground">of {totalSteps} steps</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {completedSteps === totalSteps && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-900">🎉 Onboarding Complete!</p>
                <p className="text-sm text-green-800">You're all set to start using ProInvoice!</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Steps */}
      <div className="space-y-4">
        {days.map((day) => {
          const daySteps = stepsByDay[day];
          const dayCompleted = daySteps.every((step: any) =>
            progress?.completed_steps?.includes(step.id)
          );
          const isExpanded = expandedDay === day;

          return (
            <Card key={day} className={dayCompleted ? 'bg-green-50 border-green-200' : ''}>
              <button
                onClick={() => setExpandedDay(isExpanded ? null : day)}
                className="w-full text-left"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex-shrink-0">
                        {day}
                      </div>
                      <div>
                        <CardTitle className="text-lg">Day {day}</CardTitle>
                        <CardDescription>
                          {dayCompleted ? '✓ Completed' : `${daySteps.length} steps`}
                        </CardDescription>
                      </div>
                    </div>
                    {dayCompleted && (
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
              </button>

              {isExpanded && (
                <CardContent className="space-y-3 border-t pt-4">
                  {daySteps.map((step: any, index: number) => {
                    const isCompleted = progress?.completed_steps?.includes(step.id);
                    return (
                      <div
                        key={step.id}
                        className={`border rounded-lg p-4 space-y-3 ${
                          isCompleted ? 'bg-green-50 border-green-200' : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          {isCompleted && (
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>

                        {!isCompleted && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleCompleteStep(step.id)}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              {step.action}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleCompleteStep(step.id)}
                              variant="ghost"
                              size="sm"
                            >
                              Mark Done
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" />
            Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Complete one step per day for best results</p>
          <p>✓ Use the sample job to practice creating estimates</p>
          <p>✓ Set up payment collection early to start collecting deposits</p>
          <p>✓ Explore analytics to understand your business metrics</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingWizard;

