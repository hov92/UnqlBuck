import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import cardReducer from "./reducers/cardReducer";
import orderReducer from "./reducers/orderReducer";
import  dashboardReducer  from "./reducers/dashboardReducer";
import  chatReducer  from "./reducers/chatReducer";
const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  card: cardReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer
});
export default rootReducer;
