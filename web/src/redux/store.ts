import { Action, Store, configureStore } from "@reduxjs/toolkit"
import { PersistConfig, persistReducer, persistStore } from "redux-persist"
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1"
import storage from "redux-persist/lib/storage"
import { RootState } from "./RootState"
import { rootReducer } from "./reducers/root.reducer"

const persistConfig: PersistConfig<RootState, any, any, any> = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    blacklist: ["realizandoProcessamento", "notificacaoUsuario"]
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

const store: Store<RootState, Action<any>> = configureStore(
    {
        reducer: persistedReducer,
    }
)

const persistor = persistStore(store)

export { persistor, store }

