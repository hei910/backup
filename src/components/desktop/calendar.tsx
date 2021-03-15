import { useEffect, useRef } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components/macro'
import 'react-calendar/dist/Calendar.css'

const SCalendar = styled(Calendar)`
    position: fixed;

    &.react-calendar {
        width: 280px;
    }

    .react-calendar__tile--now {
        background: none;
        color: black;

        :enabled:hover {
            background-color: #e6e6e6;
        }

        &.react-calendar__tile--active {
            background-color: ${(props) => props.theme.colors.component.desktop.calendar.bgColor};
            color: white;

            :enabled:hover {
                background-color: ${(props) => props.theme.colors.component.desktop.calendar.bgColor};
            }
        }
    }

    .react-calendar__tile--active {
        background-color: ${(props) => props.theme.colors.component.desktop.calendar.bgColor};
        color: white;

        &:enabled:hover {
            background-color: ${(props) => props.theme.colors.component.desktop.calendar.bgColor};
        }
    }

    .react-calendar__tile--hasActive {
        background-color: ${(props) => props.theme.colors.component.desktop.calendar.bgColor};

        abbr {
            color: white;
        }

        &:enabled:hover {
            background-color: ${(props) => props.theme.colors.component.desktop.calendar.bgColor};
        }
    }

    .react-calendar__month-view__days__day {
        border: 0.5px solid #ccc;
    }

    .react-calendar__month-view__weekdays__weekday {
        background-color: ${(props) => props.theme.colors.component.desktop.calendar.weekBgColor};
        color: ${(props) => props.theme.colors.component.desktop.calendar.weekColor};

        abbr[title] {
            text-decoration: none;
        }
    }

    .react-calendar__navigation {
        margin-bottom: 0;

        button {
            &:enabled:focus {
                background-color: white;
            }
        }

        .react-calendar__navigation__label {
            &:enabled:focus {
                background-color: white;
            }

            &button[disabled] {
                color: #4d4d4d;
                background-color: white;
            }
        }
    }

    .react-calendar__navigation__label__labelText,
    .react-calendar__navigation__arrow {
        color: ${(props) => props.theme.colors.component.desktop.calendar.bgColor};
    }
`

interface ICalendar {
    defaultDate: Date
    minDate?: Date
    maxDate?: Date
    showCalendar: boolean
    setShowCalendar: (show: boolean) => void
    onClickDay: (date: any) => void
}

export default ({ defaultDate, minDate, maxDate, showCalendar, setShowCalendar, onClickDay }: ICalendar) => {
    const node = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: { target: any }) => {
            if (node && node.current && node.current.contains(e.target)) {
                return
            } else {
                setShowCalendar(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [setShowCalendar])

    return showCalendar === true ? (
        <div ref={node}>
            <SCalendar
                calendarType="US"
                next2Label={null}
                prev2Label={null}
                defaultValue={defaultDate}
                minDate={minDate}
                maxDate={maxDate}
                onClickDay={onClickDay}
            />
        </div>
    ) : null
}
