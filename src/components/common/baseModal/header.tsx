import styled from 'styled-components/macro'

import { HeaderProps } from './types'

// import crossImage from '@images/modal/close.png'

// import bgImg from '@mixins/backgroundImg'

const Wrapper = styled.div`
    padding: 16px 36px 0 16px;
`

// const LeftSection = styled.div`
//     display: flex;
//     align-items: center;
//     flex: 1;
// `

// const Title = styled.span`
//     ${(props) => props.theme.typography.Subtitle1}
//     padding-left: 8px;
// `

// const Cross = styled.div`
//     width: 15px;
//     height: 15px;
//     cursor: pointer;
//     ${bgImg(crossImage)}
// `

const Headers: React.FC<HeaderProps> = ({ children, className }) => {
    return <Wrapper className={className}>{children}</Wrapper>
}

export default Headers
