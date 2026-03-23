import { readFileSync } from 'fs';
import { join } from 'path';

interface DataPoint {
  x: number;
  y: number;
  z: number;
  rpm: number;
  torque: number;
  failure: number;
}

export async function GET() {
  try {
    // Read the CSV file from docs folder (train_tr.csv - 80% split from original GitHub dataset)
    const csvPath = join(process.cwd(), '..', 'docs', 'train_tr.csv');
    const fileContent = readFileSync(csvPath, 'utf-8');
    
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',');
    
    // Find column indices
    const airTempIdx = headers.findIndex(h => h.includes('Air temperature'));
    const processTempIdx = headers.findIndex(h => h.includes('Process temperature'));
    const rpmIdx = headers.findIndex(h => h.includes('Rotational speed'));
    const torqueIdx = headers.findIndex(h => h.includes('Torque'));
    const toolWearIdx = headers.findIndex(h => h.includes('Tool wear'));
    const failureIdx = headers.findIndex(h => h.includes('Machine failure') && !h.includes('TWF'));
    
    const data: DataPoint[] = [];
    
    // Parse CSV data (skip header)
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',');
      
      const airTemp = parseFloat(values[airTempIdx]);
      const processTemp = parseFloat(values[processTempIdx]);
      const rpm = parseFloat(values[rpmIdx]);
      const torque = parseFloat(values[torqueIdx]);
      const toolWear = parseFloat(values[toolWearIdx]);
      const failure = parseInt(values[failureIdx]);
      
      if (isNaN(toolWear) || isNaN(processTemp) || isNaN(airTemp)) continue;
      
      data.push({
        x: toolWear,
        y: processTemp - 273.15, // Convert Kelvin to Celsius
        z: airTemp - 273.15, // Convert Kelvin to Celsius
        rpm,
        torque,
        failure
      });
    }
    
    return Response.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Error reading dataset:', error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load dataset'
      },
      { status: 500 }
    );
  }
}
