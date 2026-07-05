export interface OBDData {
  rpm: number | null;
  speed: number | null;
  coolant_temp: number | null;
  intake_temp: number | null;
  throttle: number | null;
  fuel_level: number | null;
  engine_load: number | null;
  rail_pressure: number | null;
  timestamp: number;
}

export interface DTCCode {
  code: string;
  description: string;
}
