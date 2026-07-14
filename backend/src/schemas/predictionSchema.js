import { z } from 'zod';

const emptyableNumber = z.union([z.number(), z.literal('')]).transform((value) => value === '' ? 0 : value);
const emptyableString = z.string().default('');

export const assessmentDataSchema = z.object({
  gender: emptyableString,
  maritalStatus: emptyableString,
  cityTier: z.union([z.string(), z.number()]).transform(String),
  tenure: emptyableNumber,
  preferredLoginDevice: emptyableString,
  preferredPaymentMode: emptyableString,
  hoursSpent: emptyableNumber,
  registeredDevices: emptyableNumber,
  noOfAddresses: emptyableNumber,
  preferredOrderCategory: emptyableString,
  orderCount: emptyableNumber,
  couponUsed: emptyableNumber,
  cashbackAmount: emptyableNumber,
  daysSinceLastOrder: emptyableNumber,
  orderAmountHike: emptyableNumber,
  warehouseToHome: emptyableNumber,
  customerSatisfaction: z.number().min(1).max(5),
  complaint: z.boolean()
});

export const customerPredictionSchema = z.object({
  customerName: z.string().trim().min(1).max(120).optional(),
  inputData: assessmentDataSchema
});
