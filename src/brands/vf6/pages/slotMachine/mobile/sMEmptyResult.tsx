import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import NoneImg from '@brand/assets/images/slotMachine/none.svg'
import bgImg from '@mixins/backgroundImg'

const Container = styled.div`
    padding: 12px 20px;
    margin: 20px 12px;
    background-color: #ffffff;
    width: calc(100% - 24px);
`

const Title = styled.p`
    ${(props) => props.theme.typography.Subtitle1}
    color: #3d7eeb;
    margin: 0;
`

const NoneLogo = styled.div`
    ${bgImg(NoneImg)}
    margin: 0 auto;
    width: 130px;
    height: 95px;
    margin-top: 76px;
`

const Content = styled.p`
    ${(props) => props.theme.typography.Body2}
    color: #333333;
    text-align: center;
    margin: 8px auto 0;
`

interface IProps {
    searchWord: string
}

const SMEmptyResult: React.FC<IProps> = ({ searchWord }) => {
    const t = useTranslation()
    return (
        <Container>
            <Title>{t('slotMachine.emptyResult.span1', { searchWord })}</Title>
            <NoneLogo />
            <Content>{t('slotMachine.emptyResult.span3')}</Content>
        </Container>
    )
}

export default SMEmptyResult
