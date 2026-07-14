export function buildRecommendations(inputData) {
  const recs = [];
  const satisfaction = Number(inputData.customerSatisfaction || 0);
  const daysSinceLastOrder = Number(inputData.daysSinceLastOrder || 0);
  const orderAmountHike = Number(inputData.orderAmountHike || 0);
  const category = inputData.preferredOrderCategory || 'Laptop & Accessories';

  if (inputData.complaint) {
    recs.push({
      id: 'rec-support',
      title: 'Priority Customer Support',
      desc: 'Assign a senior relationship manager to resolve the complaint within 24 hours.',
      icon: 'phone',
      actionLabel: 'Schedule Priority Call'
    });
  }

  if (satisfaction <= 2) {
    recs.push({
      id: 'rec-rewards',
      title: 'Loyalty Rewards Boost',
      desc: 'Move the customer into a higher loyalty tier with a relevant welcome benefit.',
      icon: 'gift',
      actionLabel: 'Issue Loyalty Status'
    });
  }

  if (daysSinceLastOrder > 10) {
    recs.push({
      id: 'rec-email',
      title: 'Personalized Email Campaign',
      desc: `Send a personalized win-back campaign featuring ${category} recommendations.`,
      icon: 'mail',
      actionLabel: 'Queue Email Campaign'
    });
  }

  if (orderAmountHike < 5) {
    recs.push({
      id: 'rec-cashback',
      title: 'Offer Promotional Cashback',
      desc: 'Grant a limited wallet credit to incentivize the next transaction.',
      icon: 'wallet',
      actionLabel: 'Apply Wallet Credit'
    });
  }

  if (recs.length < 2) {
    recs.push({
      id: 'rec-coupon',
      title: 'Targeted Category Discount',
      desc: `Distribute a category discount tailored for ${category}.`,
      icon: 'ticket',
      actionLabel: 'Send Coupon Code'
    });
  }

  return recs;
}

export function toHistoryRecord(result) {
  return {
    id: result.id,
    date: new Date().toISOString().split('T')[0],
    customerName: result.customerName,
    gender: result.inputData.gender || 'Not Disclosed',
    cityTier: result.inputData.cityTier || '1',
    tenure: Number(result.inputData.tenure) || 0,
    paymentMode: result.inputData.preferredPaymentMode || 'E-Wallet',
    orderCount: Number(result.inputData.orderCount) || 0,
    satisfaction: Number(result.inputData.customerSatisfaction) || 0,
    complaint: Boolean(result.inputData.complaint),
    probability: result.probability,
    riskLevel: result.riskLevel
  };
}
