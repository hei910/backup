import styled from 'styled-components/macro'
import img_bg from '@brand/assets/images/slotMachine/mobile/bg.jpg'

export const SlotMachine = styled.div`
    /* min-height: 100vh; */
    background: #f7f7f7;
    overflow: hidden;
`

export const Header = styled.header`
    padding: 48.23% 0 0;
    background: center center / cover no-repeat url(${img_bg});
`

export const Nav = styled.nav`
    background: white;
`

export const Nav2 = styled.nav`
    padding: 10px;
    background: white;

    form {
        margin: 6px 0 0;
    }
`

export const Main = styled.main`
    width: auto;
    margin: 0 10px;
`

const glutter = 2

export const Section = styled.section`
    margin: 10px -${glutter}px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &:after {
        content: '';
        flex: 1 1 auto;
    }

    & > div {
        width: 32%;
        margin: ${glutter}px;

        @media (min-width: 560px) {
            width: 25%;
        }
    }
`
