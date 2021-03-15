import styled from 'styled-components/macro'
import img_bg from '@brand/assets/images/slotMachine/mobile/bg.jpg'
import img_banner from '@brand/assets/images/slotMachine/mobile/banner.png'

export const SlotMachine = styled.div`
    background: top -12vw center / contain no-repeat url(${img_banner}), top center / cover no-repeat url(${img_bg});
    padding-bottom: 4px;
`

export const Header = styled.header`
    padding: 20% 0 0;
`

export const Container = styled.div`
    margin: 10px 5px 0;
    min-height: 530px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;
`

export const Section = styled.section`
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
`

export const EmptyContainer = styled.div`
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.noGameText};
    margin: 20px auto 0;
`
