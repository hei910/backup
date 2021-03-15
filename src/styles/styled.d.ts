import 'styled-components/macro'
import { Theme } from '@type'
import { Theme as SportTheme } from '@sport/styles/common/types'

interface NewTheme extends Theme {
    sport: SportTheme
}
declare module 'styled-components' {
    // TODO: update Types
    export interface DefaultTheme extends NewTheme {}
}
