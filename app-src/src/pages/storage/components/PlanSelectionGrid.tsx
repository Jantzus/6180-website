import React from 'react';
import { 
  PlanGrid, 
  PlanCard, 
  PlanTitle, 
  PlanPrice,
  InsufficientBadge 
} from './styled/StorageStyledComponents';
import { Plan } from '../types/storageTypes';

interface PlanSelectionGridProps {
  plans: Plan[];
  selectedTier: number;
  isPlanSelected: boolean;
  customGB: string;
  onPlanSelect: (plan: Plan) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export const PlanSelectionGrid: React.FC<PlanSelectionGridProps> = ({ 
  plans, 
  selectedTier, 
  isPlanSelected, 
  customGB, 
  onPlanSelect,
  t 
}) => {
  return (
    <PlanGrid>
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          $isSelected={isPlanSelected && selectedTier === plan.subscriptions && !customGB && !plan.isInsufficient}
          $isInsufficient={plan.isInsufficient}
          onClick={() => onPlanSelect(plan)}
        >
          <PlanTitle>
            {t('{{gb}} GB', { gb: plan.storageGB })}
            {plan.subscriptions === 0 && (
              <span style={{ 
                marginLeft: '8px', 
                fontSize: '12px', 
                color: '#666',
                fontWeight: 'normal'
              }}>
                ({t('Max 5 albums')})
              </span>
            )}
          </PlanTitle>
          <PlanPrice style={{ 
            color: plan.isInsufficient ? '#666' : '#007bff'
          }}>
            {plan.price}
          </PlanPrice>
          {plan.isInsufficient && (
            <>
              <div style={{
                fontSize: '12px',
                color: '#e53935',
                fontWeight: 'bold',
                marginTop: '8px'
              }}>
                {plan.insufficientReason || t('Insufficient Capacity')}
              </div>
              <InsufficientBadge>⚠️</InsufficientBadge>
            </>
          )}
        </PlanCard>
      ))}
    </PlanGrid>
  );
};