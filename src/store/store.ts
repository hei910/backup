/* eslint-disable import/first */
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './sagas'
import RootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            thunk: true,
            immutableCheck: false,
            serializableCheck: false,
        }).concat(sagaMiddleware)

        return middlewares
    },
    devTools: process.env.NODE_ENV === 'development',
})

sagaMiddleware.run(rootSaga)

export default store
