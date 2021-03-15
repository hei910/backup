import { useEffect } from 'react'

import call from '@utils/api'

export default () => {
    useEffect(() => {
        call('get', '/crmSetting/setting')
    }, [])

    return <div>Default Home Page</div>
}
