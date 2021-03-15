import styled from 'styled-components/macro'

export default styled.div`
    padding-top: 20px;
    min-height: 76vh;

    h3 {
        margin: 0;
        color: #000000;
        ${(props) => props.theme.typography.Subtitle3}
    }

    h4 {
        color: #000000;
        margin-bottom: 12px;
        padding-left: 10px;
        border-left: 4px solid ${(props) => props.theme.colors.component.common.title.leftBorder};
        ${(props) => props.theme.typography.Subtitle3}
    }

    h5 {
        margin-top: 18px;
        margin-bottom: 10px;
        ${(props) => props.theme.typography.Subtitle4}
    }

    p {
        ${(props) => props.theme.typography.Body5}

        &.sub {
            margin: 0;
            padding-left: 15px;
        }
    }

    ol {
        padding-left: 12px;
        ${(props) => props.theme.typography.Body5}

        [type='a'] {
            padding-top: 7px;

            > li {
                padding: 0;
            }
        }

        :not([type='a']) {
            > li {
                & + & {
                    padding-top: 18px;
                }
            }
        }
    }

    table {
        width: 100%;
        border: 1px solid #a8a8a8;
        border-collapse: collapse;
        ${(props) => props.theme.typography.Body5}

        > tbody {
            > tr {
                > td {
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #a8a8a8;
                }

                &:first-child {
                    > td {
                        background-color: #fff2e2;
                    }
                }
            }
        }

        &.large {
            > tbody {
                > tr {
                    > td {
                        padding: 0;
                        text-align: center;
                        border: 1px solid #a8a8a8;
                        font-size: 10px;

                        > p {
                            margin: 0;
                        }

                        &:first-child {
                            font-size: 11px;
                            font-weight: bold;
                            background-color: #fff2e2;
                        }
                    }

                    &:first-child {
                        > td {
                            font-size: 11px;
                            font-weight: bold;
                            background-color: #fff2e2;
                            padding: 7px;
                        }
                    }
                }
            }
        }
    }
`
