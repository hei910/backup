interface ContrastText {
    secondary: string
    primary: string
    tertiary: string
    background: string
}

export interface ColorPalette {
    accent: string
    background: string
    primary: string
    secondary: string
    tertiary: string
    active: string
    contrastText: ContrastText
    info: string
    success: string
    error: string
}

export interface Theme {
    colors: Colors
    palette: ColorPalette
    boxShadow: string
}

export interface Colors extends Omit<ColorPalette, 'contrastText'> {
    accent1: string
    text: Text
    button: Button
    table: Table
    scrollbar: Scrollbar
    header: Header
    subHeader: SubHeader
    betMatchHeader: BetMatchHeader
    searchBar: SearchBar
    betList: BetList
    backToTopButton: BackToTopButton
    footer: Footer
    nav: Nav
    topPage: TopPage
}

interface Text {
    header: string
    title: string
    active: Active
    secondary: string
    primary: string
    tertiary: string
    background: string
    hover: string
    span: string
}

interface Active {
    primary: string
    secondary: string
}

interface Button {
    background: string
    background2: string
    hover: string
    text: string
    hoverText: string
    activeText: string
    activeBackground: string
}

interface Table {
    extendsHeader: ExtendsHeader
    header: TableHeader
    subHeader: TableSubHeader
    column: TableColumn
    title: TableTitle
    detail: TableDetail
}
interface TableDetail {
    header: TableDetailHeader
    subHeader: TableSubHeader
    column: TableDetailColumn
    higherRate: HigherRate
    extended: TableDetailExtended
}
interface TableDetailExtended {
    background: string
    hover: string
}

interface TableDetailHeader {
    background: string
    border: string
    text: string
    activeText: string
}
interface TableDetailColumn {
    border: string
    background: string
}

interface ExtendsHeader {
    border: string
    background: string
    hover: string
}

interface TableHeader {
    background: string
}

interface TableSubHeader {
    background: string
    border: string
    title: string
}

interface TableColumn {
    border: string
    background: string
    secondBackground: string
    ballColor: string
    hover: string
    icon: string
    versusText: string
    neutralColor: string
}

interface TableTitle {
    background: string
    marketBackground: string
    ctidText: string
}

interface Scrollbar {
    foreground: string
    background: string
}

interface Header {
    background: string
    secondBackground: string
    active: string
    tertiary: string
    secondary: string
    primary: string
}

interface SubHeader {
    border: string
}

interface BetMatchHeader {
    background: string
    border: string
}

interface SearchBar {
    background: string
    buttonBackgroud: string
    buttonColor: string
    text: string
}

interface BetList {
    background: string
    empty: string
    border: string
    betTabButton: BetTabButton
    amount: string
    total: string
    submitButton: SubmitButton
    cencalButton: CencalButton
    stakeIncrementButton: StakeIncrementButton
    content: Content
    header: BetListHeader
    updateBackground: string
}

interface BetTabButton {
    background: string
    activeBackground: string
    hoverBackground: string
    text: string
    activeText: string
    hoverText: string
}

interface SubmitButton {
    background: string
    text: string
}

interface CencalButton {
    background: string
    text: string
}

interface StakeIncrementButton {
    background: string
    hoverBackground: string
    text: string
    hoverText: string
}

interface Content {
    detailTeam: string
    border: string
}

interface BetListHeader {
    infoIcon: {
        background: string
        hoverBackground: string
        text: string
        hoverText: string
    }
}

interface BackToTopButton {
    background: string
    icon: string
}

interface Footer {
    background: string
    border: string
}

interface HigherRate {
    background: string
    hover: string
    headerText: string
    boxShadow: string
}

interface Nav {
    background: string
    border: string
    menu: Menu
}

interface TopPage {
    boxShadow: string
    mainHeader: string
}

interface Menu {
    background: MenuBackground
    circle: MenuCircle
    active: string
    activeText: string
    activeMarket: string
}

interface MenuBackground {
    normal: string
    active: string
}

interface MenuCircle {
    background: string
}
