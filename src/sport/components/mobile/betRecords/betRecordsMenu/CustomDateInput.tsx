import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'rmc-date-picker'
import 'rmc-date-picker/assets/index.css'
import PopPicker from 'rmc-date-picker/lib/Popup'
import 'rmc-picker/assets/index.css'
import 'rmc-picker/assets/popup.css'
import styled from 'styled-components/macro'

interface CustomDateInputProps {
    fetchRecord: (page: number, gte: string, lte: string) => void
}

const SDatePickForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    width: 100%;
`

const SDateSelectorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    width: 100%;

    & > span {
        margin: 2px 5px;
        width: 100%;
    }
`

const SDateSelectorInput = styled.div`
    background-color: #fff;
    border-radius: 50px;
    width: 100%;
    border: 0.5px solid #6d6d6d;
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: #080808;
    justify-content: space-between;
`

const SDateText = styled.span`
    font-size: calc(11px + 0.5vw);
`

const SPullDownArrow = styled.span`
    width: 8px;
    height: 8px;
    border-left: 2px solid #2e2e2e;
    border-bottom: 2px solid #2e2e2e;
    position: relative;
    margin: 0px 15px 5px 0px;
    transform: rotate(-45deg);
`

const SSearchButton = styled.div`
    background-color: #4b4b4b;
    color: #fff;
    border-radius: 4px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65px;
    margin: 0px 10px 1px 0px;
`

const minDate = new Date()
minDate.setDate(minDate.getDate() - 30)
const maxDate = new Date()

const CustomDateInput: React.FC<CustomDateInputProps> = ({ fetchRecord }) => {
    const { t } = useTranslation()
    const [from, setFrom] = useState(maxDate)
    const [to, setTo] = useState(maxDate)

    function customDateSearch() {
        if (from <= to) {
            fetchRecord(
                1,
                `${dayjs(from).format('YYYY-MM-DD')}T00:00:00Z`,
                `${dayjs(to).format('YYYY-MM-DD')}T23:59:59Z`,
            )
        }
    }

    function fromDateChange(date: Date) {
        if (date > to) setTo(date)
        setFrom(date)
    }

    function toDateChange(date: Date) {
        if (date < from) setFrom(date)
        setTo(date)
    }

    const fromDatePicker = (
        <DatePicker
            locale={{
                year: t('betRecord.datePick.year'),
                month: t('betRecord.datePick.month'),
                day: t('betRecord.datePick.day'),
            }}
            minDate={minDate}
            maxDate={maxDate}
        />
    )

    const toDatePicker = (
        <DatePicker
            locale={{
                year: t('betRecord.datePick.year'),
                month: t('betRecord.datePick.month'),
                day: t('betRecord.datePick.day'),
            }}
            minDate={minDate}
            maxDate={maxDate}
        />
    )

    return (
        <SDatePickForm>
            <SDateSelectorContainer>
                <PopPicker
                    datePicker={fromDatePicker}
                    title={t('betRecord.datePick.title')}
                    okText={t('button.confirm')}
                    dismissText={t('button.cancel')}
                    onChange={(date) => fromDateChange(date)}
                    date={from}>
                    <SDateSelectorInput>
                        <SDateText>{dayjs(from).format('YYYY-MM-DD')}</SDateText>
                        <SPullDownArrow />
                    </SDateSelectorInput>
                </PopPicker>
                <div>{t('betRecord.dateBetween')}</div>
                <PopPicker
                    style={{ width: '100%' }}
                    datePicker={toDatePicker}
                    title={t('betRecord.datePick.title')}
                    okText={t('button.confirm')}
                    dismissText={t('button.cancel')}
                    onChange={(date) => toDateChange(date)}
                    date={to}>
                    <SDateSelectorInput>
                        <SDateText>{dayjs(to).format('YYYY-MM-DD')}</SDateText>
                        <SPullDownArrow />
                    </SDateSelectorInput>
                </PopPicker>
            </SDateSelectorContainer>
            <SSearchButton onClick={customDateSearch}>{t('betRecord.search')}</SSearchButton>
        </SDatePickForm>
    )
}

export default CustomDateInput
