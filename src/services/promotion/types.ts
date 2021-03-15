export interface PromotionArticle {
    bannerUrl: string
    category: string
    content: string
    contentPath: string
    content_html: string
    description: string
    desktopHomepageUrl: string
    fromDate: string
    imgUrl: string
    isShowInHomePage: true
    mobileHomepageUrl: string
    mobileUrl: string
    orderId: number
    publishDate: string
    rowId: number
    title: string
    toDate: string
}

export interface PromotionBanner {
    articleId: number
    bannerUrl: string
    createdBy: string
    createdDt: string
    description: string
    eventId: string
    isActive: boolean
    isDeleted: boolean
    lastModifiedBy: string
    lastModifiedDt: string
    link: string
    postDate: string
    rank: number
    rowId: number
    title: string
}
