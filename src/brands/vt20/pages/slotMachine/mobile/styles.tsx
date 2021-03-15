import styled from 'styled-components/macro'
import img_bg from '@brand/assets/images/slotMachine/mobile/bg.jpg'

export const SlotMachine = styled.div`
    background: black;
    overflow: hidden;
`

export const Header = styled.header`
    padding: 36.79% 0 0;
    background: center center / cover no-repeat url(${img_bg});
`

export const Nav = styled.nav`
    padding: 8px;
    border-top: solid 1px #707070;
    border-bottom: solid 1px #707070;
    background: #3e3e3e;
`

const glutter = 4;

export const Section = styled.section`
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &:after {
        content: '';
        flex: 1 1 auto;
    }

    & > div {
        flex: 0 0 calc(33.33% - ${glutter}px * 2);
        margin: ${glutter}px;
    }
`
