<!DOCTYPE html>
<html>
<head>
  <title>MT Interface</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    label { margin-right: 10px; }
    #mtPositionForm, #firingData, #mtPosition { margin-top: 20px; }
    button { padding: 5px 10px; }
  </style>
</head>
<body>
  <h1>Mortar Team</h1>

  <div id="mtPosition">
    <h2>Current MT Position</h2>
    <p id="currentPosition">Not set</p>
  </div>

  <div id="mtPositionForm">
    <h2>Set/Update MT Position</h2>
    <label>MT Easting: <input type="number" id="mtEasting" required></label>
    <label>MT Northing: <input type="number" id="mtNorthing" required></label>
    <label>MT Altitude (meters): <input type="number" id="mtAltitude" required></label>
    <button onclick="setMTPosition()">Update Position</button>
  </div>

  <div style="margin-top: 20px;">
    <label for="ringConfig">Mortar Configuration:</label>
    <select id="ringConfig">
      <option value="" disabled selected>Select configuration</option>
      <option value="4 rings">4 rings</option>
      <option value="3 rings">3 rings</option>
      <option value="2 rings">2 rings</option>
      <option value="1 ring">1 ring</option>
      <option value="0 rings">0 rings</option>
    </select>
  </div>

  <h2>Fire Missions</h2>
  <table id="fmTable">
    <tr><th>ID</th><th>Type</th><th>Time</th><th>Grid</th><th>Action</th></tr>
  </table>

  <div id="firingData"></div>
  <script src="mt.js"></script>
</body>
</html>
