import styled from 'styled-components/macro'

const StyledBodyForModal = styled.div`
    padding: 16px;
`

const Body: React.FC<{}> = ({ children, ...otherProps }) => {
    return <StyledBodyForModal {...otherProps}>{children}</StyledBodyForModal>
}

export default Body
