import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import messageIcon from '@brand/assets/images/home/mobile/message-icon.svg'
import messageNotedIcon from '@brand/assets/images/home/mobile/message-icon-note.svg'
import bgImg from '@mixins/backgroundImg'
import { directToMessageBox } from '@utils/v1Functions'

const SMessageIcon = styled.div<{ hvUnreadMessage: boolean }>`
    ${(props) => bgImg(props.hvUnreadMessage ? messageNotedIcon : messageIcon)}
    position: absolute;
    right: 0;
    bottom: 0;
    width: 39px;
    height: 39px;
`

const MessageIcon: React.FC = () => {
    const { I, N, isLoggedIn } = useSelector((state) => state.user)

    const hvUnreadMessage = I + N > 0

    if (!isLoggedIn) {
        return null
    }

    return <SMessageIcon hvUnreadMessage={hvUnreadMessage} onClick={directToMessageBox} />
}

export default MessageIcon
