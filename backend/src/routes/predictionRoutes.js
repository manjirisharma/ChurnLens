import { Router } from 'express';
import { customerPredictionSchema } from '../schemas/predictionSchema.js';
import { predictChurn, getModelSchema } from '../services/mlService.js';
import { buildRecommendations, toHistoryRecord } from '../services/recommendationService.js';

const router = Router();

router.get('/model/schema', (_req, res) => {
  res.json(getModelSchema());
});

router.post('/predict', async (req, res, next) => {
  try {
    const parsed = customerPredictionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid prediction payload',
        details: parsed.error.flatten()
      });
    }

    const { customerName, inputData } = parsed.data;
    const mlResult = await predictChurn(inputData);
    const probability = Math.round(mlResult.probability * 100);
    const riskLevel = probability >= 70 ? 'High' : probability >= 40 ? 'Medium' : 'Low';
    const predictionId = `CS-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const result = {
      id: predictionId,
      customerName: customerName || 'Assessment Client',
      isLikelyToChurn: probability >= 50,
      probability,
      riskLevel,
      timestamp,
      inputData,
      recommendations: buildRecommendations(inputData),
      model: {
        prediction: mlResult.prediction,
        features: mlResult.features
      }
    };

    res.json({
      result,
      historyRecord: toHistoryRecord(result)
    });
  } catch (error) {
    next(error);
  }
});

export default router;
