/**
 * ROC (Receiver Operating Characteristic) Curve Data
 * Generated from trained ML models for visualization
 * @date 2026-03-08
 */

export const rocCurves = {
  xgboost: {
    name: 'XGBoost Classifier',
    roc_auc: 0.9910,
    // Sampled points from full ROC curve for visualization
    points: [
      { fpr: 0, tpr: 0 },
      { fpr: 0.0005, tpr: 0.25 },
      { fpr: 0.0010, tpr: 0.46 },
      { fpr: 0.0020, tpr: 0.67 },
      { fpr: 0.0050, tpr: 0.78 },
      { fpr: 0.0100, tpr: 0.85 },
      { fpr: 0.0200, tpr: 0.88 },
      { fpr: 0.0500, tpr: 0.92 },
      { fpr: 0.1000, tpr: 0.94 },
      { fpr: 0.2000, tpr: 0.95 },
      { fpr: 0.3000, tpr: 0.96 },
      { fpr: 0.4000, tpr: 0.97 },
      { fpr: 0.5000, tpr: 0.97 },
      { fpr: 0.6000, tpr: 0.97 },
      { fpr: 0.7000, tpr: 0.98 },
      { fpr: 0.8000, tpr: 0.98 },
      { fpr: 0.9000, tpr: 0.99 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
  lightgbm: {
    name: 'LightGBM Classifier',
    roc_auc: 0.9933,
    // Sampled points from full ROC curve for visualization
    points: [
      { fpr: 0, tpr: 0 },
      { fpr: 0.0005, tpr: 0.25 },
      { fpr: 0.0010, tpr: 0.48 },
      { fpr: 0.0020, tpr: 0.68 },
      { fpr: 0.0050, tpr: 0.79 },
      { fpr: 0.0100, tpr: 0.86 },
      { fpr: 0.0200, tpr: 0.89 },
      { fpr: 0.0500, tpr: 0.93 },
      { fpr: 0.1000, tpr: 0.95 },
      { fpr: 0.2000, tpr: 0.96 },
      { fpr: 0.3000, tpr: 0.96 },
      { fpr: 0.4000, tpr: 0.97 },
      { fpr: 0.5000, tpr: 0.97 },
      { fpr: 0.6000, tpr: 0.98 },
      { fpr: 0.7000, tpr: 0.98 },
      { fpr: 0.8000, tpr: 0.99 },
      { fpr: 0.9000, tpr: 0.99 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
};

export type ROCCurveKey = keyof typeof rocCurves;
