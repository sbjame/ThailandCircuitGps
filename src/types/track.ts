export interface Track {
  _id: string;
  Circ_name: string;
  Circ_location_coords: {
    lat: number;
    lon: number;
  };
  Circ_length_km: number;
  Circ_location_url: string;
  Circ_type: string;
  Circ_weather_daily: {
    minTemp_c: number;
    maxTemp_c: number;
    avgTemp_c: number;
    minTemp_f: number;
    maxTemp_f: number;
    avgTemp_f: number;
    maxWind_mps: number;
    chanceOfRain: number;
  };
}

type Props = {
  tracks: Track[];
}