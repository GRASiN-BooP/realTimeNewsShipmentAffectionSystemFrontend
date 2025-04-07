export default function parseIncidentsData(apiData) {
  const mapData = {
    danger: {
      coordinates: [],
      names: [],
      radius: [],
    },
    caution: {
      coordinates: [],
      names: [],
      radius: [],
    },
  };

  const shipments = [];

  const severityToRadius = {
    High: 15,
    Medium: 10,
    Low: 5,
  };

  const addedAreas = new Set(); // To avoid duplicate coordinates in mapData

  for (const incident of apiData.incidents) {
    const severity = incident.severity;
    const targetGroup = severity === "High" ? mapData.danger : mapData.caution;

    for (const area of incident.affected_area) {
      const key = `${area.coordinates.latitude},${area.coordinates.longitude}`;

      if (!addedAreas.has(key)) {
        targetGroup.coordinates.push([
          area.coordinates.longitude,
          area.coordinates.latitude,
        ]);
        targetGroup.names.push(area.name);
        targetGroup.radius.push(severityToRadius[severity] || 5);
        addedAreas.add(key);
      }
    }

    for (const shipment of incident.affected_shipments) {
      shipments.push({
        vessel: shipment.vessel_name,
        originPort: shipment.origin_port,
        destinationPort: shipment.destination_port,
        impact: shipment.impact_score,
        delay: parseInt(shipment.total_delay), // "30 days" → 30
        incidentType: shipment.incident.trim(),
        coordinates: [
          shipment.current_coordinates.longitude,
          shipment.current_coordinates.latitude,
        ],
      });
    }
  }

  return { mapData, shipments };
}
