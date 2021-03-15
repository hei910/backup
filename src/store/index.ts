import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch as useReduxDispatch } from 'react-redux'
import store from './store'
import RootReducer from './reducers'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof RootReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export type ThunkResult<R> = ThunkAction<R, RootState, null, Action>

export const useDispatch = () => useReduxDispatch<AppDispatch>()

export default store
