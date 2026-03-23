import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the probability report JSON for test dataset
    const reportPath = join(process.cwd(), '..', 'ml', 'models', 'probability_report_test.json');
    const reportData = JSON.parse(readFileSync(reportPath, 'utf-8'));

    // Read the failure probabilities CSV for test dataset to get critical predictions
    const csvPath = join(process.cwd(), '..', 'ml', 'models', 'failure_probabilities_test.csv');
    const csvContent = readFileSync(csvPath, 'utf-8');
    
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    // Find column indices
    const idIdx = headers.findIndex(h => h.includes('id'));
    const toolWearIdx = headers.findIndex(h => h.includes('Tool wear'));
    const procTempIdx = headers.findIndex(h => h.includes('Process temperature'));
    const airTempIdx = headers.findIndex(h => h.includes('Air temperature'));
    const probIdx = headers.findIndex(h => h.includes('XGBoost_probability'));
    const riskIdx = headers.findIndex(h => h.includes('risk_level'));

    // Parse critical predictions (failures only)
    const criticalPredictions = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',');
      const prob = parseFloat(values[probIdx]);
      
      // Only include predicted failures (probability >= 0.5)
      if (prob >= 0.5) {
        criticalPredictions.push({
          UDI: parseInt(values[idIdx]),
          tool_wear: parseFloat(values[toolWearIdx]),
          process_temp_c: parseFloat(values[procTempIdx]) - 273.15, // Convert K to C
          air_temp_c: parseFloat(values[airTempIdx]) - 273.15, // Convert K to C
          probability: prob,
          risk_level: values[riskIdx] || 'Critical'
        });
      }
    }

    return Response.json({
      summary: reportData,
      critical: criticalPredictions.slice(0, 100) // Top 100 critical
    });
  } catch (error) {
    console.error('Error loading predictions:', error);
    return Response.json(
      { error: 'Failed to load prediction data' },
      { status: 500 }
    );
  }
}
