import { all } from 'redux-saga/effects'

import AppSaga from '@services/app/sagas'
import UserSaga from '@services/user/sagas'
import SettingSaga from '@services/setting/sagas'
import ModalSaga from '@services/modal/sagas'
import DownloadSaga from '@services/download/sagas'

const sage = [AppSaga(), UserSaga(), SettingSaga(), ModalSaga(), DownloadSaga()]

export function* rootSaga() {
    yield all(sage)
}
