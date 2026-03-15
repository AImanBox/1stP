'use client';

interface Point {
  fpr: number;
  tpr: number;
}

interface OverfittingAnalysis {
  train_auc: number;
  test_auc: number;
  overfitting_gap: number;
  status: 'EXCELLENT' | 'NORMAL' | 'WARNING' | 'CRITICAL';
  interpretation: string;
}

interface AdvancedROCChartProps {
  modelName: string;
  trainCurve: {
    auc: number;
    points: Point[];
  };
  testCurve: {
    auc: number;
    points: Point[];
  };
  overfitting: OverfittingAnalysis;
}

export default function AdvancedROCChart({
  modelName,
  trainCurve,
  testCurve,
  overfitting,
}: AdvancedROCChartProps) {
  // SVG dimensions
  const width = 500;
  const height = 450;
  const margin = 50;
  const plotWidth = width - 2 * margin;
  const plotHeight = height - 2 * margin;

  // Helper functions
  const xScale = (fpr: number): number => margin + fpr * plotWidth;
  const yScale = (tpr: number): number => height - margin - tpr * plotHeight;

  // Generate path strings
  const trainPath = trainCurve.points
    .map((point, idx) => {
      const x = xScale(point.fpr);
      const y = yScale(point.tpr);
      return idx === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  const testPath = testCurve.points
    .map((point, idx) => {
      const x = xScale(point.fpr);
      const y = yScale(point.tpr);
      return idx === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  const diagonalPath = `M ${xScale(0)} ${yScale(0)} L ${xScale(1)} ${yScale(1)}`;

  // Determine overfitting color/badge
  const getOverfittingColor = () => {
    switch (overfitting.status) {
      case 'EXCELLENT':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: '✓ Excellent' };
      case 'NORMAL':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: '✓ Normal' };
      case 'WARNING':
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: '⚠️  Warning' };
      case 'CRITICAL':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: '❌ Critical' };
    }
  };

  const colors = getOverfittingColor();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ROC Curve Analysis - Train vs Test
        </h3>
        <p className="text-sm text-gray-600">
          {modelName} - Generalization & Overfitting Assessment
        </p>
      </div>

      {/* Main Chart */}
      <div className="flex justify-center mb-8">
        <svg width={width} height={height} className="border border-gray-300 rounded bg-white">
          {/* Grid lines */}
          <g className="stroke-gray-200" strokeWidth="1" strokeDasharray="4">
            {[0.2, 0.4, 0.6, 0.8].map((val) => (
              <g key={`grid-${val}`}>
                <line x1={xScale(val)} y1={yScale(0)} x2={xScale(val)} y2={yScale(1)} />
                <line x1={xScale(0)} y1={yScale(val)} x2={xScale(1)} y2={yScale(val)} />
              </g>
            ))}
          </g>

          {/* Axes */}
          <g className="stroke-gray-800" strokeWidth="2">
            <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} />
            <line x1={margin} y1={margin} x2={margin} y2={height - margin} />
          </g>

          {/* Axis Labels */}
          <text x={width / 2} y={height - 10} textAnchor="middle" className="text-xs" fill="#666">
            False Positive Rate
          </text>
          <text
            x={20}
            y={height / 2}
            textAnchor="middle"
            className="text-xs"
            fill="#666"
            transform={`rotate(-90 20 ${height / 2})`}
          >
            True Positive Rate
          </text>

          {/* Tick Labels */}
          <g className="text-xs" fill="#666">
            {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
              <g key={`ticks-${val}`}>
                <text x={xScale(val)} y={height - margin + 15} textAnchor="middle">
                  {val.toFixed(1)}
                </text>
                <text x={margin - 10} y={yScale(val) + 4} textAnchor="end">
                  {val.toFixed(1)}
                </text>
              </g>
            ))}
          </g>

          {/* Random Classifier Reference Line */}
          <path
            d={diagonalPath}
            stroke="#999"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6"
            opacity="0.5"
          />

          {/* Train ROC Curve (Blue) */}
          <defs>
            <linearGradient id="trainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#0066CC', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#0066CC', stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id="testGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FF8C00', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          {/* Train Curve */}
          <path d={trainPath} stroke="#0066CC" strokeWidth="3" fill="none" />
          <path d={trainPath + ` L ${xScale(1)} ${yScale(0)} Z`} fill="url(#trainGradient)" />

          {/* Test Curve */}
          <path d={testPath} stroke="#FF8C00" strokeWidth="3" fill="none" />
          <path d={testPath + ` L ${xScale(1)} ${yScale(0)} Z`} fill="url(#testGradient)" />
        </svg>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-600 font-semibold mb-1">TRAIN AUC</p>
          <p className="text-2xl font-bold text-blue-700">{trainCurve.auc.toFixed(4)}</p>
          <p className="text-xs text-blue-600 mt-2">Training performance</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <p className="text-xs text-orange-600 font-semibold mb-1">TEST AUC</p>
          <p className="text-2xl font-bold text-orange-700">{testCurve.auc.toFixed(4)}</p>
          <p className="text-xs text-orange-600 mt-2">Real-world performance</p>
        </div>
        <div className={`${colors.bg} p-4 rounded-lg border ${colors.border}`}>
          <p className={`text-xs ${colors.text} font-semibold mb-1`}>OVERFITTING GAP</p>
          <p className="text-2xl font-bold text-gray-800">{overfitting.overfitting_gap.toFixed(4)}</p>
          <p className={`text-xs ${colors.text} mt-2`}>{colors.badge}</p>
        </div>
      </div>

      {/* Legends */}
      <div className="flex flex-wrap gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-600" style={{ borderTop: '3px solid #0066CC' }}></div>
          <span className="text-sm text-gray-700">
            <strong>Train ROC</strong> (AUC = {trainCurve.auc.toFixed(4)})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-orange-600" style={{ borderTop: '3px solid #FF8C00' }}></div>
          <span className="text-sm text-gray-700">
            <strong>Test ROC</strong> (AUC = {testCurve.auc.toFixed(4)})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4" style={{ borderTop: '2px dashed #999' }}></div>
          <span className="text-sm text-gray-700">
            <strong>Random Classifier</strong> (AUC = 0.5)
          </span>
        </div>
      </div>

      {/* Overfitting Analysis Panel */}
      <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 mb-6`}>
        <h4 className={`text-lg font-bold ${colors.text} mb-3`}>Overfitting Analysis</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className={`text-xs ${colors.text} font-semibold mb-1`}>GENERALIZATION GAP</p>
            <p className="text-xl font-bold text-gray-800">
              {(overfitting.overfitting_gap * 100).toFixed(2)}%
            </p>
            <p className={`text-xs ${colors.text} mt-1`}>
              Difference between Train and Test AUC
            </p>
          </div>
          <div>
            <p className={`text-xs ${colors.text} font-semibold mb-1`}>ASSESSMENT</p>
            <p className={`text-xl font-bold ${colors.text}`}>{overfitting.status}</p>
            <p className={`text-xs ${colors.text} mt-1`}>
              {overfitting.status === 'NORMAL' && 'Acceptable for production'}
              {overfitting.status === 'EXCELLENT' && 'Excellent generalization'}
              {overfitting.status === 'WARNING' && 'Monitor performance closely'}
              {overfitting.status === 'CRITICAL' && 'Requires model adjustment'}
            </p>
          </div>
        </div>

        <p className={`text-sm ${colors.text} leading-relaxed`}>
          <strong>Interpretation:</strong> {overfitting.interpretation}
        </p>
      </div>

      {/* Key Insights */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>📊 What This Shows:</strong> The ROC curve compares model performance on training data (blue) 
          versus unseen test data (orange). A small gap between curves indicates the model generalizes well to new data. 
          Test AUC of {testCurve.auc.toFixed(4)} demonstrates {testCurve.auc > 0.99 ? 'exceptional' : 'excellent'} 
          real-world performance.
        </p>
      </div>
    </div>
  );
}
