import { useState, useCallback } from 'react'
import styled from 'styled-components/macro'
import DatePicker from '@components/desktop/datePicker'
import useTranslation from '@hooks/useTranslation'

const DatePickerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const DateLabel = styled.label`
    width: 80px;
    text-align: center;
    color: #6e6e6e;
    ${(props) => props.theme.typography.Body3};
`

interface IDateRangePicker {
    startDate: Date
    endDate: Date
    setStartDate: (date: Date) => void
    setEndDate: (date: Date) => void
    minDate?: Date
    maxDate?: Date
}

export default ({ startDate, endDate, setStartDate, setEndDate, minDate, maxDate }: IDateRangePicker) => {
    const t = useTranslation()
    const [showStartCalendar, setShowStartCalendar] = useState(false)
    const [showEndCalendar, setShowEndCalendar] = useState(false)

    const onStartBtnClick = useCallback(() => {
        setShowStartCalendar(!showStartCalendar)
    }, [showStartCalendar])

    const onEndBtnClick = useCallback(() => {
        setShowEndCalendar(!showEndCalendar)
    }, [showEndCalendar])

    const onChangeStartDate = useCallback(
        (startDate) => {
            if (endDate < startDate) {
                setEndDate(startDate)
            }
            setStartDate(startDate)
            onStartBtnClick()
        },
        [onStartBtnClick, setStartDate, endDate, setEndDate],
    )

    const onChangeEndDate = useCallback(
        (endDate) => {
            if (startDate > endDate) {
                setStartDate(endDate)
            }
            setEndDate(endDate)
            onEndBtnClick()
        },
        [onEndBtnClick, setEndDate, setStartDate, startDate],
    )

    return (
        <DatePickerContainer>
            <DateLabel>{t('general.components.dateRangePicker.start')}</DateLabel>
            <DatePicker
                date={startDate}
                minDate={minDate}
                maxDate={maxDate}
                onBtnClick={onStartBtnClick}
                onChangeDate={onChangeStartDate}
                showCalendar={showStartCalendar}
                setShowCalendar={setShowStartCalendar}
            />
            <DateLabel>{t('general.components.dateRangePicker.end')}</DateLabel>
            <DatePicker
                date={endDate}
                minDate={minDate}
                maxDate={maxDate}
                onBtnClick={onEndBtnClick}
                onChangeDate={onChangeEndDate}
                showCalendar={showEndCalendar}
                setShowCalendar={setShowEndCalendar}
            />
        </DatePickerContainer>
    )
}
