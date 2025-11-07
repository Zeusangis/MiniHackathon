export interface Root {
  ai_summary: string;
  latitude: number;
  longitude: number;
  traffic_data: TrafficData;
}

export interface TrafficData {
  Confidence: number;
  CurrentSpeed: number;
  CurrentTravelTimeSec: number;
  FreeFlowSpeed: number;
  FreeFlowTravelTimeSec: number;
}

export interface TrafficDataSchema {
  root: Root;
}
