import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'

export default styled.div<{ src: string }>`
    width: 100%;
    height: 50vw;
    ${(props) => bgImg(props.src)}
`
