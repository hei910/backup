import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'

const SCSearchBar = styled(CSearchBar)`
    width: auto;
    height: 42px;
    margin: 8px;
    border-radius: 6px;
    background-color: #161616;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 16px;
    color: #fff;
`

const SIcon = styled(CSearchBar.Icon)`
    width: 30px;
    height: 30px;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <SIcon />
            <SInput
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
        </SCSearchBar>
    )
}

export default CustomSearchBar
