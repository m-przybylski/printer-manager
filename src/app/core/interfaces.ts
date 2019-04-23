export interface Printer {
  id?: number;
  name: string;
  ip: string;
  location: Location;
}
export interface Location {
  floor: string;
  room: string;
}
