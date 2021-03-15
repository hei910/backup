export const getImgSrc = (imgUrl: string) => {
    const startWithSlash = imgUrl.startsWith('/')

    let newImgUrl = imgUrl

    if (startWithSlash) {
        newImgUrl = imgUrl.replace('/', '')
    }

    return `${process.env.CDN_DOMAIN}/${newImgUrl}`
}
