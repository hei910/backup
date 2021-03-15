// import axios from 'axios'
import { PromotionArticle, PromotionBanner } from './types'
import call from '@utils/api'

export const getPromotionArticles = (isShowInHomePage: boolean) =>
    call<PromotionArticle[]>('GET', `/promotion/getArticleList?isHomePage=${isShowInHomePage}`)

export const getPromotionBannerList = () => call<PromotionBanner[]>('GET', '/info/getBannerList')
