export interface Model {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  explanation: string;
  description: string;
}

export const models: Model[] = [
  {
    id: 'model-1',
    name: 'Random Forest Classifier',
    type: 'Classification',
    accuracy: 0.94,
    precision: 0.92,
    recall: 0.95,
    f1Score: 0.935,
    description: 'Ensemble learning model using multiple decision trees',
    explanation:
      'Random Forest combines multiple decision trees to improve prediction accuracy. Each tree votes on the final prediction, and the majority vote determines the output. This approach reduces overfitting and increases robustness compared to single decision trees. The model performs well with mixed data types and automatically handles feature importance.',
  },
  {
    id: 'model-2',
    name: 'Neural Network (Deep Learning)',
    type: 'Deep Learning',
    accuracy: 0.96,
    precision: 0.94,
    recall: 0.97,
    f1Score: 0.955,
    description: 'Multi-layer perceptron with 3 hidden layers',
    explanation:
      'A deep neural network with multiple hidden layers learns complex patterns through backpropagation. Each neuron applies non-linear transformations to create increasingly abstract representations of the data. The model excels at capturing intricate relationships but requires more computational resources and careful hyperparameter tuning.',
  },
  {
    id: 'model-3',
    name: 'Support Vector Machine (SVM)',
    type: 'Classification',
    accuracy: 0.91,
    precision: 0.89,
    recall: 0.92,
    f1Score: 0.905,
    description: 'Kernel SVM with RBF kernel for non-linear classification',
    explanation:
      'SVM finds the optimal hyperplane that maximizes the margin between classes. The RBF kernel enables non-linear classification by transforming data into a higher-dimensional space. This model is particularly effective for problems with a clear separation margin and works well with high-dimensional data.',
  },
  {
    id: 'model-4',
    name: 'Gradient Boosting Machine',
    type: 'Boosting',
    accuracy: 0.95,
    precision: 0.93,
    recall: 0.96,
    f1Score: 0.945,
    description: 'XGBoost model with 100 trees',
    explanation:
      'Gradient Boosting builds an ensemble of trees sequentially, where each new tree corrects errors made by previous ones. XGBoost is an optimized implementation with regularization to prevent overfitting. This model typically achieves high performance on tabular data and handles feature interactions naturally.',
  },
  {
    id: 'model-5',
    name: 'Logistic Regression',
    type: 'Linear Classification',
    accuracy: 0.88,
    precision: 0.86,
    recall: 0.89,
    f1Score: 0.875,
    description: 'Regularized logistic regression with L2 penalty',
    explanation:
      'Logistic Regression is a simple yet powerful linear model that estimates the probability of a binary outcome. The L2 regularization prevents overfitting by penalizing large coefficients. While simpler than other models, it offers excellent interpretability and computational efficiency.',
  },
  {
    id: 'model-6',
    name: 'K-Nearest Neighbors',
    type: 'Instance-based',
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.91,
    f1Score: 0.89,
    description: 'KNN with k=5 and distance-weighted voting',
    explanation:
      'KNN classifies data points based on the majority class of their k nearest neighbors in the feature space. Distance-weighted voting gives more influence to closer neighbors. This lazy learning algorithm makes no assumptions about data distribution but can be computationally expensive for large datasets.',
  },
];

export const getModelById = (id: string): Model | undefined => {
  return models.find((model) => model.id === id);
};
