import { IAuthState, USER_PAYLOAD } from "./auth";
import { T } from "./categories";
import { IEvents } from "./events";
import { ILocation } from "./location";

export interface IService {
  id: string;
  _id: string;
  title: string;
  slug: string;
  description: string;
  price_type: "hr" | "one-time";
  price: number;
  user: IAuthState;
  category: T;
  events: IEvents;
  location: { longitude: number; latitude: number; name: string };
  radius: number;
  rating: number;
  nbOfRatings: number;
  status: "active" | "inactive";
  cover_url: "string";
}
export interface nearbyServices {
  services: Array<Partial<IService>>;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
export interface nearbyServicesArguments {
  lat: number;
  lng: number;
  searchKey?: string;
  category?: string;
  distance?: number;
  page?: number;
  limit?: number;
}
