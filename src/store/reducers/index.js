import { combineReducers } from "redux";
// import constantsReducer from './constants';
import CommonsReducer from "./commons";

const RootReducer = combineReducers({
  commons: CommonsReducer,
});
export default RootReducer;
