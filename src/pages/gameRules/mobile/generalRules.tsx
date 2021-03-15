import { useState, useEffect } from 'react'
import { useSelector } from '@redux'

interface IGeneralRules {
    category: string
}

const GeneralRules = ({ category }: IGeneralRules) => {
    const locale = useSelector((state) => state.app.locale)
    const [htmlContent, setHtmlContent] = useState('')

    useEffect(() => {
        const getHtmlContent = async () => {
            const content = await import(`@html/${locale}/${category}.html`)
            setHtmlContent(content.default)
        }
        getHtmlContent()
    }, [category, locale])

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default GeneralRules
