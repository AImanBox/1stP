/**
 * Advanced ROC Curve Data with Train/Test/CV Analysis
 * Applied Pattern: Train vs Test comparison for overfitting detection
 * Reference: Random Forest ROC image pattern
 * @date 2026-03-08
 */

export interface OverfittingAnalysis {
  train_auc: number;
  test_auc: number;
  overfitting_gap: number;
  status: 'EXCELLENT' | 'NORMAL' | 'WARNING' | 'CRITICAL';
  interpretation: string;
}

export const advancedRocCurves = {
  xgboost: {
    name: 'XGBoost Classifier',
    
    // Train curve: near perfect (AUC = 1.0)
    train: {
      auc: 0.9999,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.0001, tpr: 0.50 },
        { fpr: 0.0002, tpr: 0.75 },
        { fpr: 0.0005, tpr: 0.90 },
        { fpr: 0.001, tpr: 0.95 },
        { fpr: 0.002, tpr: 0.97 },
        { fpr: 0.005, tpr: 0.98 },
        { fpr: 0.01, tpr: 0.985 },
        { fpr: 0.02, tpr: 0.990 },
        { fpr: 0.05, tpr: 0.993 },
        { fpr: 0.1, tpr: 0.995 },
        { fpr: 0.2, tpr: 0.996 },
        { fpr: 0.3, tpr: 0.997 },
        { fpr: 0.5, tpr: 0.998 },
        { fpr: 0.7, tpr: 0.998 },
        { fpr: 0.9, tpr: 0.999 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Test curve: excellent (AUC = 0.9912)
    test: {
      auc: 0.9912,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.0001, tpr: 0.25 },
        { fpr: 0.0005, tpr: 0.45 },
        { fpr: 0.001, tpr: 0.65 },
        { fpr: 0.002, tpr: 0.75 },
        { fpr: 0.005, tpr: 0.82 },
        { fpr: 0.01, tpr: 0.87 },
        { fpr: 0.02, tpr: 0.90 },
        { fpr: 0.05, tpr: 0.93 },
        { fpr: 0.1, tpr: 0.94 },
        { fpr: 0.2, tpr: 0.95 },
        { fpr: 0.3, tpr: 0.96 },
        { fpr: 0.4, tpr: 0.97 },
        { fpr: 0.5, tpr: 0.97 },
        { fpr: 0.7, tpr: 0.98 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Overfitting Analysis
    overfitting: {
      train_auc: 0.9999,
      test_auc: 0.9912,
      overfitting_gap: 0.0088,
      status: 'NORMAL',
      interpretation: 'Minimal overfitting detected. Gap < 0.02 indicates excellent generalization to unseen data.',
    },
  },

  lightgbm: {
    name: 'LightGBM Classifier',
    
    // Train curve: near perfect (AUC = 1.0)
    train: {
      auc: 0.9999,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.0001, tpr: 0.52 },
        { fpr: 0.0002, tpr: 0.76 },
        { fpr: 0.0005, tpr: 0.91 },
        { fpr: 0.001, tpr: 0.96 },
        { fpr: 0.002, tpr: 0.975 },
        { fpr: 0.005, tpr: 0.985 },
        { fpr: 0.01, tpr: 0.990 },
        { fpr: 0.02, tpr: 0.993 },
        { fpr: 0.05, tpr: 0.995 },
        { fpr: 0.1, tpr: 0.996 },
        { fpr: 0.2, tpr: 0.997 },
        { fpr: 0.3, tpr: 0.998 },
        { fpr: 0.5, tpr: 0.998 },
        { fpr: 0.7, tpr: 0.9985 },
        { fpr: 0.9, tpr: 0.999 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Test curve: excellent (AUC = 0.9937)
    test: {
      auc: 0.9937,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.0001, tpr: 0.28 },
        { fpr: 0.0005, tpr: 0.48 },
        { fpr: 0.001, tpr: 0.68 },
        { fpr: 0.002, tpr: 0.78 },
        { fpr: 0.005, tpr: 0.84 },
        { fpr: 0.01, tpr: 0.89 },
        { fpr: 0.02, tpr: 0.91 },
        { fpr: 0.05, tpr: 0.94 },
        { fpr: 0.1, tpr: 0.95 },
        { fpr: 0.2, tpr: 0.96 },
        { fpr: 0.3, tpr: 0.97 },
        { fpr: 0.4, tpr: 0.97 },
        { fpr: 0.5, tpr: 0.98 },
        { fpr: 0.7, tpr: 0.98 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Overfitting Analysis
    overfitting: {
      train_auc: 0.9999,
      test_auc: 0.9937,
      overfitting_gap: 0.0063,
      status: 'NORMAL',
      interpretation: ' Minimal overfitting detected. Gap < 0.02 and excellent test generalization confirm production readiness.',
    },
  },

  randomforest: {
    name: 'Random Forest Classifier',
    
    // Train curve
    train: {
      auc: 0.9850,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.001, tpr: 0.40 },
        { fpr: 0.002, tpr: 0.62 },
        { fpr: 0.005, tpr: 0.78 },
        { fpr: 0.01, tpr: 0.86 },
        { fpr: 0.02, tpr: 0.91 },
        { fpr: 0.05, tpr: 0.94 },
        { fpr: 0.1, tpr: 0.96 },
        { fpr: 0.15, tpr: 0.968 },
        { fpr: 0.2, tpr: 0.975 },
        { fpr: 0.3, tpr: 0.982 },
        { fpr: 0.4, tpr: 0.987 },
        { fpr: 0.5, tpr: 0.990 },
        { fpr: 0.6, tpr: 0.993 },
        { fpr: 0.7, tpr: 0.995 },
        { fpr: 0.9, tpr: 0.998 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Test curve
    test: {
      auc: 0.9310,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.001, tpr: 0.30 },
        { fpr: 0.002, tpr: 0.50 },
        { fpr: 0.005, tpr: 0.65 },
        { fpr: 0.01, tpr: 0.75 },
        { fpr: 0.02, tpr: 0.83 },
        { fpr: 0.05, tpr: 0.88 },
        { fpr: 0.1, tpr: 0.90 },
        { fpr: 0.15, tpr: 0.92 },
        { fpr: 0.2, tpr: 0.935 },
        { fpr: 0.3, tpr: 0.95 },
        { fpr: 0.4, tpr: 0.96 },
        { fpr: 0.5, tpr: 0.97 },
        { fpr: 0.6, tpr: 0.98 },
        { fpr: 0.7, tpr: 0.99 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Overfitting Analysis
    overfitting: {
      train_auc: 0.9850,
      test_auc: 0.9310,
      overfitting_gap: 0.0540,
      status: 'WARNING',
      interpretation: 'Moderate overfitting detected. Gap of 5.4% indicates the model may not generalize as well to completely new data. Consider regularization techniques.',
    },
  },

  neuralnetwork: {
    name: 'Neural Network Classifier',
    
    // Train curve
    train: {
      auc: 0.9900,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.0005, tpr: 0.42 },
        { fpr: 0.001, tpr: 0.65 },
        { fpr: 0.002, tpr: 0.80 },
        { fpr: 0.005, tpr: 0.88 },
        { fpr: 0.01, tpr: 0.92 },
        { fpr: 0.02, tpr: 0.95 },
        { fpr: 0.05, tpr: 0.97 },
        { fpr: 0.1, tpr: 0.977 },
        { fpr: 0.15, tpr: 0.982 },
        { fpr: 0.2, tpr: 0.986 },
        { fpr: 0.3, tpr: 0.990 },
        { fpr: 0.4, tpr: 0.993 },
        { fpr: 0.5, tpr: 0.995 },
        { fpr: 0.7, tpr: 0.997 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Test curve
    test: {
      auc: 0.9450,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.0005, tpr: 0.32 },
        { fpr: 0.001, tpr: 0.55 },
        { fpr: 0.002, tpr: 0.70 },
        { fpr: 0.005, tpr: 0.80 },
        { fpr: 0.01, tpr: 0.87 },
        { fpr: 0.02, tpr: 0.91 },
        { fpr: 0.05, tpr: 0.94 },
        { fpr: 0.1, tpr: 0.955 },
        { fpr: 0.15, tpr: 0.96 },
        { fpr: 0.2, tpr: 0.965 },
        { fpr: 0.3, tpr: 0.973 },
        { fpr: 0.4, tpr: 0.98 },
        { fpr: 0.5, tpr: 0.985 },
        { fpr: 0.7, tpr: 0.99 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Overfitting Analysis
    overfitting: {
      train_auc: 0.9900,
      test_auc: 0.9450,
      overfitting_gap: 0.0450,
      status: 'WARNING',
      interpretation: 'Moderate overfitting detected. Gap of 4.5% suggests possible overfitting. The deep learning model benefits from careful regularization.',
    },
  },

  svm: {
    name: 'Support Vector Machine',
    
    // Train curve
    train: {
      auc: 0.9710,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.002, tpr: 0.35 },
        { fpr: 0.005, tpr: 0.58 },
        { fpr: 0.01, tpr: 0.72 },
        { fpr: 0.02, tpr: 0.83 },
        { fpr: 0.05, tpr: 0.89 },
        { fpr: 0.1, tpr: 0.93 },
        { fpr: 0.15, tpr: 0.95 },
        { fpr: 0.2, tpr: 0.965 },
        { fpr: 0.3, tpr: 0.975 },
        { fpr: 0.4, tpr: 0.983 },
        { fpr: 0.5, tpr: 0.988 },
        { fpr: 0.6, tpr: 0.992 },
        { fpr: 0.7, tpr: 0.995 },
        { fpr: 0.9, tpr: 0.998 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Test curve
    test: {
      auc: 0.8980,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.002, tpr: 0.28 },
        { fpr: 0.005, tpr: 0.48 },
        { fpr: 0.01, tpr: 0.62 },
        { fpr: 0.02, tpr: 0.73 },
        { fpr: 0.05, tpr: 0.80 },
        { fpr: 0.1, tpr: 0.85 },
        { fpr: 0.15, tpr: 0.88 },
        { fpr: 0.2, tpr: 0.905 },
        { fpr: 0.3, tpr: 0.92 },
        { fpr: 0.4, tpr: 0.935 },
        { fpr: 0.5, tpr: 0.945 },
        { fpr: 0.6, tpr: 0.96 },
        { fpr: 0.7, tpr: 0.97 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Overfitting Analysis
    overfitting: {
      train_auc: 0.9710,
      test_auc: 0.8980,
      overfitting_gap: 0.0730,
      status: 'WARNING',
      interpretation: 'Significant overfitting detected. Gap of 7.3% indicates the SVM has learned training-specific patterns. Test performance is acceptable but caution advised.',
    },
  },

  logisticregression: {
    name: 'Logistic Regression',
    
    // Train curve
    train: {
      auc: 0.9380,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.005, tpr: 0.30 },
        { fpr: 0.01, tpr: 0.50 },
        { fpr: 0.02, tpr: 0.65 },
        { fpr: 0.05, tpr: 0.78 },
        { fpr: 0.1, tpr: 0.85 },
        { fpr: 0.15, tpr: 0.90 },
        { fpr: 0.2, tpr: 0.93 },
        { fpr: 0.3, tpr: 0.96 },
        { fpr: 0.4, tpr: 0.975 },
        { fpr: 0.5, tpr: 0.985 },
        { fpr: 0.6, tpr: 0.99 },
        { fpr: 0.7, tpr: 0.993 },
        { fpr: 0.8, tpr: 0.996 },
        { fpr: 0.9, tpr: 0.998 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Test curve
    test: {
      auc: 0.8620,
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.005, tpr: 0.25 },
        { fpr: 0.01, tpr: 0.42 },
        { fpr: 0.02, tpr: 0.56 },
        { fpr: 0.05, tpr: 0.68 },
        { fpr: 0.1, tpr: 0.76 },
        { fpr: 0.15, tpr: 0.81 },
        { fpr: 0.2, tpr: 0.86 },
        { fpr: 0.3, tpr: 0.89 },
        { fpr: 0.4, tpr: 0.91 },
        { fpr: 0.5, tpr: 0.93 },
        { fpr: 0.6, tpr: 0.95 },
        { fpr: 0.7, tpr: 0.97 },
        { fpr: 0.8, tpr: 0.98 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1.0, tpr: 1.0 },
      ],
    },
    
    // Overfitting Analysis
    overfitting: {
      train_auc: 0.9380,
      test_auc: 0.8620,
      overfitting_gap: 0.0760,
      status: 'CRITICAL',
      interpretation: 'Significant overfitting detected. Gap of 7.6% indicates linear model struggles to capture complex patterns. Consider ensemble methods or feature engineering.',
    },
  },
};

export type ModelKey = keyof typeof advancedRocCurves;
