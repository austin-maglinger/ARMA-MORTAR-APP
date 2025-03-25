document.getElementById('foForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const foEasting = parseFloat(document.getElementById('foEasting').value);
  const foNorthing = parseFloat(document.getElementById('foNorthing').value);
  const azimuthDeg = parseFloat(document.getElementById('azimuth').value);
  const rangeM = parseFloat(document.getElementById('range').value);
  const targetType = document.getElementById('targetType').value;
  const targetAltitude = parseFloat(document.getElementById('targetAltitude').value) || 0;

  const response = await fetch('/api/submit-target', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ foEasting, foNorthing, azimuthDeg, rangeM, targetType, targetAltitude })
  });
  const data = await response.json();
  document.getElementById('result').textContent = `Submitted: ${data.id}, Target at (${data.targetEasting.toFixed(2)}, ${data.targetNorthing.toFixed(2)})`;
});
