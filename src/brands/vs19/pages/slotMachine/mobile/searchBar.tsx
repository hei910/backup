import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import icon_search from '@brand/assets/images/slotMachine/mobile/icon-search.png'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import closeIcon from '@brand/assets/images/slotMachine/mobile/cross_icon.svg'

interface IProps extends ICustomSearchBar {
    onClose: () => void
}

const SCSearchBar = styled(CSearchBar)`
    width: auto;
    height: 38px;
    padding: 0;
    border-radius: 0;
    background-color: #778e9e;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 16px;
    color: #fff;

    ::placeholder {
        color: #ffffff;
    }
`

const SIcon = styled(CSearchBar.Icon)`
    ${bgImg(icon_search)}
    width: 38px;
    height: 38px;
    margin: 0;
`

const CloseBtn = styled.div`
    ${bgImg(closeIcon, 'contain')}
    width: 20px;
    height: 20px;
    margin-right: 8px;
`

const CustomSearchBar: React.FC<IProps> = ({ value = '', placeholder, onChange, onSubmit, onClose }) => {
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <SIcon />
            <SInput
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <CloseBtn onClick={onClose} />
        </SCSearchBar>
    )
}

export default CustomSearchBar
