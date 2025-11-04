import React from 'react';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export type EstimateStatus = 'draft' | 'sent' | 'deposit_paid' | 'invoiced' | 'paid';

interface EstimateProgressIndicatorProps {
  status: EstimateStatus;
  depositPaid?: boolean;
  invoiceCreated?: boolean;
  fullPaid?: boolean;
  compact?: boolean;
}

const EstimateProgressIndicator: React.FC<EstimateProgressIndicatorProps> = ({
  status,
  depositPaid = false,
  invoiceCreated = false,
  fullPaid = false,
  compact = false,
}) => {
  const stages = [
    { key: 'draft', label: 'Draft', color: 'bg-gray-200' },
    { key: 'sent', label: 'Sent', color: 'bg-blue-200' },
    { key: 'deposit_paid', label: 'Deposit Paid', color: 'bg-yellow-200' },
    { key: 'invoiced', label: 'Invoiced', color: 'bg-purple-200' },
    { key: 'paid', label: 'Paid', color: 'bg-green-200' },
  ];

  const statusMap: Record<EstimateStatus, number> = {
    draft: 0,
    sent: 1,
    deposit_paid: 2,
    invoiced: 3,
    paid: 4,
  };

  const currentProgress = statusMap[status];
  const progressPercentage = ((currentProgress + 1) / stages.length) * 100;

  const getStatusIcon = (stageIndex: number) => {
    if (stageIndex < currentProgress) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    } else if (stageIndex === currentProgress) {
      return <Circle className="w-5 h-5 text-blue-600 fill-blue-600" />;
    } else {
      return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStageColor = (stageIndex: number) => {
    if (stageIndex < currentProgress) return 'bg-green-100 border-green-300';
    if (stageIndex === currentProgress) return 'bg-blue-100 border-blue-300';
    return 'bg-gray-100 border-gray-300';
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {stages[currentProgress].label}
          </span>
          <span className="text-xs text-gray-500">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">Progress</span>
          <span className="text-sm font-medium text-primary">
            {stages[currentProgress].label}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </div>

      {/* Stage Indicators */}
      <div className="flex justify-between items-center gap-1 sm:gap-2">
        {stages.map((stage, index) => (
          <div key={stage.key} className="flex-1 flex flex-col items-center">
            {/* Icon */}
            <div className={`mb-2 p-2 rounded-full border-2 ${getStageColor(index)}`}>
              {getStatusIcon(index)}
            </div>

            {/* Label */}
            <span className="text-xs text-center font-medium text-gray-700 line-clamp-2">
              {stage.label}
            </span>
          </div>
        ))}
      </div>

      {/* Status Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            {status === 'draft' ? (
              <Circle className="w-4 h-4 text-blue-600 fill-blue-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            )}
          </div>
          <p className="text-xs text-gray-600">Draft</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            {['draft'].includes(status) ? (
              <Circle className="w-4 h-4 text-gray-400" />
            ) : status === 'sent' ? (
              <Circle className="w-4 h-4 text-blue-600 fill-blue-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            )}
          </div>
          <p className="text-xs text-gray-600">Sent</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            {['draft', 'sent'].includes(status) ? (
              <Circle className="w-4 h-4 text-gray-400" />
            ) : status === 'deposit_paid' ? (
              <Circle className="w-4 h-4 text-blue-600 fill-blue-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            )}
          </div>
          <p className="text-xs text-gray-600">Deposit</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            {['draft', 'sent', 'deposit_paid'].includes(status) ? (
              <Circle className="w-4 h-4 text-gray-400" />
            ) : status === 'invoiced' ? (
              <Circle className="w-4 h-4 text-blue-600 fill-blue-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            )}
          </div>
          <p className="text-xs text-gray-600">Invoiced</p>
        </div>
      </div>
    </div>
  );
};

export default EstimateProgressIndicator;

