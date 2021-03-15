import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

const EmptyBlock = styled.div`
    margin-bottom: 1px;
    padding: 14px;
`;

const LoadingPlaceholder: React.FC = () => {
    const { t } = useTranslation();

    return <EmptyBlock>{t('betPanel.loadingData')}</EmptyBlock>;
};

export default LoadingPlaceholder;
