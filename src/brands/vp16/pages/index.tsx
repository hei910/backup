import { useEffect } from 'react'

import call from '@utils/api'

export default () => {
    useEffect(() => {
        call('get', '/crmSetting/setting')
    }, [])

    return <div>Brand VP16 Default Testing Page</div>
}
