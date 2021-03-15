import { MergedData, RawData } from '@services/sportData/types'

const matchesDataMerger = (rawData: RawData): MergedData => {
    return {
        data: rawData.base,
        dataTime: rawData.dataTime,
        pageData: rawData.pageData,
        lastUpdateTime: rawData.lastUpdateTime,
    }
}

export default matchesDataMerger
