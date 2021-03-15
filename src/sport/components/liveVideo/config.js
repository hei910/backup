import { SportTypeEnum, VendorEnum } from '@services/sportLive/types'

export const liveVideoSettings = {
    [SportTypeEnum.Football]: {
        [VendorEnum.BG]: true,
        [VendorEnum.SR]: true,
    },
    [SportTypeEnum.Basketball]: {
        [VendorEnum.BG]: true,
        [VendorEnum.SR]: true,
    },
    [SportTypeEnum.Tennis]: {
        [VendorEnum.BG]: true,
        [VendorEnum.SR]: true,
    },
    [SportTypeEnum.Baseball]: {
        [VendorEnum.BG]: true,
        [VendorEnum.SR]: false,
    },
}
