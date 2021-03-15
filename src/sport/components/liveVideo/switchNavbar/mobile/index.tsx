import { ClockIcon1, LiveCloseIcon, LivePlayIcon2, LiveVenueIcon2 } from '@sport/components/icons'
import { ISwitchNavbarProps } from '@sport/components/liveVideo/switchNavbar'
import {
    toggleIsShownSrTabPopup,
    toggleIsShownVideoNavbar,
    updateLiveVideoNeededInto,
} from '@sport/hooks/useLiveSportApi/actions'
import React, { useMemo } from 'react'
import { CurrentVendorEnum } from '@services/sportLive/types'
import styled from 'styled-components/macro'

//styled-components
const SwitchLiveSport = styled.div<{ currentVendor: CurrentVendorEnum | null }>`
    position: absolute;
    /* height: ${(props) => (props.currentVendor === CurrentVendorEnum.SR ? 'calc(100% - 40px)' : '100%')}; */
    height: 100%;
    top: 0;
    right: 10px;
    z-index: 4;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-size: contain;
`

const SwitchLiveSportIcon = styled.div<{ boxShadow?: boolean; mt?: number }>`
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: ${(props) => (props.mt ? `${props.mt}px` : 0)};

    svg {
        width: 18px;
        height: 18px;

        path {
            fill: #fff;
        }
    }

    ${(props) =>
        props.boxShadow &&
        `
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
    `};
`

const SwitchButton: React.FC<ISwitchNavbarProps> = ({
    currentVendor,
    switchLiveSport,
    isShownToggleBar,
    isSrNavbarLoaded,
    isShownSrTabPopup,
}) => {
    const SwitchButton = useMemo(
        () => (currentVendor === CurrentVendorEnum.LIVE_STREAM ? LiveVenueIcon2 : LivePlayIcon2),
        [currentVendor],
    )

    if (isShownSrTabPopup) {
        return null
    }

    return (
        <SwitchLiveSport currentVendor={currentVendor}>
            <SwitchLiveSportIcon onClick={() => switchLiveSport(toggleIsShownVideoNavbar(true))}>
                <LiveCloseIcon />
            </SwitchLiveSportIcon>
            <div>
                {isShownToggleBar && (
                    <SwitchLiveSportIcon boxShadow onClick={() => switchLiveSport(updateLiveVideoNeededInto())}>
                        <SwitchButton />
                    </SwitchLiveSportIcon>
                )}
                {isSrNavbarLoaded && (
                    <SwitchLiveSportIcon
                        boxShadow
                        mt={15}
                        onClick={() => {
                            document.body?.classList.add('no-scrolling')
                            switchLiveSport(toggleIsShownSrTabPopup())
                        }}>
                        <ClockIcon1 />
                    </SwitchLiveSportIcon>
                )}
            </div>
            <SwitchLiveSportIcon />
        </SwitchLiveSport>
    )
}

export default SwitchButton
