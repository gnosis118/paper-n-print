import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface TimelineEvent {
  stage: 'draft' | 'sent' | 'deposit_paid' | 'invoiced' | 'paid';
  label: string;
  timestamp?: Date;
  amount?: number;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

interface EstimateTimelineProps {
  events: TimelineEvent[];
  currentStage: 'draft' | 'sent' | 'deposit_paid' | 'invoiced' | 'paid';
  estimateTotal: number;
  depositAmount: number;
}

const EstimateTimeline: React.FC<EstimateTimelineProps> = ({
  events,
  currentStage,
  estimateTotal,
  depositAmount,
}) => {
  const stageOrder = ['draft', 'sent', 'deposit_paid', 'invoiced', 'paid'];
  const currentStageIndex = stageOrder.indexOf(currentStage);

  const getStageIcon = (status: 'completed' | 'pending' | 'failed') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStageColor = (index: number, status: 'completed' | 'pending' | 'failed') => {
    if (status === 'completed') return 'bg-green-100 border-green-300';
    if (status === 'failed') return 'bg-red-100 border-red-300';
    if (index <= currentStageIndex) return 'bg-blue-100 border-blue-300';
    return 'bg-gray-100 border-gray-300';
  };

  const getStatusBadgeColor = (status: 'completed' | 'pending' | 'failed') => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      {/* Timeline Container */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10" />

        {/* Timeline Events */}
        <div className="flex justify-between items-start gap-2 sm:gap-4">
          {events.map((event, index) => (
            <div key={event.stage} className="flex-1 flex flex-col items-center">
              {/* Stage Circle */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3 ${getStageColor(
                  index,
                  event.status
                )}`}
              >
                {getStageIcon(event.status)}
              </div>

              {/* Stage Label */}
              <div className="text-center mb-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-900">{event.label}</p>
                <Badge className={`mt-1 ${getStatusBadgeColor(event.status)}`}>
                  {event.status === 'completed' ? 'Done' : event.status === 'failed' ? 'Failed' : 'Pending'}
                </Badge>
              </div>

              {/* Event Details */}
              {event.timestamp && (
                <div className="text-center text-xs text-gray-600 mb-2">
                  <p>{event.timestamp.toLocaleDateString()}</p>
                  <p className="text-gray-500">{event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              )}

              {/* Amount */}
              {event.amount !== undefined && (
                <div className="text-center">
                  <p className="text-sm font-semibold text-primary">
                    ${event.amount.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Description */}
              {event.description && (
                <p className="text-xs text-gray-600 text-center mt-1 line-clamp-2">
                  {event.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Estimate Total</p>
            <p className="text-lg font-bold text-gray-900">${estimateTotal.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Deposit Required</p>
            <p className="text-lg font-bold text-primary">${depositAmount.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Balance Due</p>
            <p className="text-lg font-bold text-gray-900">
              ${(estimateTotal - depositAmount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateTimeline;

