export default function parseIncidentsData(apiData) {
  const mapData = {
    danger: {
      coordinates: [],
      names: [],
      radius: [],
      incidentIds: [],
    },
    caution: {
      coordinates: [],
      names: [],
      radius: [],
      incidentIds: [],
    },
  };

  const shipments = [];
  const news = [];
  const addedShipments = new Set(); // Track unique shipments
  const addedNews = new Set(); // Track unique news items

  const severityToRadius = {
    High: 10,
    Medium: 7,
    Low: 2,
  };

  const addedAreas = new Set(); // To avoid duplicate coordinates in mapData
  let newsIdCounter = 1; // To assign unique IDs to news items

  // Common image extensions to check
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".bmp",
    ".tiff",
  ];

  for (const incident of apiData.incidents) {
    const incidentId =
      incident.id || `incident-${Math.random().toString(36).substr(2, 9)}`;
    const severity = incident.severity;
    const targetGroup = severity === "High" ? mapData.danger : mapData.caution;

    // Extract affected area names for this incident
    const affectedAreaNames = incident.affected_area.map((area) => area.name);

    // Extract incident types from shipments for this incident
    const shipmentIncidentTypes = new Set();

    // Parse affected areas
    for (const area of incident.affected_area) {
      // Skip if coordinates are missing or empty
      if (
        !area.coordinates ||
        !area.coordinates.latitude ||
        !area.coordinates.longitude ||
        area.coordinates.latitude === 0 ||
        area.coordinates.longitude === 0
      ) {
        continue;
      }

      const key = `${area.coordinates.latitude},${area.coordinates.longitude}`;

      if (!addedAreas.has(key)) {
        targetGroup.coordinates.push([
          area.coordinates.longitude,
          area.coordinates.latitude,
        ]);
        targetGroup.names.push(area.name);
        targetGroup.radius.push(severityToRadius[severity] || 5);
        targetGroup.incidentIds.push(incidentId);
        addedAreas.add(key);
      }
    }

    // Parse shipments
    for (const shipment of incident.affected_shipments) {
      // Skip if coordinates are missing or empty
      if (
        !shipment.current_coordinates ||
        !shipment.current_coordinates.latitude ||
        !shipment.current_coordinates.longitude ||
        shipment.current_coordinates.latitude === 0 ||
        shipment.current_coordinates.longitude === 0
      ) {
        continue;
      }

      // Add the incident type to our set
      if (shipment.incident) {
        shipmentIncidentTypes.add(shipment.incident.trim());
      }

      const shipmentKey = `${shipment.vessel_name}-${shipment.origin_port}-${shipment.destination_port}-${shipment.current_coordinates.latitude}-${shipment.current_coordinates.longitude}`;

      if (!addedShipments.has(shipmentKey)) {
        shipments.push({
          vessel: shipment.vessel_name,
          shipment: shipment.tracking_number,
          originPort: shipment.origin_port,
          destinationPort: shipment.destination_port,
          impact: shipment.impact_score,
          delay: parseInt(shipment.total_delay), // e.g., "30 days" → 30
          incidentType: shipment.incident.trim(),
          coordinates: {
            latitude: shipment.current_coordinates.latitude,
            longitude: shipment.current_coordinates.longitude,
          },
          incidentId: incidentId,
          affectedAreaNames: affectedAreaNames,
          shipmentIncidentTypes: Array.from(shipmentIncidentTypes),
          containerInfo: shipment.container_details,
        });
        addedShipments.add(shipmentKey);
      }
    }

    // Parse news
    for (const newsItem of incident.news || []) {
      // Check if the image URL ends with a common image extension
      let imageUrl = "/news.jpeg"; // Default fallback

      if (newsItem.image) {
        // Check if the URL ends with any of the common image extensions
        const hasValidExtension = imageExtensions.some((ext) =>
          newsItem.image.toLowerCase().endsWith(ext)
        );

        if (hasValidExtension) {
          imageUrl = newsItem.image;
        }
      }

      const newsKey = `${newsItem.title}-${newsItem.summary}-${imageUrl}`;

      if (!addedNews.has(newsKey)) {
        news.push({
          id: newsIdCounter++,
          title: newsItem.title,
          description: newsItem.summary,
          image: imageUrl,
          incidentType: incident.type,
          url: newsItem.url || "#", // fallback URL
          incidentId: incidentId,
          affectedAreaNames: affectedAreaNames,
          shipmentIncidentTypes: Array.from(shipmentIncidentTypes),
        });
        addedNews.add(newsKey);
      }
    }
  }

  return { mapData, shipments, news };
}
