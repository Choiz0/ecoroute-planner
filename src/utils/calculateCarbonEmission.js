/**
 * calculate carbon emission for a given distance and mode of transport.
 *
 * @param {number} distance - km
 * @param {string} mode - ("car", "bus", "train", "bicycle", "walking").
 * @returns {number} (kg CO2e).
 */
export function calculateCarbonEmission(distance, mode) {
  // Each transport carbon emission  (kg CO2e per km)
  const emissionFactors = {
    car: 0.21,
    bus: 0.104,
    train: 0.045,
    bicycle: 0,
    walking: 0,
    tram: 0.04,
  };
  // 선택된 교통수단의 배출 계수를 확인
  const factor = emissionFactors[mode.toLowerCase()] || 0;

  // 배출량 계산
  const emissions = parseFloat(distance) * factor;
  const emissionsFixed = emissions.toFixed(2);
  return emissionsFixed;
}

export function extractRouteDetails(steps) {
  let details = steps?.map((step) => {
    const detail = {
      distance: step.distance.text,
      duration: step.duration.text,
      vehicleType: step.transit?.line
        ? step.transit.line.vehicle.name
        : step.travel_mode,
      departureTime: step.transit ? step.transit.departure_time.text : "",
      arrivalTime: step.transit ? step.transit.arrival_time.text : "",
      busNumber:
        step.transit && step.transit.line ? step.transit.line.short_name : "",
      instructions: step.instructions,
      departureStop: step.transit?.departure_stop
        ? step.transit.departure_stop.name
        : "",
      arrivalStop: step.transit?.arrival_stop
        ? step.transit.arrival_stop.name
        : "",
      numStop: step.transit?.num_stops ? step.transit.num_stops : 0,
    };

    return detail;
  });
  console.log("inner function", details);
  return details;
}

export function calculateTraistEmission(detail, vehicleType) {
  return detail
    ?.filter((item) => item.vehicleType === vehicleType)
    .reduce(
      (acc, item) => acc + parseFloat(item.distance.replace(" km", "")),
      0
    );
}

export function calculateTotalEmissions(
  walkingDistance,
  bikingDistance,
  drivingDistance,
  tramEmi,
  trainEmi,
  busEmi
) {
  const walkingTotal = calculateCarbonEmission(walkingDistance, "walking");
  const bikingTotal = calculateCarbonEmission(bikingDistance, "bicycle");
  const drivingTotal = calculateCarbonEmission(drivingDistance, "car");
  const tramTotal = parseFloat(calculateCarbonEmission(tramEmi, "tram"));
  const trainTotal = parseFloat(calculateCarbonEmission(trainEmi, "train"));
  const busTotal = parseFloat(calculateCarbonEmission(busEmi, "bus"));
  return {
    walkingTotal,
    bikingTotal,
    drivingTotal,
    tramTotal,
    trainTotal,
    busTotal,
  };
}
