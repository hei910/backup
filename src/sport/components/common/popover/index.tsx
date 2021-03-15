import React from 'react'
import styled from 'styled-components/macro'

export interface PopoverInfo {
    contant: React.FC | JSX.Element
    title?: string
}

interface PopoverProps {
    info: PopoverInfo
    position?: 'relative' | 'static'
    className?: string
}

const Wrapper = styled.div<{ position: 'relative' | 'static' }>`
    position: ${(props) => props.position};
    margin-top: 1.5rem;
    display: inline-block;
    z-index: 99;
`

const Container = styled.div`
    /* text-align: center; */
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    margin: 0 auto;
    border-radius: 5px;
    width: auto;
    transform: none;
    background-color: #636363;
    padding: 0.5rem;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    color: #fff;
    transition: all 211ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 141ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 10px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #636363;
        margin: -7px;
    }
`

const HeaderWrap = styled.div``

const Content = styled.div`
    width: auto;
`

const Title = styled.label`
    font-size: 14px;
    font-weight: bold;
`

export const PopoverContantWrap = styled.div`
    display: flex;
    flex-direction: column;
`

export const Message = styled.span`
    font-size: 12px;
`

const Popover: React.FC<PopoverProps> = ({ info, className, position = 'relative' }) => {
    return (
        <Wrapper position={position}>
            <Container className={className}>
                {info.title && (
                    <HeaderWrap>
                        <Title>{info.title}</Title>
                    </HeaderWrap>
                )}

                <Content>{info.contant}</Content>
            </Container>
        </Wrapper>
    )
}

export default Popover
