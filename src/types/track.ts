export interface Track {
  _id: string;
  name: string;
  location_coords: {
    lat: number;
    lon: number;
  };
  length_km: number;
  location_url: string;
  type: string;
  weather_daily: {
    minTemp_c: number;
    maxTemp_c: number;
    avgTemp_c: number;
    minTemp_f: number;
    maxTemp_f: number;
    avgTemp_f: number;
    maxWind_mps: number;
    chanceOfRain: number;
  };
  thumbnail: string;
  images: string[];
}

// type Props = {
//   tracks: Track[];
// }