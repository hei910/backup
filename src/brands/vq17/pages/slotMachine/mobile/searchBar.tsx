import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'

const SCSearchBar = styled(CSearchBar)`
    border-radius: 10px;
    border: solid 2px #616161;
    background-color: #333333;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 14px;
    color: #a6a6a6;
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
            <CSearchBar.Icon />
        </SCSearchBar>
    )
}

export default CustomSearchBar
