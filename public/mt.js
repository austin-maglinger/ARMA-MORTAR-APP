async function setMTPosition() {
  const mtEasting = parseFloat(document.getElementById('mtEasting').value);
  const mtNorthing = parseFloat(document.getElementById('mtNorthing').value);
  const mtAltitude = parseFloat(document.getElementById('mtAltitude').value);

  const response = await fetch('/api/mt-position', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mtEasting, mtNorthing, mtAltitude })
  });
  await response.json();
  document.getElementById('mtPositionForm').style.display = 'none';
  document.getElementById('mtPosition').style.display = 'block';
}

async function loadFireMissions() {
  const response = await fetch('/api/fire-missions');
  const fms = await response.json();
  const table = document.getElementById('fmTable');
  table.innerHTML = '<tr><th>ID</th><th>Type</th><th>Time</th><th>Easting</th><th>Northing</th><th>Action</th></tr>';
  fms.forEach(fm => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${fm.id}</td>
      <td>${fm.targetType}</td>
      <td>${new Date(fm.timeSubmitted).toLocaleTimeString()}</td>
      <td>${fm.targetEasting.toFixed(2)}</td>
      <td>${fm.targetNorthing.toFixed(2)}</td>
      <td><button onclick="showFiringData('${fm.id}')">Select</button></td>
    `;
  });
}

async function showFiringData(fireMissionId) {
  const config = document.getElementById('ringConfig').value;
  if (!config) {
    alert('Please select a mortar configuration');
    return;
  }

  const response = await fetch('/api/firing-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fireMissionId, configuration: config })
  });
  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    document.getElementById('firingData').innerHTML = `
      <h3>Firing Data for ${fireMissionId} (Using ${config})</h3>
      <p>Range: ${data.range.toFixed(2)} m</p>
      <p>Azimuth: ${data.azimuth.toFixed(2)}°</p>
      <p>Elevation: ${data.elevation.toFixed(2)} mils</p>
    `;
  }
}

setInterval(loadFireMissions, 2000); // Refresh every 2 seconds
loadFireMissions();