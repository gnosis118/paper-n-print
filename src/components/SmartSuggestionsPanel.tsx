import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, Clock, Target, AlertCircle, Zap } from 'lucide-react';
import { useSmartSuggestions, type SmartSuggestion } from '@/hooks/useSmartSuggestions';
import { Skeleton } from '@/components/ui/skeleton';

export const SmartSuggestionsPanel: React.FC = () => {
  const { suggestions, loading, error } = useSmartSuggestions();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive text-sm">Failed to load suggestions</p>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Lightbulb className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No suggestions at this time</p>
        </CardContent>
      </Card>
    );
  }

  const getIcon = (type: SmartSuggestion['type']) => {
    switch (type) {
      case 'upsell':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'timing':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'follow_up':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'optimization':
        return <Zap className="w-5 h-5 text-purple-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getPriorityColor = (priority: SmartSuggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: SmartSuggestion['type']) => {
    switch (type) {
      case 'upsell':
        return 'Upsell';
      case 'timing':
        return 'Timing';
      case 'follow_up':
        return 'Follow-up';
      case 'optimization':
        return 'Optimization';
      default:
        return 'Suggestion';
    }
  };

  // Sort by priority
  const sortedSuggestions = [...suggestions].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <h3 className="font-semibold text-lg">Smart Suggestions</h3>
        <Badge variant="secondary">{suggestions.length}</Badge>
      </div>

      {sortedSuggestions.map((suggestion) => (
        <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getIcon(suggestion.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
                <Badge className={getPriorityColor(suggestion.priority)}>
                  {suggestion.priority}
                </Badge>
              </div>

              {/* Type and Impact */}
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline">{getTypeLabel(suggestion.type)}</Badge>
                <span className="text-green-600 font-medium">{suggestion.impact}</span>
              </div>

              {/* Action Button */}
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
              >
                {suggestion.action}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SmartSuggestionsPanel;

