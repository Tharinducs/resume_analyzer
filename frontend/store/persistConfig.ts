import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "./rootReducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: ["loader"], 
};

export default persistConfig;
