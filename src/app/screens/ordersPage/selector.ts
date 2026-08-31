import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  selectOrdersPage,
  (Orders) => Orders.pausedOrders,
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (Orders) => Orders.processOrders,
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (Orders) => Orders.finishedOrders,
);
