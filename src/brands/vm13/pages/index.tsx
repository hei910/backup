import { useEffect } from 'react'

import call from '@utils/api'

export default () => {
    useEffect(() => {
        call('get', '/crmSetting/setting')
    }, [])

    return <div>Brand Vf6 Default Testing Page</div>
}
