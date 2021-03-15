import React, { useEffect, useState } from 'react'
import { useSelector } from '@sport/stores'
import styled from 'styled-components/macro'

interface BetRecordsPageNumberIndicatorProps {
    fetchRecord: (nextPage: number) => void
}

const PageNumberIndicatorContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5px;
`

const PageNumberWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const PageNumber = styled.div<{ isCurrent: boolean } & React.HTMLAttributes<HTMLDivElement>>`
    margin: 0px 2px;
    border: 3px solid ${(props) => (props.isCurrent ? '#ff9200' : 'transparent')};
    border-radius: 13px;
    box-sizing: content-box;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isCurrent ? '#ff9200' : 'transparent')};
    color: ${(props) => (props.isCurrent ? '#fff' : '#000')};
    font-weight: 600;
`

const PageNumberNavigateButton = styled.div`
    margin: 0px 2px;
    border: 3px solid transparent;
    border-radius: 13px;
    box-sizing: content-box;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PageNumberPreviousPageArrow = styled.span<{ isActive: boolean } & React.HTMLAttributes<HTMLSpanElement>>`
    width: 8px;
    height: 8px;
    border-left: 2px solid ${(props) => (props.isActive ? '#404040' : '#d2cfcf')};
    border-bottom: 2px solid ${(props) => (props.isActive ? '#404040' : '#d2cfcf')};
    position: relative;
    transform: rotate(45deg);
`

const PageNumberNextPageArrow = styled.span<{ isActive: boolean } & React.HTMLAttributes<HTMLSpanElement>>`
    width: 8px;
    height: 8px;
    border-right: 2px solid ${(props) => (props.isActive ? '#404040' : '#d2cfcf')};
    border-top: 2px solid ${(props) => (props.isActive ? '#404040' : '#d2cfcf')};
    position: relative;
    transform: rotate(45deg);
`

const PageNumberIndicator: React.FC<BetRecordsPageNumberIndicatorProps> = ({ fetchRecord }) => {
    const getPage = useSelector((state) => state.sportBet.records.paging.settled?.currentPage)
    const currentPage = getPage ? getPage + 1 : 1
    const getTotalPages = useSelector((state) => state.sportBet.records.paging.settled?.totolPages)
    const totalPages = getTotalPages ? getTotalPages : 1
    const [pagesArr, setPagesArr] = useState<(number | '…')[]>([])

    useEffect(() => {
        const tempArr: (number | '…')[] = [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages]
        if (currentPage === 1) tempArr.splice(0, 3)
        if (currentPage === 2) tempArr.splice(0, 2)
        if (currentPage === 3) tempArr.splice(1, 1)
        if (currentPage === 4) tempArr.splice(1, 1, 2)
        if (currentPage === totalPages - 3) tempArr.splice(-2, 1, totalPages - 1)
        if (currentPage === totalPages - 2) tempArr.splice(-2, 1)
        if (currentPage === totalPages - 1) tempArr.splice(-2, 2)
        if (currentPage === totalPages) tempArr.splice(-3, 3)
        setPagesArr(tempArr)
    }, [currentPage, totalPages])

    function changePage(page: number | '…'): void {
        if (page === '…' || page === currentPage || page < 1 || page > totalPages) return
        fetchRecord(page)
        window.scrollTo(0, 0)
    }

    return (
        <>
            {getPage !== undefined ? (
                <PageNumberIndicatorContainer>
                    <PageNumberNavigateButton onClick={() => changePage(currentPage - 1)}>
                        <PageNumberPreviousPageArrow isActive={currentPage > 1} />
                    </PageNumberNavigateButton>
                    <PageNumberWrapper>
                        {pagesArr.map((page, i) => {
                            return (
                                <PageNumber
                                    key={`bet-records-page-number-${page}-index-${i}`}
                                    isCurrent={page === currentPage}
                                    onClick={() => changePage(page)}>
                                    {page}
                                </PageNumber>
                            )
                        })}
                    </PageNumberWrapper>
                    <PageNumberNavigateButton onClick={() => changePage(currentPage + 1)}>
                        <PageNumberNextPageArrow isActive={currentPage < totalPages} />
                    </PageNumberNavigateButton>
                </PageNumberIndicatorContainer>
            ) : (
                <></>
            )}
        </>
    )
}

export default PageNumberIndicator
