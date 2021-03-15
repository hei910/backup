import { useCallback } from 'react'
import styled from 'styled-components/macro'
import Calendar from './calendar'
import IconCalendar from '@images/calendar.png'

import bgImg from '@mixins/backgroundImg'

const SDateInput = styled.div`
    position: relative;
    margin-right: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const SInputField = styled.div`
    display: flex;
    flex-direction: row;
    width: 175px;
    height: 30px;
`

const SInput = styled.input`
    width: 80%;
    height: 100%;
    color: #555;
    background-color: white;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    outline: none;
    padding: 5px 0px 6px 10px;
`

const SButton = styled.div`
    width: 20%;
    background-color: #eee;
    border: 1px solid #eee;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    cursor: pointer;
    ${bgImg(IconCalendar, '15px 15px')}
`

interface IDateInput {
    date: Date
    minDate?: Date
    maxDate?: Date
    onBtnClick?: () => void
    onChangeDate: (date: Date) => void
    showCalendar: boolean
    setShowCalendar: (show: boolean) => void
}

export default ({ date, minDate, maxDate, onBtnClick, onChangeDate, showCalendar, setShowCalendar }: IDateInput) => {
    const convertedDate = useCallback((date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }, [])

    return (
        <SDateInput>
            <SInputField>
                <SInput type="text" value={convertedDate(date)} readOnly />
                <SButton onClick={onBtnClick} />
            </SInputField>
            <Calendar
                defaultDate={date}
                minDate={minDate}
                maxDate={maxDate}
                onClickDay={onChangeDate}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
            />
        </SDateInput>
    )
}
