import { useContext, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import { createPortal } from 'react-dom'
import { useDispatch } from '@redux'
import useScrollControl from '@hooks/useScrollControl'
import { setLayoutVisibility } from '@services/layout/action'
import { GameContext } from '@app/gameProvider'

// initial iframe color before iframe src is loaded (background-color)
const SGameContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: ${(props) => props.theme.vars.gameIframeZIndex};
    background-color: #000000;
`

const GameIframe = styled.iframe`
    height: 100%;
    width: 100%;
`

const rootDiv = document.getElementById('root')

const IFrameGameContainer: React.FC<{ className?: string }> = ({ children, className }) => {
    const dispatch = useDispatch()

    const { isGameOpened, gameUrl, closeGame } = useContext(GameContext)

    // const [showHeaderBar, setShowHeaderBar] = useState(!!defaultShowHeaderBar)

    // useEffect(() => {
    //     if (!floatingHeaderBar && !defaultShowHeaderBar) {
    //         console.warn('[GameWrapper] the app header may appears on the top of game container')
    //     }

    //     if (showFloatingButton && !floatingHeaderBar) {
    //         console.warn(
    //             '[GameWrapper] Player can toggle the header bar & the app header may appears on the top of game container',
    //         )
    //     }
    // }, [floatingHeaderBar, defaultShowHeaderBar, showFloatingButton])

    // useEffect(() => {
    //     if (!isGameOpened && !defaultShowHeaderBar) {
    //         // reset state when exit game
    //         setShowHeaderBar(false)
    //     } else if (isGameOpened && defaultShowHeaderBar) {
    //         // if reset state after exit game and enter again, need to show it if default is true
    //         setShowHeaderBar(true)
    //         if (!showInIframe && isMobile) {
    //             window.location.href = gameUrl
    //         }
    //     }
    // }, [isGameOpened, defaultShowHeaderBar, showInIframe, gameUrl])

    // const toggleHeaderBar = useCallback(() => {
    //     setShowHeaderBar(!showHeaderBar)
    // }, [showHeaderBar])

    const ContainerId = useMemo(() => `game-container-${gameUrl}`, [gameUrl])

    const { enableScrolling, disableScrolling } = useScrollControl(ContainerId)

    useEffect(() => {
        if (isGameOpened) {
            disableScrolling()
            dispatch(
                setLayoutVisibility({
                    header: false,
                }),
            )

            // for 3rd redirect to /m20 and close it in index.html
            const appWindow = window as any
            appWindow.onCloseGame = closeGame

            return () => {
                enableScrolling()
                dispatch(
                    setLayoutVisibility({
                        header: true,
                    }),
                )
                appWindow.onCloseGame = undefined
            }
        }
    }, [dispatch, enableScrolling, disableScrolling, isGameOpened, closeGame])

    if (!isGameOpened) {
        return null
    }

    return rootDiv
        ? createPortal(
            <SGameContainer className={className}>
                {children}
                <GameIframe
                    src={gameUrl}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation"
                />
            </SGameContainer>,
            rootDiv,
        )
        : null
}

export default IFrameGameContainer
