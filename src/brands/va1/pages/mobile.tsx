import merge from 'lodash/merge'
import MobilePages from '@pages/mobile'

export default merge(MobilePages, {
    home: {
        isHeaderLogoCenter: true,
        hideSubheader: true,
    },
})
