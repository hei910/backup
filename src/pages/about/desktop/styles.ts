import styled from 'styled-components/macro'
export const SParagraph = styled.div`
    margin-bottom: 25px;
`
export const SUlContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 25px;
`
export const SOlContainer = styled(SUlContainer)`
    margin-left: 20px;
`
export const SUl = styled.div`
    margin-left: 20px;
`
export const SOl = styled.div`
    margin-left: 4px;
`

export const SHeader = styled.div`
    border-left: 7px solid ${(props) => props.theme.colors.component.desktop.section.title.color};
    font-size: 26px;
    height: 35px;
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 12px;
    font-weight: bold;
`
