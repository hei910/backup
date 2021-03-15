import GameSuppliers from '@constants/gameSuppliers'
import useCopyRight from '@hooks/useCopyRight'
import useThirdPartyGame from '@hooks/useThirdPartyGame'

export default () => {
    const { startEnterGameFlow } = useThirdPartyGame(GameSuppliers.avia)
    const copyRight = useCopyRight()

    const onEnterClick = () => startEnterGameFlow()

    return {
        onEnterClick,
        copyRight,
    }
}
