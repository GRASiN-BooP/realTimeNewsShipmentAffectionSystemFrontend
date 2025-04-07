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
  const news = [];

  const severityToRadius = {
    High: 15,
    Medium: 10,
    Low: 5,
  };

  const addedAreas = new Set(); // To avoid duplicate coordinates in mapData
  let newsIdCounter = 1; // To assign unique IDs to news items

  for (const incident of apiData.incidents) {
    const severity = incident.severity;
    const targetGroup = severity === "High" ? mapData.danger : mapData.caution;

    // Parse affected areas
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

    // Parse shipments
    for (const shipment of incident.affected_shipments) {
      shipments.push({
        vessel: shipment.vessel_name,
        originPort: shipment.origin_port,
        destinationPort: shipment.destination_port,
        impact: shipment.impact_score,
        delay: parseInt(shipment.total_delay), // e.g., "30 days" → 30
        incidentType: shipment.incident.trim(),
        coordinates: [
          shipment.current_coordinates.longitude,
          shipment.current_coordinates.latitude,
        ],
      });
    }

    // Parse news
    for (const newsItem of incident.news || []) {
      news.push({
        id: newsIdCounter++,
        title: newsItem.title,
        description: newsItem.summary,
        image: newsItem.image || "/placeholder.jpg", // fallback image
        incidentType: incident.type,
        url: newsItem.url || "#", // fallback URL
      });
    }
  }

  return { mapData, shipments, news };
}
