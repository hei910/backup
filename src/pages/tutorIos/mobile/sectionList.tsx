import styled from 'styled-components/macro'

import hr from '@images/tutorIos/mobile/hr.svg'

interface ISectionListProps {
    type: string
    data: Array<ISectionProps>
}

export interface ISectionProps {
    title: string
    index: number
    image: string
    type?: string
}

const StyledSectionList = styled.ol`
    margin: 0;
    padding: 0;
`

const Divider = styled.img`
    width: 100%;
`

const Title = styled.li`
    padding: 8px 0;
    counter-increment: steps-num;
    list-style-type: none;
    margin: 15px 30px 15px 45px;
    padding-left: 37px;
    background-color: ${(props) => props.theme.colors.page.mobile.tutorIos.section.bgColor};
    color: ${(props) => props.theme.colors.page.mobile.tutorIos.section.color};
    font-size: 15px;
    position: relative;

    :before {
        content: counter(steps-num);
        background-color: ${(props) => props.theme.colors.page.mobile.tutorIos.section.stepBgColor};
        border-radius: 50%;
        color: ${(props) => props.theme.colors.page.mobile.tutorIos.section.stepColor};
        display: block;
        font-size: 20px;
        font-weight: bold;
        width: 46px;
        height: 46px;
        position: absolute;
        top: 50%;
        left: -23px;
        margin-top: -23px;
        line-height: 2.2;
        text-align: center;
    }
`

const Image = styled.img`
    width: 56%;
    margin: 0 auto;
    display: block;
`

const Section: React.FC<ISectionProps> = ({ title, index, image, type }) => {
    return (
        <>
            {type === 'individual' && <Divider src={hr} />}
            <Title data-qa={`txt${type}DLStep${index + 1}`}>{title}</Title>
            <Image data-qa={`img${type}DLStep${index + 1}`} src={image} />
        </>
    )
}

const SectionList: React.FC<ISectionListProps> = ({ type, data }) => {
    return (
        <StyledSectionList>
            {data.map((d, index) => (
                <Section
                    key={`Section${index}`}
                    data-qa={type}
                    title={d.title}
                    image={d.image}
                    type={type}
                    index={index}
                />
            ))}
        </StyledSectionList>
    )
}

export default SectionList
