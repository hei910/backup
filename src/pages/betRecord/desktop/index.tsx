/* eslint-disable indent */
import BetRecordNav from '@components/desktop/betRecordNav'
import styled from 'styled-components/macro'
import RightTable from './section/rightTable'
import DateRangePicker from '@components/desktop/dateRangePicker'
import useTranslation from '@hooks/useTranslation'
import { Collapse } from 'react-collapse'
import { isTableExpandable } from './constants'
import BetRecordSummary from './section/summary'
import useInitBetRecord from './hook'
// import useCommonInit from '../hook'
import Interval from '@constants/intervals'
import Pagination from '@components/desktop/betRecordPagination'
import { useCallback } from 'react'
// import { allBetDummy } from '../dummyData'

const OuterContainer = styled.div`
    width: 100%;
    height: 100%;
`

const InnerContainer = styled.div`
    margin: 0 auto;
    max-width: 1440px;
    height: fit-content;
    display: flex;

    @media print {
        size: A4;
        background: transparent;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        button {
            background: transparent;
            border: 1px #404040 solid;
        }

        div {
            background: transparent;
            color: #000000;
            max-width: 1000px;
        }

        > div:first-child {
            display: none;
        }
    }
`
const ContentContainer = styled.div`
    min-width: 1022.5px;
    width: 100%;
    height: 100%;
    padding: 20px 15px 0;

    .ReactCollapse--collapse {
        transition: height 0.3s ease;
    }
`
const ContentHeader = styled.div`
    width: 100%;
    /* max-width: 1156px;  */
    height: 67px;
    color: ${(props) => props.theme.colors.page.desktop.betRecord.contentHeader.color};
    background: ${(props) => props.theme.colors.page.desktop.betRecord.contentHeader.bgColor};
    font-weight: bold;
    font-size: 18px;
    padding: 21px 20px;
`
const STableSExpandableHeader = styled.div`
    background: ${(props) => props.theme.colors.page.desktop.betRecord.expandableHeader.bgColor};
    display: flex;
    height: 35px;
    color: ${(props) => props.theme.colors.page.desktop.betRecord.expandableHeader.color};
    /* margin-top:  */
    cursor: pointer;
`
const STableHeaderText = styled.div`
    display: flex;
    align-items: center;
`
const SChevron = styled.div<{ arrowup: string }>`
    border-top: 2px solid ${(props) => props.theme.colors.page.desktop.betRecord.expandableHeader.color};
    border-left: 2px solid ${(props) => props.theme.colors.page.desktop.betRecord.expandableHeader.color};
    transform: ${(props) => (props.arrowup === 'true' ? `rotate(45deg)` : `rotate(-135deg)`)};
    height: 9px;
    width: 9px;
    ${(props) => (props.arrowup === 'true' ? 'margin-top: 14px;' : 'margin-top: 12px;')}
    margin-left: 14px;
    margin-right: 14px;
    margin-bottom: 14px;
`
const SDatePickerPrintContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 0 20px 10px;
`
const SDateTitleContainer = styled.div`
    padding: 16px 0 10px;
    font-weight: bold;
`
const SDateGreySpan = styled.span`
    color: #6e6e6e;
`
const SGeneralDateContainer = styled.div`
    background: #e3e3e3;
    display: flex;
    height: 40px;
    margin-bottom: 1px;
`
const SGeneralDateSection = styled.div<{ isactive?: boolean }>`
    background: ${(props) =>
        props.isactive
            ? props.theme.colors.page.desktop.betRecord.generalDate.activeBgColor
            : props.theme.colors.page.desktop.betRecord.generalDate.bgColor};
    color: ${(props) =>
        props.isactive
            ? props.theme.colors.page.desktop.betRecord.generalDate.activeColor
            : props.theme.colors.page.desktop.betRecord.generalDate.color};
    border-right: #fff 1px solid;
    font-weight: ${(props) => (props.isactive ? 'bold' : 'normal')};
    cursor: pointer;
    padding: 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
`

//RoundedButton
const SSubmitButton = styled.button`
    width: auto;
    margin-right: 30px;
    padding: 6px 12px;
    border-radius: 3px;
    white-space: nowrap;
    border: ${(props) => props.theme.colors.page.desktop.betRecord.button.border};
    background: ${(props) => props.theme.colors.page.desktop.betRecord.button.bgColor};
    color: ${(props) => props.theme.colors.page.desktop.betRecord.button.color};
`

const PrintButton = () => {
    const t = useTranslation()
    const onClick = () => {
        window.print()
    }

    return <SSubmitButton onClick={onClick}>{t('general.components.button.print')}</SSubmitButton>
}

export default () => {
    const t = useTranslation()
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        interval,
        // setInterval,
        onClickDate,
        currentSection,
        convertedData,
        brandName,
        // getResult,
        getData,
        page,
        setPage,
        totalPages,
        timezone,
        headerStartDate,
        headerEndDate,
        totalBetAmount,
        totalValidBetAmount,
        totalPayoutAmount,
        totalNetProfit,
        toggled,
        setToggled,
        onPageChange,
        haveEarlySettle,
    } = useInitBetRecord()
    const toggleHandler = () => {
        setToggled(!toggled)
    }
    const header = t(`betRecord.navBarTitles.${currentSection}`, { brandName })
    const sports = t(`betRecord.sports`)
    const lottery = t(`betRecord.lottery`)
    const esport = t(`betRecord.esport`)
    const notShowDateRange = currentSection.includes('unsettled')
    // const { convertData } = useCommonInit()
    const mainHeader = () => {
        if (currentSection.includes('sport') && !currentSection.includes('esport')) {
            return `${sports}: ${header}`
        } else if (currentSection.includes('lot')) {
            return `${lottery}: ${header}`
        } else if (currentSection.includes('esport')) {
            return `${esport}: ${header}`
        } else {
            return header
        }
    }

    const dateHeader =
        currentSection.includes('sports') || currentSection.includes('lottery')
            ? t(`betRecord.sportsDate`)
            : t(`betRecord.inquryDate`)

    const onInquiryChange = useCallback(() => {
        getData(startDate, endDate, 1)
        setPage(1)
    }, [endDate, getData, setPage, startDate])

    // const convertedData = convertData(allBetDummy)

    return (
        <OuterContainer>
            <InnerContainer>
                <BetRecordNav />
                <ContentContainer>
                    <ContentHeader>{mainHeader()}</ContentHeader>
                    <SDatePickerPrintContainer>
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                        />
                        <SSubmitButton onClick={onInquiryChange}>{t(`betRecord.inquiry`)}</SSubmitButton>
                        <PrintButton />
                    </SDatePickerPrintContainer>
                    {!notShowDateRange && (
                        <SDateTitleContainer>
                            <span>{dateHeader}: </span>
                            <SDateGreySpan>
                                {headerStartDate} - {headerEndDate}
                            </SDateGreySpan>
                            <span> (GMT {timezone})</span>
                        </SDateTitleContainer>
                    )}
                    <SGeneralDateContainer>
                        <SGeneralDateSection
                            isactive={interval === Interval.TODAY}
                            onClick={() => onClickDate(Interval.TODAY)}>
                            {t(`betRecord.today`)}
                        </SGeneralDateSection>
                        <SGeneralDateSection
                            isactive={interval === Interval.YESTERDAY}
                            onClick={() => onClickDate(Interval.YESTERDAY)}>
                            {t(`betRecord.yesterday`)}
                        </SGeneralDateSection>
                        <SGeneralDateSection
                            isactive={interval === Interval.MONTH}
                            onClick={() => onClickDate(Interval.MONTH)}>
                            {t(`betRecord.pastThirty`)}
                        </SGeneralDateSection>
                    </SGeneralDateContainer>
                    {isTableExpandable.includes(currentSection) && (
                        <STableSExpandableHeader onClick={toggleHandler}>
                            <SChevron arrowup={toggled.toString()} />
                            <STableHeaderText>{header}</STableHeaderText>
                        </STableSExpandableHeader>
                    )}
                    <Collapse isOpened={toggled}>
                        <RightTable
                            page={currentSection}
                            data={/*convertData(getDummyData(currentSection))*/ convertedData}
                            haveEarlySettle={haveEarlySettle}
                        />
                    </Collapse>
                    <BetRecordSummary
                        totalBetAmount={totalBetAmount}
                        totalValidBetAmount={totalValidBetAmount}
                        totalPayoutAmount={totalPayoutAmount}
                        totalNetProfit={totalNetProfit}
                    />
                    <Pagination currentPage={page} totalPage={totalPages} onChange={onPageChange} />
                </ContentContainer>
            </InnerContainer>
        </OuterContainer>
    )
}
