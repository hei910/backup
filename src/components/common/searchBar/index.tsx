import React, { FormEvent, useCallback } from 'react'
import styled from 'styled-components/macro'

import Icon from './icon'
import Button from './button'
import Input from './input'
import Form from '../form'

export interface ICustomSearchBar {
    value?: string
    placeholder?: string
    onChange?: (value: string) => void
    onSubmit?: (event?: FormEvent) => void
}

interface ISearchBar {
    className?: string
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

type SearchBarType = React.FC<ISearchBar> & {
    Icon: React.FC<React.InputHTMLAttributes<HTMLDivElement>>
    Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>
    Button: React.FC<React.InputHTMLAttributes<HTMLButtonElement>>
}

const SSearchBar = styled(Form)`
    width: 100%;
    padding: 4px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.component.common.searchBar.bgColor};
    position: relative;
    border-radius: 17px;
`

const SearchBar: SearchBarType = ({ className, onSubmit, children }) => {
    const onFormSubmit = useCallback(
        (e) => {
            e.preventDefault()
            onSubmit?.(e)
        },
        [onSubmit],
    )

    return (
        <SSearchBar className={className} onSubmit={onFormSubmit}>
            {children}
        </SSearchBar>
    )
}

SearchBar.Icon = Icon
SearchBar.Input = Input
SearchBar.Button = Button

export default SearchBar
