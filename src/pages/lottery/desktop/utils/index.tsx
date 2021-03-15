import colorTypes from '../constants/colorTypes'
import { IColorCodes } from '@pages/lottery/desktop/types'

export const getLotoColor = (result: number, colorCodes: IColorCodes, color?: string,) => {

    const getMarkSixColor = (result: number) => {
        let currentRow = Math.floor(result / 10);
        if (result % 10 === 0) {
            return colorCodes?.hklucky6[Math.floor((((result + currentRow) / 2) % 3) - 1)];
        } else {
            return colorCodes?.hklucky6[Math.floor(((result + currentRow - 1) / 2) % 3)];
        }
    }

    if (color === colorTypes.allcolor) return colorCodes.allcolor[result - 1]
    if (color === colorTypes.orange) return colorCodes.orange
    if (color === colorTypes.blue) return colorCodes.blue
    if (color === colorTypes.hklucky6) return getMarkSixColor(result);

    return colorCodes.orange;
}
