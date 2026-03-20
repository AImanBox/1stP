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
export const models: Model[] = [
  {
    id: 'model-1',
    name: 'XGBoost Classifier',
    type: 'Gradient Boosting',
    accuracy: 0.9985,
    precision: 0.9851,
    recall: 0.9706,
    f1Score: 0.9778,
    roc_auc: 0.9910,
    description: 'XGBoost with optimized hyperparameters (200 trees, max_depth=8)',
    explanation:
      'XGBoost (Extreme Gradient Boosting) builds an ensemble of decision trees sequentially, where each new tree corrects errors made by previous ones. Optimized with scale_pos_weight=28.52 to handle class imbalance. Trained on 8,000 samples with 25 engineered features. Achieves 99.85% accuracy with excellent precision (98.51%) for minimizing false alarms. Recommended when high precision is critical to reduce unnecessary maintenance costs.',
  },
  {
    id: 'model-2',
    name: 'LightGBM Classifier',
    type: 'Gradient Boosting',
    accuracy: 0.9980,
    precision: 0.9706,
    recall: 0.9706,
    f1Score: 0.9706,
    roc_auc: 0.9933,
    description: 'LightGBM with optimized hyperparameters (200 trees, max_depth=8)',
    explanation:
      'LightGBM (Light Gradient Boosting Machine) is a fast, distributed gradient boosting framework. Achieves best-in-class ROC-AUC (0.9933) with balanced precision and recall. Optimized with scale_pos_weight=28.52 for imbalanced data. Uses 25 engineered features from 10,000 training samples. Faster inference than XGBoost with slightly better overall discrimination ability. RECOMMENDED for production deployment due to superior ROC-AUC and inference speed.',
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
