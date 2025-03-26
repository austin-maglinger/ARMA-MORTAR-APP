# Arma Reforger Mortar Targeting Tool

This is a web-based tool designed for *Arma Reforger* to streamline mortar fire missions between Forward Observers (FO) and Mortar Teams (MT). Built with Node.js and Express, it calculates firing data based on MGRS coordinates and mortar configurations, supporting real-time coordination in-game.

## Features
- **Forward Observer (FO) Interface:**
  - Submit targets using MGRS Easting/Northing, azimuth (degrees), range (meters), target type, and optional altitude.
  - Targets displayed as 10-digit grids (e.g., `12345 12345`).
- **Mortar Team (MT) Interface:**
  - Set and update MT position (Easting, Northing, Altitude).
  - View a queue of fire missions with 10-digit grid coordinates.
  - Select mortar configurations (0-4 rings) from range tables.
  - Calculate firing data: range (meters), azimuth (whole mils), elevation (mils).
  - Elevation adjusts for altitude differences if provided; otherwise, assumes flat ground.
- **Deployment:**
  - Runs on a Node.js server with Express.
  - Configurable for HTTPS with Nginx and Let’s Encrypt on an AlmaLinux VPS.

## Prerequisites
- Node.js 18.x
- npm
- Git
- Domain name (optional, for HTTPS)

Usage
Forward Observer:
Open the FO interface.

Enter your position (Easting/Northing), azimuth, range, target type, and optional altitude.

Submit to send the target to the MT queue.

Mortar Team:
Open the MT interface.

Set your position (update as needed).

Select a mortar configuration (0-4 rings).

View fire missions and select one to get firing data (range, azimuth in mils, elevation).

In-Game:
Use the 10-digit grid for target location.

Apply the azimuth (mils) and elevation (mils) to aim the mortar.

Notes
Data Persistence: Fire missions are stored in memory and reset on server restart. Consider adding a database (e.g., SQLite) for persistence.

Security: Use SSH keys and keep the VPS updated (sudo dnf update).

Customization: Adjust range tables in server.js if needed for different mortar configs.


