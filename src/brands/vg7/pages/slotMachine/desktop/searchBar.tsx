import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

const SCSearchBarLayout = styled.div`
    display: flex;
`

const SCSearchBar = styled(CSearchBar)`
    margin-right: 10px;
    border: solid 1px #d2d2d2;
    border-radius: 3px;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 20px;
`

const SButton = styled(CSearchBar.Button)`
    background-color: #969696;
    color: #fff;
    border-radius: 3px;
    font-size: 20px;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    const t = useTranslation()

    return (
        <SCSearchBarLayout>
            <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
                <CSearchBar.Icon />
                <SInput
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            </SCSearchBar>
            <SButton onClick={() => onSubmit && onSubmit()}>{t('slotMachine.searchBar.search')}</SButton>
        </SCSearchBarLayout>
    )
}

export default CustomSearchBar
