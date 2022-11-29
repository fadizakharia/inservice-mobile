export interface ILocation {
  name: string;
  location: {
    type: {
      type: "Point";
      coordinates: Array<number>;
    };
  };
}
export interface ILocationState {
  longitude?: number;
  latitude?: number;
  permission_allowed: boolean;
}
