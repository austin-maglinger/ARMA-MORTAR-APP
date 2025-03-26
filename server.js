const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

// In-memory storage
let fireMissions = [];
let mtPosition = null;
let idCounter = 0;

// Range tables (unchanged, included for completeness)
const rangeTables = {
  "4 rings": [
    { range: 400, elev: 1531, dElevPer100m: 9 },
    { range: 500, elev: 1514, dElevPer100m: 9 },
    { range: 600, elev: 1496, dElevPer100m: 9 },
    { range: 700, elev: 1478, dElevPer100m: 9 },
    { range: 800, elev: 1460, dElevPer100m: 9 },
    { range: 900, elev: 1442, dElevPer100m: 9 },
    { range: 1000, elev: 1424, dElevPer100m: 10 },
    { range: 1100, elev: 1405, dElevPer100m: 10 },
    { range: 1200, elev: 1385, dElevPer100m: 9 },
    { range: 1300, elev: 1366, dElevPer100m: 10 },
    { range: 1400, elev: 1346, dElevPer100m: 10 },
    { range: 1500, elev: 1326, dElevPer100m: 11 },
    { range: 1600, elev: 1305, dElevPer100m: 11 },
    { range: 1700, elev: 1283, dElevPer100m: 11 },
    { range: 1800, elev: 1261, dElevPer100m: 11 },
    { range: 1900, elev: 1238, dElevPer100m: 12 },
    { range: 2000, elev: 1214, dElevPer100m: 12 },
    { range: 2100, elev: 1188, dElevPer100m: 13 },
    { range: 2200, elev: 1162, dElevPer100m: 14 },
    { range: 2300, elev: 1134, dElevPer100m: 15 },
    { range: 2400, elev: 1104, dElevPer100m: 17 },
    { range: 2500, elev: 1070, dElevPer100m: 17 },
    { range: 2600, elev: 1034, dElevPer100m: 20 },
    { range: 2700, elev: 993, dElevPer100m: 25 },
    { range: 2800, elev: 942, dElevPer100m: 31 },
    { range: 2900, elev: 870, dElevPer100m: 64 }
  ],
  "3 rings": [
    { range: 300, elev: 1534, dElevPer100m: 12 },
    { range: 400, elev: 1511, dElevPer100m: 11 },
    { range: 500, elev: 1489, dElevPer100m: 12 },
    { range: 600, elev: 1466, dElevPer100m: 12 },
    { range: 700, elev: 1442, dElevPer100m: 12 },
    { range: 800, elev: 1419, dElevPer100m: 12 },
    { range: 900, elev: 1395, dElevPer100m: 13 },
    { range: 1000, elev: 1370, dElevPer100m: 13 },
    { range: 1100, elev: 1344, dElevPer100m: 13 },
    { range: 1200, elev: 1318, dElevPer100m: 13 },
    { range: 1300, elev: 1291, dElevPer100m: 14 },
    { range: 1400, elev: 1263, dElevPer100m: 15 },
    { range: 1500, elev: 1233, dElevPer100m: 15 },
    { range: 1600, elev: 1202, dElevPer100m: 16 },
    { range: 1700, elev: 1169, dElevPer100m: 17 },
    { range: 1800, elev: 1133, dElevPer100m: 19 },
    { range: 1900, elev: 1094, dElevPer100m: 21 },
    { range: 2000, elev: 1051, dElevPer100m: 26 },
    { range: 2100, elev: 999, dElevPer100m: 31 },
    { range: 2200, elev: 931, dElevPer100m: 46 },
    { range: 2300, elev: 801, dElevPer100m: null }
  ],
  "2 rings": [
    { range: 200, elev: 1538, dElevPer100m: 15 },
    { range: 300, elev: 1507, dEvaltPer100m: 16 },
    { range: 400, elev: 1475, dElevPer100m: 16 },
    { range: 500, elev: 1443, dElevPer100m: 16 },
    { range: 600, elev: 1410, dElevPer100m: 16 },
    { range: 700, elev: 1376, dElevPer100m: 17 },
    { range: 800, elev: 1341, dElevPer100m: 18 },
    { range: 900, elev: 1305, dElevPer100m: 20 },
    { range: 1000, elev: 1266, dElevPer100m: 20 },
    { range: 1100, elev: 1225, dElevPer100m: 22 },
    { range: 1200, elev: 1180, dElevPer100m: 23 },
    { range: 1300, elev: 1132, dElevPer100m: 27 },
    { range: 1400, elev: 1076, dElevPer100m: 31 },
    { range: 1500, elev: 1009, dElevPer100m: 43 },
    { range: 1600, elev: 912, dElevPer100m: 109 }
  ],
  "1 ring": [
    { range: 100, elev: 1547, dElevPer100m: 28 },
    { range: 200, elev: 1492, dElevPer100m: 27 },
    { range: 300, elev: 1437, dElevPer100m: 29 },
    { range: 400, elev: 1378, dElevPer100m: 31 },
    { range: 500, elev: 1317, dElevPer100m: 33 },
    { range: 600, elev: 1249, dElevPer100m: 35 },
    { range: 700, elev: 1174, dElevPer100m: 42 },
    { range: 800, elev: 1085, dElevPer100m: 57 },
    { range: 900, elev: 954, dElevPer100m: 148 }
  ],
  "0 rings": [
    { range: 50, elev: 1540, dElevPer100m: 61 },
    { range: 100, elev: 1479, dElevPer100m: 63 },
    { range: 150, elev: 1416, dElevPer100m: 66 },
    { range: 200, elev: 1350, dElevPer100m: 71 },
    { range: 250, elev: 1279, dElevPer100m: 78 },
    { range: 300, elev: 1201, dElevPer100m: 95 },
    { range: 350, elev: 1106, dElevPer100m: 151 },
    { range: 400, elev: 955, dElevPer100m: null }
  ]
};

// Generate Fire Mission ID
function generateNextID() {
  idCounter++;
  return `KB${String(idCounter).padStart(4, '0')}`;
}

// Calculate target position
function calculateTargetPosition(foEasting, foNorthing, azimuthDeg, rangeM) {
  const azimuthRad = azimuthDeg * (Math.PI / 180);
  const deltaE = rangeM * Math.sin(azimuthRad);
  const deltaN = rangeM * Math.cos(azimuthRad);
  return {
    easting: foEasting + deltaE,
    northing: foNorthing + deltaN
  };
}

// Interpolate value from range table
function interpolateValue(table, range, key) {
  if (range <= table[0].range) return table[0][key];
  if (range >= table[table.length - 1].range) return table[table.length - 1][key];

  for (let i = 0; i < table.length - 1; i++) {
    if (range >= table[i].range && range <= table[i + 1].range) {
      const r1 = table[i].range, v1 = table[i][key];
      const r2 = table[i + 1].range, v2 = table[i + 1][key];
      if (v1 === null || v2 === null) return null;
      return v1 + (v2 - v1) * (range - r1) / (r2 - r1);
    }
  }
}

// FO submits a target
app.post('/api/submit-target', (req, res) => {
  const { foEasting, foNorthing, azimuthDeg, rangeM, targetType, targetAltitude } = req.body;
  const targetPos = calculateTargetPosition(foEasting, foNorthing, azimuthDeg, rangeM);
  const fireMission = {
    id: generateNextID(),
    targetType,
    timeSubmitted: new Date().toISOString(),
    targetEasting: targetPos.easting,
    targetNorthing: targetPos.northing,
    targetAltitude: targetAltitude || 0
  };
  fireMissions.push(fireMission);
  res.json(fireMission);
});

// MT gets all fire missions
app.get('/api/fire-missions', (req, res) => {
  res.json(fireMissions);
});

// MT sets position
app.post('/api/mt-position', (req, res) => {
  const { mtEasting, mtNorthing, mtAltitude } = req.body;
  mtPosition = { easting: mtEasting, northing: mtNorthing, altitude: mtAltitude };
  res.json({ message: 'MT position set' });
});

// MT gets firing data
app.post('/api/firing-data', (req, res) => {
  const { fireMissionId, configuration } = req.body;
  if (!mtPosition) return res.status(400).json({ error: 'MT position not set' });

  const fm = fireMissions.find(f => f.id === fireMissionId);
  if (!fm) return res.status(404).json({ error: 'Fire mission not found' });

  const deltaE = fm.targetEasting - mtPosition.easting;
  const deltaN = fm.targetNorthing - mtPosition.northing;
  const range = Math.sqrt(deltaE * deltaE + deltaN * deltaN);
  let azimuth = Math.atan2(deltaE, deltaN) * (180 / Math.PI);
  if (azimuth < 0) azimuth += 360;

  const table = rangeTables[configuration];
  if (!table) return res.status(400).json({ error: 'Invalid configuration' });

  const elevation = interpolateValue(table, range, 'elev');
  const dElevPer100m = interpolateValue(table, range, 'dElevPer100m');

  // Only adjust elevation if targetAltitude is provided and non-zero
  let adjustedElevation = elevation;
  if (fm.targetAltitude !== 0 && dElevPer100m) {
    const altitudeDiff = fm.targetAltitude - mtPosition.altitude;
    const adjustment = (altitudeDiff / 100) * dElevPer100m;
    adjustedElevation = elevation + adjustment;
  }

  res.json({ range, azimuth, elevation: adjustedElevation });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
