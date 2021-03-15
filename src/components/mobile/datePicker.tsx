import { useState, useCallback, useMemo, useEffect } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/macro'
import RmcDatePicker from 'rmc-date-picker'
import { BaseModalBackground } from 'styled-react-modal'

import 'rmc-picker/assets/index.css'
import 'rmc-date-picker/assets/index.css'
import 'rmc-picker/assets/popup.css'
import useTranslation from '@hooks/useTranslation'

interface IDatePicker {
    defaultDate?: Date
    maxDate?: Date
    minDate?: Date
    onComplete: (date: Date) => void
}

const SDatePicker = styled.div`
    position: relative;

    .rmc-date-picker {
        width: 100%;
        background-color: white;

        .rmc-picker-item {
            color: #000;
        }

        .rmc-picker .rmc-picker-indicator {
            border: none;
            border-top: 1px solid #b9bcc3;
            border-bottom: 1px solid #b9bcc3;
        }
    }
`

const SToolBarContainer = styled.div`
    width: 100%;
    background-color: #eeeeee;
    display: flex;
    justify-content: space-between;
    padding: 16px 10px;
    font-size: 14px;
`

const SCustomBaseModalBackground = styled(BaseModalBackground)`
    flex-wrap: wrap;
    align-content: flex-end;
`

const SToolBarTitle = styled.div`
    color: #000000;
    font-size: 16px;
`

const SToolBarItem = styled.div`
    color: ${(props) => props.theme.colors.component.mobile.datePicker.toolBarColor};
    font-size: 16px;
`

const MODE = 'date'
const ROOT_NATIVE_PROPS = { 'data-xx': 'yy' }

const defaultMinDate = dayjs().subtract(20, 'year').toDate()
const defaultMaxDate = dayjs().toDate()

const DatePicker: React.FC<IDatePicker> = ({
    defaultDate = new Date(),
    maxDate = defaultMaxDate,
    minDate = defaultMinDate,
    onComplete,
    children,
}) => {
    const t = useTranslation()
    const [tempDate, setTempDate] = useState(defaultDate)
    const [isShow, setIsShow] = useState(false)

    const LOCALE = useMemo(
        () => ({
            year: t('general.components.datePicker.year'),
            month: t('general.components.datePicker.month'),
            day: t('general.components.datePicker.day'),
        }),
        [t],
    )

    useEffect(() => {
        setTempDate(defaultDate)
    }, [defaultDate])

    const onCompleteClick = useCallback(() => {
        onComplete(tempDate)
        setIsShow(false)
    }, [onComplete, tempDate])

    const onCancelClick = useCallback(() => {
        setIsShow(false)
    }, [])

    const onShowClick = useCallback(() => {
        setIsShow(true)
    }, [])

    return (
        <SDatePicker>
            <div onClick={onShowClick}>{children}</div>

            {isShow && (
                <SCustomBaseModalBackground>
                    <SToolBarContainer>
                        <SToolBarItem onClick={onCancelClick}>{t('general.components.datePicker.cancel')}</SToolBarItem>
                        <SToolBarTitle>{t('general.components.datePicker.title')}</SToolBarTitle>
                        <SToolBarItem onClick={onCompleteClick}>
                            {t('general.components.datePicker.enter')}
                        </SToolBarItem>
                    </SToolBarContainer>

                    <RmcDatePicker
                        rootNativeProps={ROOT_NATIVE_PROPS}
                        mode={MODE}
                        locale={LOCALE}
                        defaultDate={defaultDate}
                        maxDate={maxDate}
                        minDate={minDate}
                        onDateChange={setTempDate}
                    />
                </SCustomBaseModalBackground>
            )}
        </SDatePicker>
    )
}

export default DatePicker
