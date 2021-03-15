import DebugInput from '@sport/components/mobile/general/DebugInput'
import { CloseIcon, RealLiveGreyIcon, SettingIcon } from '@sport/components/icons'
import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '@sport/stores'
import { changeOddsType } from '@services/sportBet/actions'
import { OddsType } from '@services/sportBet/types'
import { setUseCache, toggleSampleData } from '@services/sportData/actions'
import { changeDataSource, changeTimezone, setLanguage, switchTheme } from '@services/sportGlobal/actions'
import { Language, ThemeName } from '@services/sportGlobal/types'
import styled from 'styled-components/macro'
import { device } from '@sport/styles/common/device'

const SPanelPopUpButtonWrap = styled.div<{ currRelPosition: { [key: string]: number } }>`
    position: fixed;
    border-radius: 50%;
    bottom: ${(props) => `${props.currRelPosition.bottomY}px`};
    right: ${(props) => `${props.currRelPosition.rightX}px`};
    z-index: 11;
    opacity: 0.8;
    width: 45px;
    height: 45px;
    background-color: ${(props) => props.theme.sport.colors.primary};
    padding: 5px;
    box-shadow: 5px -5px 30px 0px rgba(66, 66, 66, 0.7);
    fill: white;
`

const SPanelPopUpButton = styled(SettingIcon)`
    width: 40px;
    height: 40px;
`

const SPanelHeaderIcon = styled(SettingIcon)`
    width: 35px;
    height: 35px;
    padding-right: 5px;
    fill: ${(props) => props.theme.sport.colors.text.primary};
`

// const SDataInfoBox = styled.div<{ currRelPosition: { [key: string]: number } }>`
//     display: flex;
//     align-items: center;
//     justify-content: space-around;
//     position: fixed;
//     width: 100px;
//     height: 40px;
//     background-color: ${(props) => props.theme.sport.colors.primary};
//     padding: 5px;
//     z-index: 9;
//     bottom: ${(props) => `${props.currRelPosition.bottomY + 5}px`};
//     right: ${(props) => `${props.currRelPosition.rightX + -10}px`};
//     opacity: 0;
//     color: ${(props) => props.theme.sport.colors.text.primary};
//     border-radius: 6px;

//     ${SPanelPopUpButtonWrap}:hover & {
//         transition: all 0.5s ease;
//         transform: translate(-60px, 0);
//         opacity: 1;
//     }
// `;

// const SDataSourceText = styled.div`
//     font-size: 15px;
//     font-weight: 500;
// `;

// const StyledSampleDataIconWrap = styled.div<{ isUseSampleData?: boolean }>`
//     path {
//         fill: ${(props) => (props.isUseSampleData ? '' : 'lightgreen')};
//     }
// `;

const StyledSampleDataIcon = styled(RealLiveGreyIcon)`
    width: 30px;
    height: 30px;
    cursor: pointer;
`

const SPanelHeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
`

const SPanelWrap = styled.div`
    position: fixed;
    background-color: ${(props) => props.theme.sport.colors.background};
    z-index: 11;
    width: 260px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;

    @media ${device.tablet} {
        width: 600px;
        /* height: 400px; */
    }
`

const SCloseIcon = styled(CloseIcon)`
    width: 35px;
    height: 35px;
    padding: 10px;
    cursor: pointer;
    fill: #000;
`

const SPanelOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.72);
    z-index: 10;
`

const SPanelItem = styled.div`
    display: flex;
    align-items: center;
    padding: 3px 10px;
    margin-top: 12px;
    justify-content: space-between;
`

const SDropdownList = styled.select`
    background-color: ${(props) => props.theme.sport.colors.background};
    color: ${(props) => props.theme.sport.colors.text.primary};
    padding: 6px;
    margin: 0;
`

const SLiveDataToggleWrap = styled.div<{ isUseSampleData?: boolean }>`
    path {
        fill: ${(props) => (props.isUseSampleData ? '' : 'lightgreen')};
    }
`

const SPanelHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
    padding-left: 10px;
    color: ${(props) => props.theme.sport.colors.text.primary};

    @media ${device.tablet} {
        font-size: 26px;
    }
`
const SPanelItemText = styled.div`
    padding-right: 5px;
    font-size: 14px;
    color: ${(props) => props.theme.sport.colors.text.primary};

    @media ${device.tablet} {
        font-size: 18px;
    }
`

interface ConfigurationPanelProps {}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = () => {
    const dispatch = useDispatch()

    const isUseSampleData = useSelector((state) => state.sportData.sampleData)
    const dataSource = useSelector((state) => state.sportGlobal.dataSource)
    const language = useSelector((state) => state.sportGlobal.language)
    const timezone = useSelector((state) => state.sportGlobal.timezone)
    const oddsType = useSelector((state) => state.sportBet.oddsType)
    const themeName = useSelector((state) => state.sportGlobal.themeName)
    const useCache = useSelector((state) => state.sportData.cacheData)

    const [isShowPanel, setIsShowPanel] = useState(false)
    // const [isShowDataSourceInfo, setIsShowDataSourceInfo] = useState(false);

    const selectTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(switchTheme(event.target.value as ThemeName))
    }

    const selectDataSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeDataSource(event.target.value as string))
    }

    const selectTimezone = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeTimezone(event.target.value as string))
    }

    const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLanguage(event.target.value as Language))
    }

    const selectOddsType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeOddsType(event.target.value as OddsType))
    }

    const toggleCacheOnOff = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setUseCache(event.target.value === 'true'))
    }

    const setUseSampleData = () => {
        dispatch(toggleSampleData())
    }

    const onShowPanel = () => {
        setIsShowPanel(true)
    }

    const onHidePanel = () => {
        setIsShowPanel(false)
    }

    const [currRelPosition, setCurrRelPosition] = useState({ rightX: 45, bottomY: 35 })
    const handleDragEndCapture = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        setCurrRelPosition({
            rightX: window.innerWidth - event.clientX,
            bottomY: window.innerHeight - event.clientY,
        })
    }

    const handleTouchStartCapture = (event: React.TouchEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }
    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setCurrRelPosition({
            rightX: window.innerWidth - event.changedTouches[event.changedTouches.length - 1].clientX,
            bottomY: window.innerHeight - event.changedTouches[event.changedTouches.length - 1].clientY,
        })
    }

    return (
        <>
            <SPanelPopUpButtonWrap
                draggable="true"
                onDragEndCapture={handleDragEndCapture}
                onTouchStartCapture={handleTouchStartCapture}
                onTouchMove={handleTouchMove}
                onMouseUp={onShowPanel}
                currRelPosition={currRelPosition}>
                {/* <SDataInfoBox currRelPosition={currRelPosition}>
                    {!isUseSampleData && (
                        <StyledSampleDataIconWrap isUseSampleData={isUseSampleData}>
                            <StyledSampleDataIcon />
                        </StyledSampleDataIconWrap>
                    )}
                    <SDataSourceText>{isUseSampleData ? `No Live` : dataSource}</SDataSourceText>
                </SDataInfoBox> */}
                <SPanelPopUpButton />
            </SPanelPopUpButtonWrap>

            {isShowPanel && (
                <>
                    <SPanelOverlay onClick={onHidePanel} />
                    <SPanelWrap>
                        <SPanelHeaderWrap>
                            <SPanelHeader>
                                <SPanelHeaderIcon />
                                Configuration Panel
                            </SPanelHeader>
                            <SCloseIcon onClick={onHidePanel} />
                        </SPanelHeaderWrap>
                        <SPanelItem>
                            <SPanelItemText>Theme:</SPanelItemText>
                            <SDropdownList onChange={selectTheme} value={themeName}>
                                <option value="default">Default Theme</option>
                                <option value="dark">Dark Theme</option>
                            </SDropdownList>
                        </SPanelItem>

                        <SPanelItem>
                            <SPanelItemText>Source:</SPanelItemText>
                            <SDropdownList onChange={selectDataSource} value={dataSource.toUpperCase()}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="M">M</option>
                            </SDropdownList>
                        </SPanelItem>
                        <SPanelItem>
                            <SPanelItemText>Time Zone:</SPanelItemText>
                            <SDropdownList onChange={selectTimezone} value={timezone}>
                                <option value="+8">+ 8</option>
                                <option value="-4">- 4</option>
                            </SDropdownList>
                        </SPanelItem>
                        <SPanelItem>
                            <SPanelItemText>Use Live Data:</SPanelItemText>
                            <SLiveDataToggleWrap onClick={setUseSampleData} isUseSampleData={isUseSampleData}>
                                <StyledSampleDataIcon />
                            </SLiveDataToggleWrap>
                        </SPanelItem>
                        <SPanelItem>
                            <SPanelItemText>Language:</SPanelItemText>
                            <SDropdownList onChange={selectLanguage} value={language}>
                                <option value={Language.zh_CN}>{Language.zh_CN}</option>
                                <option value={Language.zh_TW}>{Language.zh_TW}</option>
                                <option value={Language.id}>{Language.id}</option>
                                <option value={Language.en_US}>{Language.en_US}</option>
                            </SDropdownList>
                        </SPanelItem>
                        <SPanelItem>
                            <SPanelItemText>OddsType:</SPanelItemText>
                            <SDropdownList onChange={selectOddsType} value={oddsType}>
                                <option value={OddsType.EURO}>{OddsType.EURO}</option>
                                <option value={OddsType.HONG_KONG}>{OddsType.HONG_KONG}</option>
                                <option value={OddsType.INDO}>{OddsType.INDO}</option>
                                <option value={OddsType.MALAY}>{OddsType.MALAY}</option>
                            </SDropdownList>
                        </SPanelItem>
                        <SPanelItem>
                            <SPanelItemText>Cache:</SPanelItemText>
                            <SDropdownList onChange={toggleCacheOnOff} value={useCache.toString()}>
                                <option value={true.toString()}>{`On`}</option>
                                <option value={false.toString()}>{`Off`}</option>
                            </SDropdownList>
                        </SPanelItem>
                        <SPanelItem>
                            <DebugInput />
                        </SPanelItem>
                    </SPanelWrap>
                </>
            )}
        </>
    )
}

export default memo(ConfigurationPanel)
