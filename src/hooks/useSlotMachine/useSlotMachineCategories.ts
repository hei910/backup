import SlotFilters from '@constants/slotFilters'
import { useMemo } from 'react'
import useTranslation from '@hooks/useTranslation'

export default () => {
    const t = useTranslation()

    const categories = useMemo(
        () => [
            {
                label: t('general.suppliers.slotmachine.filter.all'),
                value: SlotFilters.all,
                dataQa: 'btnFilterAll',
            },
            {
                label: t('general.suppliers.slotmachine.filter.rank'),
                value: SlotFilters.rank,
                dataQa: 'btnFilterHighRated',
            },
            {
                label: t('general.suppliers.slotmachine.filter.popularity'),
                value: SlotFilters.popularity,
                dataQa: 'btnFilterPopular',
            },
            {
                label: t('general.suppliers.slotmachine.filter.highChance'),
                value: SlotFilters.highChance,
                dataQa: 'btnFilterMostPeopleWin',
            },
            {
                label: t('general.suppliers.slotmachine.filter.highReturn'),
                value: SlotFilters.highReturn,
                dataQa: 'btnFilterHighReward',
            },
        ],
        [t],
    )
    const mgCategories = useMemo(
        () => [
            {
                label: t('general.suppliers.slotmachine.filter.all'),
                value: SlotFilters.all,
            },
            {
                label: t('general.suppliers.slotmachine.filter.type2'),
                value: SlotFilters.type2,
            },
            {
                label: t('general.suppliers.slotmachine.filter.type3'),
                value: SlotFilters.type3,
            },
            {
                label: t('general.suppliers.slotmachine.filter.type4'),
                value: SlotFilters.type4,
            },
        ],
        [t],
    )
    const dtCategories = useMemo(
        () => [
            {
                label: t('general.suppliers.slotmachine.filter.all'),
                value: SlotFilters.all,
            },
            {
                label: t('general.suppliers.slotmachine.filter.anime'),
                value: SlotFilters.anime,
            },
            {
                label: t('general.suppliers.slotmachine.filter.chinese'),
                value: SlotFilters.chinese,
            },
            {
                label: t('general.suppliers.slotmachine.filter.reality'),
                value: SlotFilters.reality,
            },
            {
                label: t('general.suppliers.slotmachine.filter.western'),
                value: SlotFilters.western,
            },
        ],
        [t],
    )

    return {
        categories,
        mgCategories,
        dtCategories,
    }
}
