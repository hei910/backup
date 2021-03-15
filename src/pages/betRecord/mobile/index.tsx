import styled from 'styled-components/macro'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import DateRangePicker from '@components/mobile/dateRangePicker'
import Dropdown from '@components/mobile/dropdown'
import useTranslation from '@hooks/useTranslation'
import Tabs from './tabs'
import Record from './record'
import useBetRecord from './hook'
import AppBar from '@components/mobile/appbar'
// import { allBetDummy } from '../dummyData'
// import useCommonInit from '../hook'

const SPageContainer = styled(PageContainer)`
    background-color: ${(props) => props.theme.colors.component.mobile.pageContainer.sPageContainer.bgColor};
    padding-bottom: 0;
`

const SAppBar = styled(AppBar)`
    box-shadow: none;
`

const SDropdown = styled(Dropdown)`
    width: 145px;
    height: 25px;
    color: white;
`

const Filter = styled.img`
    width: 20px;
    vertical-align: text-bottom;
    margin-left: 8px;
`

const DateRangePickerContainer = styled(FullWidthContainer)`
    background-color: ${(props) => props.theme.colors.page.mobile.betRecord.dateRangePickerContainer.bgColor};
    border-bottom: ${(props) => props.theme.colors.page.mobile.betRecord.dateRangePickerContainer.border};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 6px 3px;
`

const BtnSearch = styled.div`
    background-color: ${(props) => props.theme.colors.page.mobile.betRecord.searchBtn.bgColor};
    color: ${(props) => props.theme.colors.page.mobile.betRecord.searchBtn.color};
    border-radius: 4px;
    padding: 4px 0;
    text-align: center;
    width: 14%;
    min-width: 20px;
    max-height: 45px;
    ${(props) => props.theme.typography.Body2}
`

const BetRecord = () => {
    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        Supplier,
        tabs,
        onTabClick,
        options,
        onSelectGameType,
        FilterIcon,
        hasMore,
        loadMore,
        getBetRecord,
        cardData,
        totalWinAmount,
        totalValidBetAmount,
        totalRecord,
    } = useBetRecord()
    const t = useTranslation()
    // const { convertData } = useCommonInit()

    // const cardData = convertData(allBetDummy)
    return (
        <SPageContainer>
            <SAppBar backText={t('betRecord.title')} isBackToHome>
                <SDropdown value={Supplier} options={options} onChange={onSelectGameType}>
                    {Supplier.label}
                    <Filter src={FilterIcon} />
                </SDropdown>
            </SAppBar>
            <Tabs tabs={tabs} onTabClick={onTabClick} />
            {tabs[tabs.length - 1].isActive ? (
                <DateRangePickerContainer>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateComplete={setStartDate}
                        onEndDateComplete={setEndDate}
                        minDate={new Date(new Date().setDate(new Date().getDate() - 30))}
                        maxDate={new Date(new Date().getFullYear() + 20, 11, 31)}
                    />
                    <BtnSearch onClick={getBetRecord}>{t('betRecord.search')}</BtnSearch>
                </DateRangePickerContainer>
            ) : null}
            <Record
                cardData={cardData}
                loadMore={loadMore}
                hasMore={hasMore}
                totalRecord={totalRecord}
                totalWinAmount={totalWinAmount}
                totalValidBetAmount={totalValidBetAmount}
            />
        </SPageContainer>
    )
}

export default BetRecord
