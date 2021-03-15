import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'

const SCSearchBar = styled(CSearchBar)`
    border-radius: 0;
    background-color: #ffffff;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 16px;
    color: #000000;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <CSearchBar.Icon />
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
