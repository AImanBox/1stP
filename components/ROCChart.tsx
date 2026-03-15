'use client';

interface Point {
  fpr: number;
  tpr: number;
}

interface ROCChartProps {
  modelName: string;
  rocAuc: number;
  points: Point[];
}

export default function ROCChart({ modelName, rocAuc, points }: ROCChartProps) {
  // SVG dimensions
  const width = 400;
  const height = 400;
  const margin = 50;
  const plotWidth = width - 2 * margin;
  const plotHeight = height - 2 * margin;

  // Helper function to convert data coordinates to SVG coordinates
  const xScale = (fpr: number): number => margin + fpr * plotWidth;
  const yScale = (tpr: number): number => height - margin - tpr * plotHeight;

  // Generate path string for the ROC curve
  const pathData = points
    .map((point, idx) => {
      const x = xScale(point.fpr);
      const y = yScale(point.tpr);
      return idx === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  // Generate path for the diagonal reference line (random classifier)
  const diagonalPath = `M ${xScale(0)} ${yScale(0)} L ${xScale(1)} ${yScale(1)}`;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">ROC Curve</h3>
        <p className="text-sm text-gray-600">{modelName}</p>
      </div>

      <div className="flex justify-center">
        <svg width={width} height={height} className="border border-gray-300 rounded">
          {/* Grid lines */}
          <g className="stroke-gray-200" strokeWidth="1" strokeDasharray="4">
            {/* Vertical grid lines */}
            {[0.2, 0.4, 0.6, 0.8].map((val) => (
              <line
                key={`vgrid-${val}`}
                x1={xScale(val)}
                y1={yScale(0)}
                x2={xScale(val)}
                y2={yScale(1)}
              />
            ))}
            {/* Horizontal grid lines */}
            {[0.2, 0.4, 0.6, 0.8].map((val) => (
              <line
                key={`hgrid-${val}`}
                x1={xScale(0)}
                y1={yScale(val)}
                x2={xScale(1)}
                y2={yScale(val)}
              />
            ))}
          </g>

          {/* Axes */}
          <g className="stroke-gray-800" strokeWidth="2">
            {/* X-axis (False Positive Rate) */}
            <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} />
            {/* Y-axis (True Positive Rate) */}
            <line x1={margin} y1={margin} x2={margin} y2={height - margin} />
          </g>

          {/* Axis labels */}
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            className="text-xs"
            fill="#666"
          >
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

          {/* Axis tick labels */}
          <g className="text-xs" fill="#666">
            {/* X-axis ticks */}
            {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
              <text key={`xtick-${val}`} x={xScale(val)} y={height - margin + 15} textAnchor="middle">
                {val.toFixed(1)}
              </text>
            ))}
            {/* Y-axis ticks */}
            {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
              <text key={`ytick-${val}`} x={margin - 10} y={yScale(val) + 4} textAnchor="end">
                {val.toFixed(1)}
              </text>
            ))}
          </g>

          {/* Diagonal reference line (random classifier) */}
          <path
            d={diagonalPath}
            stroke="#999"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6"
            opacity="0.6"
          />

          {/* ROC Curve */}
          <path d={pathData} stroke="#007B7A" strokeWidth="3" fill="none" />

          {/* Gradient fill under the curve */}
          <defs>
            <linearGradient id="rocGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#007B7A', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#007B7A', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path
            d={pathData + ` L ${xScale(1)} ${yScale(0)} Z`}
            fill="url(#rocGradient)"
          />
        </svg>
      </div>

      {/* AUC Score Display */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Area Under the Curve (AUC)</p>
            <p className="text-3xl font-bold text-blue-600">{rocAuc.toFixed(4)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Performance Grade</p>
            <p className="text-xl font-bold text-green-600">Excellent</p>
          </div>
        </div>
      </div>

      {/* Legend and Interpretation */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-600 rounded"></div>
          <span className="text-sm text-gray-700">Model ROC Curve (AUC = {rocAuc.toFixed(4)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-gray-400" style={{ borderTop: '2px dashed #999' }}></div>
          <span className="text-sm text-gray-700">Random Classifier (AUC = 0.5)</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
        <p className="text-sm text-gray-700">
          <strong>What this shows:</strong> The ROC curve plots the True Positive Rate (recall) against 
          the False Positive Rate across all classification thresholds. An AUC of {rocAuc.toFixed(4)} indicates 
          <strong> excellent discrimination ability</strong> — the model correctly identifies machine failures 
          while maintaining a very low false alarm rate.
        </p>
      </div>
    </div>
  );
}
