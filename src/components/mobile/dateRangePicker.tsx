import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import DatePicker from './datePicker'
import dayjs from 'dayjs'

interface IDateRagePicker {
    startDate: Date
    endDate: Date
    onStartDateComplete: (date: Date) => void
    onEndDateComplete: (date: Date) => void
    minDate: Date
    maxDate: Date
}

const DatePickerContainer = styled.div`
    display: flex;
    align-items: center;
`

const Seperator = styled.span`
    margin: 0 5px;
    font-size: 16px;
`

const SDateInput = styled.div`
    border-radius: 50px;
    border: ${(props) => props.theme.colors.component.mobile.datePicker.border};
    background-color: ${(props) => props.theme.colors.component.mobile.datePicker.bgColor};
    padding: 8px 12px;
    padding-right: 28px;
    color: #080808;

    &:after {
        content: '';
        position: absolute;
        top: 10px;
        right: 12px;
        width: 8px;
        height: 8px;
        border-width: 2px 2px 0px 0px;
        border-style: solid;
        transform: rotate(135deg);
    }
`

const DateRangePicker: React.FC<IDateRagePicker> = ({
    startDate,
    endDate,
    onStartDateComplete,
    onEndDateComplete,
    minDate,
    maxDate,
}) => {
    const t = useTranslation()
    return (
        <DatePickerContainer>
            <DatePicker defaultDate={startDate} onComplete={onStartDateComplete} minDate={minDate} maxDate={endDate}>
                <SDateInput>{dayjs(startDate).format('YYYY/MM/DD')}</SDateInput>
            </DatePicker>
            <Seperator>{t('general.components.datePicker.seperator')}</Seperator>
            <DatePicker defaultDate={endDate} onComplete={onEndDateComplete} minDate={startDate} maxDate={maxDate}>
                <SDateInput>{dayjs(endDate).format('YYYY/MM/DD')}</SDateInput>
            </DatePicker>
        </DatePickerContainer>
    )
}

export default DateRangePicker
