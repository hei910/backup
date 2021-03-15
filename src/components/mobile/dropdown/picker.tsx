import { useState, useEffect } from 'react'
import RmcPicker from 'rmc-picker'
import styled from 'styled-components/macro'
import { BaseModalBackground } from 'styled-react-modal'
import { IOption } from '.'

import 'rmc-picker/assets/index.css'
import useTranslation from '@hooks/useTranslation'

interface IPickerProps {
    options: Array<IOption>
    defaultValue: string
    onChange: (value: string) => void
}

const SPicker = styled.div`
    .rmc-picker {
        height: 170px;
        background: #f5f5f9;
        flex: auto;

        .rmc-picker-item {
            color: #000;

            &.rmc-picker-item-selected {
                font-weight: 600;
            }
        }
    }
`

const SCustomBaseModalBackground = styled(BaseModalBackground)`
    flex-wrap: wrap;
    align-content: flex-end;
`

const SToolBarContainer = styled.div`
    width: 100%;
    background: #f6f6f4;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
`

const SToolBarItem = styled.div`
    font-size: 15px;
    line-height: 24px;
    color: #1b79e2;
`

const Picker: React.FC<IPickerProps> = ({ options, defaultValue, onChange, children }) => {
    const t = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    const onComplete = () => {
        setValue(value)
        onChange(value)
        setIsOpen(!isOpen)
    }

    return (
        <SPicker>
            <div onClick={() => setIsOpen(true)}>{children}</div>
            {isOpen && (
                <SCustomBaseModalBackground>
                    <SToolBarContainer>
                        <SToolBarItem onClick={() => setIsOpen(false)}>
                            {t('general.components.dropdown.cancel')}
                        </SToolBarItem>
                        <SToolBarItem onClick={onComplete}>{t('general.components.dropdown.confirm')}</SToolBarItem>
                    </SToolBarContainer>

                    <RmcPicker defaultSelectedValue={value} onValueChange={setValue}>
                        {options.map((option) => (
                            <RmcPicker.Item key={option.value} value={option.value}>
                                {option.label}
                            </RmcPicker.Item>
                        ))}
                    </RmcPicker>
                </SCustomBaseModalBackground>
            )}
        </SPicker>
    )
}

export default Picker
