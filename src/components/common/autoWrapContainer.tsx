import styled from 'styled-components/macro'

interface AutoWrapContainerProps {
    spaceBetweenItem: number
    itemPerRow: number
    className?: string
}

export const AutoWrapItem = styled.div``

const Container = styled.div<{ spaceBetweenItem: number; itemPerRow: number }>`
    display: flex;
    flex-wrap: wrap;
    margin: -${(props) => props.spaceBetweenItem / 2}px;

    > ${AutoWrapItem} {
        width: calc(
            (100% - ${(props) => props.spaceBetweenItem * props.itemPerRow}px) / ${(props) => props.itemPerRow}
        );
        margin: ${(props) => props.spaceBetweenItem / 2}px;
    }
`

const AutoWrapContainer: React.FC<AutoWrapContainerProps> = ({ className, spaceBetweenItem, children, itemPerRow }) => {
    return (
        <Container className={className} spaceBetweenItem={spaceBetweenItem} itemPerRow={itemPerRow}>
            {children}
        </Container>
    )
}

export default AutoWrapContainer
