import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getAvailableActions } from "../../util/availableEventActions";
import { IEventState } from "../types/events";

const customerEventSlice: Partial<IEventState> = {
  customerEvents: [],
  providerEvents: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState: customerEventSlice,
  reducers: {
    setCustomerEvents: (
      state: Partial<IEventState>,
      action: PayloadAction<IEventState["customerEvents"]>
    ) => {
      if (action.payload) {
        let tempArray: typeof state.customerEvents = [];
        let stateTempArray: typeof state.customerEvents = [];
        action.payload?.forEach((val) => {
          let actions = getAvailableActions(
            val.customer_status,
            val.service_provider_status
          ).nextActionsCustomer;
          //@ts-ignore
          if (!state.customerEvents?.includes({ id: val.id })) {
            tempArray!.push({ ...val, nextActions: actions });
          } else {
            stateTempArray?.push({ ...val, nextActions: actions });
          }
        });
        stateTempArray = [...stateTempArray, ...tempArray];
        state.customerEvents = stateTempArray;
      }
    },
    setProviderEvents: (
      state: Partial<IEventState>,
      action: PayloadAction<IEventState["providerEvents"]>
    ) => {
      if (action.payload) {
        let tempArray: typeof state.providerEvents = [];
        let stateTempArray: typeof state.providerEvents = [];
        action.payload?.forEach((val) => {
          let actions = getAvailableActions(
            val.customer_status,
            val.service_provider_status
          ).nextActionsProvider;
          //@ts-ignore
          if (!state.providerEvents?.includes({ id: val.id })) {
            tempArray!.push({ ...val, nextActions: actions });
          } else {
            stateTempArray?.push({ ...val, nextActions: actions });
          }
        });
        stateTempArray = [...stateTempArray, ...tempArray];
        state.providerEvents = stateTempArray;
      }
    },
    clearCustomerEvents: (state: Partial<IEventState>, action) => {
      state.customerEvents = [];
    },
    clearProviderEvents: (state: Partial<IEventState>, action) => {
      state.providerEvents = [];
    },
  },
});
export const {
  setCustomerEvents,
  setProviderEvents,
  clearCustomerEvents,
  clearProviderEvents,
} = eventSlice.actions;
export const event = (state: RootState) => state.events;
export default eventSlice.reducer;
