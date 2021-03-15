import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from '@sport/stores'
import { toggleBetList } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'

const Button = styled.div`
    position: fixed;
    left: 15px;
    bottom: 65px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    height: 50px;
    color: ${(props) => props.theme.sport.colors.text.active.secondary};
    background-color: ${(props) => props.theme.sport.colors.text.span};
    border-radius: 50%;
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
    user-select: none;
    z-index: 1;
`

const Count = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 2px;
    color: ${(props) => props.theme.sport.colors.text.span};
    background-color: ${(props) => props.theme.sport.colors.text.active.secondary};
    font-size: 16px;
    line-height: 30px;
`

const Text = styled.div`
    font-size: 10px;
`

const BetListFloatingButton: React.FC = () => {
    const show = useSelector((state) => !state.sportGlobal.betListOpen && state.sportBet.list.length > 0)
    const count = useSelector((state) => state.sportBet.list.length)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    if (!show) {
        return null
    }

    return (
        <Button onClick={() => dispatch(toggleBetList())}>
            <Count>{count}</Count>
            <Text>{t('betList.header')}</Text>
        </Button>
    )
}

export default React.memo(BetListFloatingButton)
