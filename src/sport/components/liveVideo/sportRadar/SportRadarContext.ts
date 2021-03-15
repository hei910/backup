import { SportTypeEnum } from '@services/sportLive/types'

export interface SportRadarState {
    srCssSelector(): string
    lmtType(): string
    navBarWrapper(): string
    dataSectionWrapper(): Element
    navBarTabCont(): Element
    momentumWrapperNode(): Element
    hiddenMomentumWrapperNode(): Element
    navBarTabSwitch(): string
    tvSectionWrapper(): Element
    navBarTabSwitchActive(index?: number): string
}

export default class SportRadarContext implements SportRadarState {
    context: SportRadarState

    constructor() {
        this.context = new SportRadarLmtCustom()
    }

    setContext(sportType: SportTypeEnum) {
        switch (sportType) {
            case SportTypeEnum.Football:
            case SportTypeEnum.Basketball:
                this.context = new SportRadarLmtCustom()
                break
            case SportTypeEnum.Tennis:
            case SportTypeEnum.Baseball:
                this.context = new SportRadarLmtPlus()
                break
            default:
                this.context = new SportRadarLmtCustom()
                break
        }
    }

    srCssSelector() {
        return this.context.srCssSelector()
    }

    lmtType() {
        return this.context.lmtType()
    }

    navBarWrapper() {
        return this.context.navBarWrapper()
    }

    dataSectionWrapper() {
        return this.context.dataSectionWrapper()
    }

    navBarTabCont() {
        return this.context.navBarTabCont()
    }

    navBarTabSwitch() {
        return this.context.navBarTabSwitch()
    }

    tvSectionWrapper() {
        return this.context.tvSectionWrapper()
    }

    momentumWrapperNode() {
        return this.context.momentumWrapperNode()
    }

    hiddenMomentumWrapperNode() {
        return this.context.hiddenMomentumWrapperNode()
    }

    navBarTabSwitchActive(index?: number) {
        return this.context.navBarTabSwitchActive(index)
    }
}

class SportRadarLmtCustom implements SportRadarState {
    srCssSelector() {
        return 'sr-widget-custom'
    }

    lmtType() {
        return 'match.lmtCustom'
    }

    navBarWrapper() {
        return 'sr-tabbedanimnav__wrapper'
    }

    dataSectionWrapper() {
        const target = document.querySelectorAll('.sr-soccer-lmtcustom__cmp-wrap')[0]
        return target
    }

    navBarTabCont() {
        const target = document.querySelectorAll('.sr-soccer-lmtcustom__tab-cont')[0]
        return target
    }

    tvSectionWrapper() {
        return document.querySelectorAll('.sr-soccer-lmtcustom__lmt-wrap')[0]
    }

    momentumWrapperNode() {
        return document.querySelector('.sr-soccer-lmtcustom__momentum-wrap')!
    }

    hiddenMomentumWrapperNode() {
        return document.querySelector('.sr-soccer-lmtcustom__momentum-wrap.hidden')!
    }

    navBarTabSwitch() {
        return '.sr-tabbedanimnav__switch'
    }

    navBarTabSwitchActive() {
        return 'sr-tabbedanimnav__switch srt-base-1-primary-7'
    }
}

class SportRadarLmtPlus implements SportRadarState {
    srCssSelector() {
        return 'sr-widget-plus'
    }

    lmtType() {
        return 'match.lmtPlus'
    }

    navBarWrapper() {
        return 'sr-lmt-plus-tabs__wrapper-inner srt-base-1'
    }

    tvSectionWrapper() {
        const target = document.querySelectorAll('.sr-lmt-plus__comp-size')[0]
        return target
    }

    dataSectionWrapper() {
        const target = document.querySelectorAll('.srm-notLmt .srm-topdown')[0]
        return target
    }

    navBarTabCont() {
        const target = document.querySelectorAll('.sr-lmt-plus__comp-size')[1]
        return target
    }

    momentumWrapperNode() {
        const target = document.querySelectorAll('.sr-lmt-plus__segment.srm-momentum')[0]
        return target
    }

    hiddenMomentumWrapperNode() {
        const target = document.querySelectorAll('.sr-lmt-plus__segment.srm-momentum.hidden')[0]
        return target
    }

    navBarTabSwitch() {
        return `.sr-lmt-plus-tabs__tab.srm-tab-btm`
    }

    navBarTabSwitchActive(index: number) {
        return `sr-lmt-plus-tabs__tab srm-has-5 srm-tab-btm srm-tab-${index + 1} nav-tab-is-active`
    }
}
