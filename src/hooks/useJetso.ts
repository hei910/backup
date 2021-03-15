import { useEffect, useState } from 'react'
import { useDispatch } from '@redux'
import { PromotionArticle } from '@services/promotion/types'
import { getPromotionArticles } from '@services/promotion/api'

export default (isShowInHomePage?: boolean) => {
    const dispatch = useDispatch()
    const [articles, setArticles] = useState<PromotionArticle[]>([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const init = async () => {
            setArticles(await getPromotionArticles(!!isShowInHomePage))
            setIsReady(true)
        }
        init()
    }, [dispatch, isShowInHomePage])

    return {
        articles,
        isReady,
    }
}
