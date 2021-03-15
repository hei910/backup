import fallback from 'local-storage-fallback'
import { TypedUseSelectorHook, useDispatch as reactUseDispatch, useSelector as reactUseSelector } from 'react-redux'
import { Action } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../store'

// if localStorage is not available, replace it to cookies instead
if (!('localStorage' in window)) {
    ;(window as any).localStorage = fallback
}

// const disabledString = '<<DISABLED_IN_REDUX_DEVTOOLS>>'

// const omittedDevToolsActionType = [
//     'DATA/SAVE_RAW',
//     'DATA/SEARCH_MATCHES',
//     'DATA/SAVE_BETLIST',
//     'BET/UPDATE_DATA_FROM_MERGED_DATA',
// ]

// const blacklistedDevToolsActionType = ['UI/TOGGLE_SHOW_BACK_TO_TOP']

// const actionSanitizer = (action: any) =>
//     omittedDevToolsActionType.includes(action.type) && action.payload ? { ...action, payload: disabledString } : action

// const stateSanitizer = (state: any) =>
//     state.data
//         ? {
//               ...state,
//               data: {
//                   ...state.data,
//                   betList: disabledString,
//                   raw: disabledString,
//                   merged: disabledString,
//               },
//           }
//         : state

// const composeEnhancers = composeWithDevTools({
//     actionSanitizer,
//     stateSanitizer,
//     actionsBlacklist: blacklistedDevToolsActionType,
//     trace: true,
// })

// const store = createStore(createRootReducer(), composeEnhancers(applyMiddleware(thunk)))

export const useSelector: TypedUseSelectorHook<RootState> = reactUseSelector

export type ReduxDispatch = ThunkDispatch<RootState, any, Action<any>>

export type ThunkResult<R> = ThunkAction<R, RootState, null, any>

export const useDispatch = (): ReduxDispatch => {
    return reactUseDispatch<ReduxDispatch>()
}

// export { useDispatch } from 'react-redux';

// export default store
