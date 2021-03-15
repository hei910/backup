import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import NoneImg from '@brand/assets/images/slotMachine/none.svg'
import bgImg from '@mixins/backgroundImg'

interface IProps {
    searchWord: string
}

const Container = styled.div`
    padding: 24px 20px;
    background-color: #ffffff;
    width: 100%;
`

const Title = styled.p`
    ${(props) => props.theme.typography.H4Headline}
    color: #3d7eeb;
    margin: 0;
`

const NoneLogo = styled.div`
    ${bgImg(NoneImg)}
    margin: 0 auto;
    width: 130px;
    height: 95px;
`

const Content = styled.p`
    ${(props) => props.theme.typography.Body2}
    color: #333333;
    text-align: center;
    margin: 16px auto 0;
`

const SMEmptyResult: React.FC<IProps> = ({ searchWord }) => {
    const t = useTranslation()

    return (
        <Container>
            <Title>{t('slotMachine.emptyResult.span1', { searchWord })}</Title>
            {/* <SubTitle>{t('slotMachine.emptyResult.span2', { searchWord })}</SubTitle> */}
            <NoneLogo />
            <Content>{t('slotMachine.emptyResult.span3')}</Content>
        </Container>
    )
}

export default SMEmptyResult
