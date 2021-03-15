import { CloseIcon, IconWrapper, MobileMenuSearchIcon } from '@sport/components/icons'
import useCustomParams from '@sport/hooks/useCustomParams'
import useSpringDebounceFn from '@sport/hooks/useSpringDebounceFn'
import { darken } from 'polished'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from '@sport/stores'
import { toggleShowSearchBar, updateSearchkeyword } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'
import { device } from '@sport/styles/common/device'
import { sleep } from '@sport/util/general'

const SSearchBarWrap = styled.div<{ showSearchBar: boolean }>`
    margin: ${(props) => (props.showSearchBar ? '0 0 0 10px' : '0 10px')};
    width: ${(props) => (props.showSearchBar ? '194px' : '34px')};
    overflow: hidden;
`

const SSearchBarLayout = styled.div<{ showSearchBar: boolean }>`
    border-radius: 60px;
    background-color: ${(props) => props.theme.sport.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    padding-left: ${(props) => (props.showSearchBar ? '5px' : 0)};
    /* padding: 6px 0; */
    /* transition: all 0.15s ease-in-out; */

    &:focus-within {
        border-color: ${(props) => props.theme.sport.colors.background};
        box-shadow: 0 2.5px 7.5px 0 rgba(0, 0, 0, 0.15);
    }
`

const SSearchInputWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SSearchInput = styled.input.attrs((props) => ({
    placeholder: props.placeholder,
}))`
    border: none;
    outline: none;
    appearance: none;
    background: ${(props) => props.theme.sport.colors.background};
    border-color: ${(props) => darken(0.05, props.theme.sport.colors.background)};
    transition: all 0.3s ease-in-out;
    font-size: 12px;
    line-height: 30px;

    @media ${device.mobile} {
        max-width: 140px;
    }

    ::placeholder {
        font-size: 12px;
        font-weight: bold;
        color: ${(props) => props.theme.sport.colors.text.primary};
    }

    ::-webkit-contacts-auto-fill-button {
        visibility: hidden;
        display: none !important;
        pointer-events: none;
        position: absolute;
        right: 0;
    }
`

const SSearchIcon = styled(IconWrapper)`
    margin: 0 10px;
    padding-right: 10px;

    svg path,
    rect {
        fill: ${(props) => props.theme.sport.colors.primary};
    }
`

const SCloseIcon = styled(IconWrapper)<{ show?: boolean }>`
    margin-right: 15px;
    opacity: ${({ show }) => (show ? 1 : 0)};
    transition: all 0.25s ease-in-out;

    svg path,
    rect {
        fill: ${(props) => props.theme.sport.colors.primary};
    }
`

const SearchBar: React.FC = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { isSelectCompetition } = useCustomParams()
    const showSearchBar = useSelector((state) => state.sportGlobal.showSearchBar)
    const inputRef = useRef<HTMLInputElement>(null)
    // const [init, setInit] = useState(false)
    const [input, setInput] = useState('')

    // const [ref, { width }] = useMeasure({ polyfill: ResizeObserver })
    const placeholder = isSelectCompetition ? 'betPanel.searchSeason' : 'betPanel.searchTeam'
    // const wrapProps = useSpring({ width: showSearchBar ? 194 : 34 })

    // const transition = useTransition(showSearchBar, null, {
    //     from: { width: 0, opacity: 0 },
    //     enter: { width: 160, opacity: 1 },
    //     leave: { width: 0, opacity: 0 },
    //     immediate: !init,
    //     config: {
    //         mass: 1,
    //         tension: 300,
    //         clamp: true,
    //     },
    // })

    const onSearchKeyword = (v: string) => dispatch(updateSearchkeyword(v))

    const { run: debounceUpdateSearchKeyword } = useSpringDebounceFn(onSearchKeyword, 500)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
        debounceUpdateSearchKeyword(event.currentTarget.value)
    }

    const clearSearchKeyword = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        await sleep(200)
        event.persist()
        dispatch(updateSearchkeyword(''))
        dispatch(toggleShowSearchBar(false))
    }

    const toggleSearchBar = (isOpne: boolean) => {
        dispatch(toggleShowSearchBar(isOpne))
    }

    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // width !== 160 && event.stopPropagation()
        toggleSearchBar(true)
    }

    // useEffect(() => {
    //     const timeoutHandler = setTimeout(() => setInit(true), 500)
    //     return () => clearTimeout(timeoutHandler)
    // })

    useEffect(() => {
        window.scrollTo(0, 0)

        if (showSearchBar) {
            // const timeoutHandler = setTimeout(() => inputRef.current?.focus(), 300);
            // return () => clearTimeout(timeoutHandler);
        } else {
            inputRef.current?.blur()
        }
    }, [showSearchBar])

    return (
        <SSearchBarWrap style={{ width: showSearchBar ? 194 : 34 }} showSearchBar={showSearchBar}>
            <SSearchBarLayout onClick={onClick} showSearchBar={showSearchBar}>
                <SSearchIcon size={18}>
                    <MobileMenuSearchIcon />
                </SSearchIcon>
                {showSearchBar && (
                    <SSearchInputWrap>
                        <SSearchInput ref={inputRef} onChange={onChange} value={input} placeholder={t(placeholder)} />
                        <SCloseIcon size={18} show={true} onClick={clearSearchKeyword}>
                            <CloseIcon />
                        </SCloseIcon>
                    </SSearchInputWrap>
                )}
            </SSearchBarLayout>
        </SSearchBarWrap>
    )
}

export default memo(SearchBar)
