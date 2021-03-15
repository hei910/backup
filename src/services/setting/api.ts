import call from '@utils/api'
import { DepositReminderRes } from './types'

export const getDepositMinAmount = () =>
    call<DepositReminderRes>('GET', '/crmSetting/v2/depositReminder').then((res) => res.depositReminder)
