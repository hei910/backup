import styled from 'styled-components/macro'

const Button = styled.button`
    flex-shrink: 0;
    background-color: ${(props) => props.theme.colors.component.common.searchBar.btnBgColor};
    color: ${(props) => props.theme.colors.component.common.searchBar.btnColor};
    padding: 6px 16px;
    font-size: 14px;
    border: none;
    border-radius: 14px;
`

export default Button
