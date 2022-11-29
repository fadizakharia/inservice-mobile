import {
  customerActions,
  providerActions,
} from "../../util/availableEventActions";
import { USER_PAYLOAD } from "./auth";
import { ILocation } from "./location";
import { IService } from "./services";
export type T = "active" | "pending" | "canceled" | "fulfilled" | "unfulfilled";

export interface IEvents {
  _id: string;
  id: string;
  service: IService | string;
  customer: USER_PAYLOAD | string;
  provider: USER_PAYLOAD | string;
  start_time: Date;
  end_time: Date;
  location: ILocation;
  status: T;
  rated: boolean;
  archived: boolean;
  customer_status: "cancel" | "unfulfilled" | "requested" | "fulfilled";
  service_provider_status:
    | "cancel"
    | "accepted"
    | "fulfilled"
    | "no-action"
    | "reject";
  nextActions: Array<customerActions | providerActions>;
}
export interface updateEventArgs {
  action: string;
  eventId: string;
}
export interface addEventArgs {
  serviceId: string;
  start_time: Date;
  end_time: Date;
  location: {
    longitude: number;
    latitude: number;
  };
}
export interface IEventState {
  customerEvents: Array<IEvents> | null;
  providerEvents: Array<IEvents> | null;
}
