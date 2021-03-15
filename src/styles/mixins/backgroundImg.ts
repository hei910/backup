import { css, FlattenSimpleInterpolation } from 'styled-components/macro'

export default (
    url: string,
    size = '100% 100%',
    repeat = 'no-repeat',
    position = 'center',
): FlattenSimpleInterpolation =>
    css`
        background-image: url('${url}');
        background-size: ${size};
        background-repeat: ${repeat};
        background-position: ${position};
    `
