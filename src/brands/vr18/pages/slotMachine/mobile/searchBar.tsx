import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'

const SCSearchBar = styled(CSearchBar)`
    border-radius: 3px;
    background-color: #f2f2f2;
    margin-top: 6px;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 16px;
    color: #a6a6a6;
`
const SIcon = styled(CSearchBar.Icon)`
    width: 25px;
    height: 25px;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <SInput
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <SIcon />
        </SCSearchBar>
    )
}

export default CustomSearchBar
