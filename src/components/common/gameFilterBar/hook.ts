import { useCallback, useEffect, useState } from 'react'
import { ICategory } from '.'

interface IProps {
    initialValue?: ICategory
    categories: ICategory[]
    onChange: (option: ICategory) => void
}

export default ({ initialValue, categories, onChange }: IProps) => {
    const [selected, setSelected] = useState(categories[0])

    useEffect(() => {
        if (initialValue) {
            setSelected(initialValue)
        }
    }, [initialValue])

    const onCategoryClick = useCallback(
        (category: ICategory) => {
            onChange(category)
            setSelected(category)
        },
        [onChange],
    )

    const onPrevClick = useCallback(() => {
        const prevIndex = categories.indexOf(selected) - 1
        const index = prevIndex < 0 ? categories.length - 1 : prevIndex
        onChange(categories[index])
        setSelected(categories[index])
    }, [categories, onChange, selected])

    const onNextClick = useCallback(() => {
        const nextIndex = categories.indexOf(selected) + 1
        const index = nextIndex > categories.length - 1 ? 0 : nextIndex
        onChange(categories[index])
        setSelected(categories[index])
    }, [categories, onChange, selected])

    return {
        selected,
        onCategoryClick,
        onPrevClick,
        onNextClick,
    }
}
