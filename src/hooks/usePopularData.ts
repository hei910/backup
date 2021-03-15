import Axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { IPopularData, sIdType } from '@type'
import { getOddsDomain } from '@sport/util/general'

const usePopularData = ({ sId }: { sId: sIdType }) => {
    const [data, setData] = useState<null | IPopularData[]>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const interval = useRef<any>(null)

    useEffect(() => {
        const fetchPopularData = async (isLoadingSet: boolean) => {
            try {
                if (isLoadingSet) {
                    setLoading(true)
                }

                const oddsDomain = await getOddsDomain()

                const { data } = await Axios.get<{ success: boolean; data: IPopularData[] }>(
                    `${oddsDomain}/getPopularPage/pageSize/20/sId/${sId}/source/a`,
                )

                if (data.success) {
                    setData(data.data)
                } else {
                    throw new Error('success is false')
                }
            } catch (error) {
                setError(true)
            }

            setLoading(false)
        }

        fetchPopularData(true)

        interval.current = setInterval(() => {
            fetchPopularData(false)
        }, 10000)

        return () => {
            if (interval.current) {
                clearInterval(interval.current)
                interval.current = null
            }
        }
    }, [sId])

    return { data, loading, error }
}

export default usePopularData
