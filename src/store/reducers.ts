import { combineReducers } from 'redux'

import AppReducer from '@services/app/reducer'
import UserReducer from '@services/user/reducer'
import SettingReducer from '@services/setting/reducer'
import LayoutReducer from '@services/layout/reducer'
import ModalReducer from '@services/modal/reducer'
import DownloadReducer from '@services/download/reducer'
import sportBetReducer from '@services/sportBet/reducers'
import sportDataReducer from '@services/sportData/reducers'
import sportGlobalReducer from '@services/sportGlobal/reducers'
import sportGlobalSettingReducer from '@services/sportGlobalSetting/reducers'
import sportLiveReducer from '@services/sportLive/reducers'
import sportMenuReducer from '@services/sportMenu/reducers'
import sportNotificationReducer from '@services/sportNotification/reducers'
import sportPlayerReducer from '@services/sportPlayer/reducers'
import sportRulesReducer from '@services/sportRules/reducers'
import sportSettingReducer from '@services/sportSetting/reducers'
// import SportReducer from '@sport/stores/reducers'

export default combineReducers({
    app: AppReducer,
    user: UserReducer,
    setting: SettingReducer,
    layout: LayoutReducer,
    modal: ModalReducer,
    download: DownloadReducer,
    sportBet: sportBetReducer,
    sportData: sportDataReducer,
    sportGlobal: sportGlobalReducer,
    sportGlobalSetting: sportGlobalSettingReducer,
    sportLive: sportLiveReducer,
    sportMenu: sportMenuReducer,
    sportNotification: sportNotificationReducer,
    sportPlayer: sportPlayerReducer,
    sportRules: sportRulesReducer,
    sportSetting: sportSettingReducer,
})
