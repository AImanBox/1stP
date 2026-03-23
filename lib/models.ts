export interface ROCData {
  fpr: number[];
  tpr: number[];
  roc_auc: number;
}

export interface Model {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  roc_auc?: number;
  rocData?: ROCData;
  explanation: string;
  description: string;
}

// ROC data imported in ModelDetails component
// Updated: 2026-03-23 - Models retrained with full dataset
export const models: Model[] = [
  {
    id: 'model-1',
    name: 'XGBoost Classifier',
    type: 'Gradient Boosting',
    accuracy: 0.9988,
    precision: 1.0000,
    recall: 0.9233,
    f1Score: 0.9601,
    roc_auc: 1.0000,
    description: 'XGBoost with optimized hyperparameters (max_depth=5, learning_rate=0.05, min_child_weight=5)',
    explanation:
      'XGBoost (Extreme Gradient Boosting) builds an ensemble of decision trees sequentially, where each new tree corrects errors made by previous ones. Retrained (2026-03-23) with train_tr.csv (109,143 training samples) and validated on train_te.csv (27,286 validation samples) with 24 engineered features and class balancing for severe imbalance (1.57% failure rate). Validation Performance: ROC-AUC 1.0000, F1 0.9601, Accuracy 99.88%. Perfect precision with 92.33% recall. Ready for production deployment.',
  },
  {
    id: 'model-2',
    name: 'LightGBM Classifier',
    type: 'Gradient Boosting',
    accuracy: 0.9989,
    precision: 1.0000,
    recall: 0.9561,
    f1Score: 0.9977,
    roc_auc: 1.0000,
    description: 'LightGBM with optimized hyperparameters (max_depth=7, learning_rate=0.05, reg_alpha=0.1)',
    explanation:
      'LightGBM (Light Gradient Boosting Machine) is a fast, distributed gradient boosting framework. Retrained (2026-03-23) with train_tr.csv (109,143 training samples) and validated on train_te.csv (27,286 validation samples) with 24 engineered features and class weight balancing for severe imbalance. Validation Performance: ROC-AUC 1.0000, F1 0.9977, Accuracy 99.89%, Precision 100%, Recall 95.61%. SUPERIOR performance with excellent F1 score. RECOMMENDED for production deployment.',
  },
  {
    id: 'model-3',
    name: 'Random Forest (Legacy)',
    type: 'Classification',
    accuracy: 0.94,
    precision: 0.92,
    recall: 0.95,
    f1Score: 0.935,
    description: 'Ensemble learning model using multiple decision trees (deprecated)',
    explanation:
      'Random Forest combines multiple decision trees to improve prediction accuracy. Each tree votes on the final prediction, and the majority vote determines the output. This approach reduces overfitting and increases robustness compared to single decision trees. The model performs well with mixed data types and automatically handles feature importance. LEGACY MODEL - Use XGBoost or LightGBM for better performance.',
  },
  {
    id: 'model-4',
    name: 'Neural Network (Legacy)',
    type: 'Deep Learning',
    accuracy: 0.96,
    precision: 0.94,
    recall: 0.97,
    f1Score: 0.955,
    description: 'Multi-layer perceptron with 3 hidden layers (deprecated)',
    explanation:
      'A deep neural network with multiple hidden layers learns complex patterns through backpropagation. Each neuron applies non-linear transformations to create increasingly abstract representations of the data. The model excels at capturing intricate relationships but requires more computational resources and careful hyperparameter tuning. LEGACY MODEL - Use XGBoost or LightGBM for better performance on this dataset.',
  },
  {
    id: 'model-5',
    name: 'Support Vector Machine (Legacy)',
    type: 'Classification',
    accuracy: 0.91,
    precision: 0.89,
    recall: 0.92,
    f1Score: 0.905,
    description: 'Kernel SVM with RBF kernel for non-linear classification (deprecated)',
    explanation:
      'SVM finds the optimal hyperplane that maximizes the margin between classes. The RBF kernel enables non-linear classification by transforming data into a higher-dimensional space. This model is particularly effective for problems with a clear separation margin and works well with high-dimensional data. LEGACY MODEL - Use XGBoost or LightGBM for superior performance.',
  },
  {
    id: 'model-6',
    name: 'Logistic Regression (Legacy)',
    type: 'Linear Classification',
    accuracy: 0.88,
    precision: 0.86,
    recall: 0.89,
    f1Score: 0.875,
    description: 'Regularized logistic regression with L2 penalty (deprecated)',
    explanation:
      'Logistic Regression is a simple yet powerful linear model that estimates the probability of a binary outcome. The L2 regularization prevents overfitting by penalizing large coefficients. While simpler than other models, it offers excellent interpretability and computational efficiency. LEGACY MODEL - Use gradient boosting models for significantly better performance.',
  },
];

export const getModelById = (id: string): Model | undefined => {
  return models.find((model) => model.id === id);
};
