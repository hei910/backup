import { useCallback } from 'react'
import { IPagination, IPaginationButton } from '.'

export const usePaginationButton = ({ onChange, index, currentPage, totalPage }: IPaginationButton) => {
    const onButtonClick = useCallback(() => {
        onChange(index + 1)
    }, [index, onChange])
    let showButton
    let isPrevButton
    let isNextButton

    if (totalPage <= 9) {
        showButton = true
    } else {
        if (index + 1 === 1 || index + 1 === totalPage || index + 1 === totalPage - 1) {
            showButton = true
        }

        // currentPage <= 4, show first 7
        if (currentPage <= 4) {
            if (index + 1 <= 7) {
                showButton = true
            }
            if (index + 1 === 8) {
                isNextButton = true
            }
        }

        // 4 < currentPage < totalPage - 4, show currentPage +- 2
        if (currentPage > 4 && currentPage < totalPage - 4) {
            if (index + 1 >= currentPage - 2 && index + 1 <= currentPage + 2) {
                showButton = true
            }
            if (index + 1 === currentPage - 3) {
                isPrevButton = true
            }
            if (index + 1 === currentPage + 3) {
                isNextButton = true
            }
        }

        // currentPage >= totalPage - 4, show last 7
        if (currentPage >= totalPage - 4) {
            if (index + 1 >= totalPage - 7) {
                showButton = true
            }
            if (index + 1 === totalPage - 8) {
                isPrevButton = true
            }
        }
    }

    return {
        showButton,
        isPrevButton,
        isNextButton,
        onButtonClick,
    }
}

export const usePagination = ({ currentPage, totalPage, onChange }: IPagination) => {
    const nextPage = useCallback(() => {
        if (currentPage + 1 <= totalPage) {
            onChange(currentPage + 1)
        }
    }, [currentPage, onChange, totalPage])

    const prevPage = useCallback(() => {
        if (currentPage - 1 > 0) {
            onChange(currentPage - 1)
        }
    }, [currentPage, onChange])

    return {
        nextPage,
        prevPage,
    }
}
