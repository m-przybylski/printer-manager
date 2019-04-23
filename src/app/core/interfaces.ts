export interface Printer {
  id?: number;
  name: string;
  ip: string;
  location: Location;
  status?: boolean;
  description?: string;
  isColor: boolean;
}
export interface Location {
  floor: string;
  room: string;
}
