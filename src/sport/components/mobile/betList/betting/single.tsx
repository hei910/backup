import SingleItem from '@sport/components/mobile/betList/betListItem/single'
import React from 'react'

interface SingleItemsProps {
    serializedCombinedIDList: string[]
}

const SingleItems: React.FC<SingleItemsProps> = ({ serializedCombinedIDList }) => {
    const items = serializedCombinedIDList.map((serializedCombinedID) => {
        return (
            <SingleItem
                serializedCombinedID={serializedCombinedID}
                key={`betlist-mobile-item-${serializedCombinedID}`}
            />
        )
    })

    return <>{items}</>
}

export default React.memo(SingleItems)
