import React, { useRef } from 'react'
import { useDispatch, useSelector } from '@sport/stores'
import { logoutPlayer } from '@services/sportPlayer/actions'
import styled from 'styled-components/macro'
import { getCookieByName } from '@sport/util/general'

const SWrapper = styled.div`
    display: flex;
    align-items: center;
`

const SInput = styled.input`
    border-radius: 3px 0 0 3px;
    width: 50px;
`

const SUsername = styled.div`
    border-radius: 3px 0 0 3px;
    color: #fff;
    padding: 0 10px;
    background-color: #444;
`

const SButton = styled.div`
    color: #fff;
    border-radius: 0 3px 3px 0;
    background-color: #777;
    padding: 0 5px;
    cursor: pointer;
`

const DebugInput: React.FC = () => {
    const player = useSelector((store) => store.sportPlayer.username)
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            window.location.href = `http://localhost:3030/login?username=${inputRef?.current?.value ?? 'test'}`
        }
    }

    const handleButtonClick = () => {
        window.location.href = `http://localhost:3030/login?username=${inputRef?.current?.value ?? 'test'}`
    }

    const logout = () => {
        const loginReferer = getCookieByName('loginReferer')
        window.localStorage.setItem('loginReferer', loginReferer || '')
        dispatch(logoutPlayer())
    }

    if (player) {
        return (
            <SWrapper>
                <SUsername>{player}</SUsername>
                <SButton onClick={logout}>Logout</SButton>
            </SWrapper>
        )
    } else {
        return (
            <SWrapper>
                <SInput onKeyDown={handleEnterDown} ref={inputRef}></SInput>
                <SButton onClick={handleButtonClick}>Login</SButton>
            </SWrapper>
        )
    }
}

export default DebugInput
