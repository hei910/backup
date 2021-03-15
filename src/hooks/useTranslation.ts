import { useCallback, useContext } from 'react'
import { LocalesContext } from '@app/localesProvider'

type Replacements = Record<string, string | number>

const throwInvalidKeyError = (key: String) => {
    throw new Error(`[useTranslation] The translate key is not valid: ${key}`)
}

export default () => {
    const { localesMessage, isReady } = useContext(LocalesContext)

    return useCallback(
        (key: string, replacements?: Replacements): string => {
            const subKeys = key.split('.')
            const page = subKeys[0].toLowerCase()
            let targetMessage: any = localesMessage

            try {
                for (let i = 0; i < subKeys.length; i++) {
                    if (typeof targetMessage === 'string') {
                        isReady && throwInvalidKeyError(key)
                    }

                    targetMessage = targetMessage[i === 0 ? page : subKeys[i]]

                    if (!targetMessage) {
                        isReady && throwInvalidKeyError(key)
                    }
                }

                if (replacements) {
                    Object.keys(replacements).forEach((replaceKey) => {
                        targetMessage = targetMessage.replace(
                            new RegExp(`{{${replaceKey}}}`, 'g'),
                            replacements[replaceKey],
                        )
                    })
                }

                return targetMessage
            } catch (err) {
                isReady && console.warn(err)
                return key
            }
        },
        [localesMessage, isReady],
    )
}
