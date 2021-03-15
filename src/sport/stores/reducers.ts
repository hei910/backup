import { ThunkAction } from 'redux-thunk'
import bet from '@services/sportBet/reducers'
import data from '@services/sportData/reducers'
import global from '@services/sportGlobal/reducers'
import globalSetting from '@services/sportGlobalSetting/reducers'
import liveSport from '@services/sportLive/reducers'
import menu from '@services/sportMenu/reducers'
import notification from '@services/sportNotification/reducers'
import player from '@services/sportPlayer/reducers'
import rules from '@services/sportRules/reducers'
import setting from '@services/sportSetting/reducers'

// Interface
export interface StoreState {
    player: ReturnType<typeof player>
    bet: ReturnType<typeof bet>
    data: ReturnType<typeof data>
    global: ReturnType<typeof global>
    liveSport: ReturnType<typeof liveSport>
    menu: ReturnType<typeof menu>
    setting: ReturnType<typeof setting>
    notification: ReturnType<typeof notification>
    globalSetting: ReturnType<typeof globalSetting>
    rules: ReturnType<typeof rules>
}

export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>

// const createRootReducer = () =>
//     combineReducers({
//         player,
//         bet,
//         data,
//         global,
//         liveSport,
//         menu,
//         setting,
//         notification,
//         globalSetting,
//         rules,
//     })

// export type RootReducer = ReturnType<typeof createRootReducer>

// export default createRootReducer
