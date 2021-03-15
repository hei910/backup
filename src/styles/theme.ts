import vars from './vars'
import colors from './colors'
import sizes from './sizes'
import typography from './typography'
import common from './common'

import BrandTheme from '@brand/styles/theme'
import merge from 'lodash/merge'
import { Theme } from '@sport/styles/common/types'

export default merge(
    {
        vars,
        colors,
        sizes,
        typography,
        common,
    },
    BrandTheme,
)

export const getMergeTheme = (extraTheme: Theme) => {
    return merge(
        {
            vars,
            colors,
            sizes,
            typography,
            common,
            sport: extraTheme,
        },
        BrandTheme,
    )
}
