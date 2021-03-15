import useTranslation from '@hooks/useTranslation'
import useInit from '../useInit'
import styled from 'styled-components/macro'
import GameSuppliers, { SeparatedWalletSuppliers, SEPARATED_WALLET_SUPPLIER } from '@constants/gameSuppliers'
import WalletAmountRow, { SeparateWalletGameRow } from './walletAmountRow'
import CollectButton from './collectButton'
import useTransferWallets from '../useTransferWallets'
import ConfirmTransferModal from '../confirmTransferModal'
import { useMemo } from 'react'
import Form from '@components/common/form'
import FormField from '@components/common/form/formField'
import TransferInput from './input'
import TransferDropdown from './dropdown'
import TransferPartialFailModal from '../transferPartialFailModal'
import Section from './section'

const TransferPageContainer = styled.div`
    margin: 24px auto 0;
    max-width: 960px;
`

const TitleBar = styled.div`
    ${(props) => props.theme.typography.Subtitle2}
    padding: 20px;
    margin-bottom: 24px;
    background-color: #eeeeee;
    color: #4b4b4b;
`

const SeparateLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: #cbcbcb;
    margin: 16px 0;
`

const FormRow = styled.div`
    display: flex;

    & + & {
        margin-top: 16px;
    }
`

const Label = styled.label`
    ${(props) => props.theme.typography.Body3}
    padding-top: 4px;
    color: #000000;
    flex: 0 0 102px;
`

const TransferButton = styled.button`
    width: 120px;
    padding: 8px 0;
    border: none;
    border-radius: 4px;
    background-color: #727272;
    color: #ffffff;
`

const ButtonContainer = styled.div`
    margin-top: 28px;
    text-align: right;
`

export default () => {
    const t = useTranslation()
    const {
        balances,
        refetchBalances,
        registerFormField,
        registerForm,
        registerInput,
        fromWalletOptions,
        toWalletOptions,
        onSubmit,
    } = useInit()

    const {
        onWalletCardClick,
        onConfirmClick,
        isConfirmTransferOpened,
        selectedSupplier,
        closeConfirmModal,
        closePartialFailModal,
        isPartialFailModalOpened,
        failSuppliers,
    } = useTransferWallets(refetchBalances)

    const totalAmount = useMemo(
        () =>
            Object.values(balances)
                .map((balanceStr) => +balanceStr)
                .reduce((sum, balance) => (sum += +balance), 0)
                .toFixed(2),
        [balances],
    )

    return (
        <TransferPageContainer>
            <TitleBar data-qa="txtTitle">{t('transfer.title')}</TitleBar>
            <div>
                <Section title={t('transfer.remainAmount')}>
                    {SEPARATED_WALLET_SUPPLIER.map((supplier) => (
                        <SeparateWalletGameRow
                            key={`separateWalletGameRow-${supplier}`}
                            supplier={supplier as SeparatedWalletSuppliers}
                            balance={balances[supplier as SeparatedWalletSuppliers]}
                            onBtnClick={onWalletCardClick}
                        />
                    ))}
                    <SeparateLine />
                    <WalletAmountRow title={`${t('transfer.totalAmount')}：`} balance={totalAmount}>
                        <CollectButton
                            collectType="all"
                            onClick={() => onWalletCardClick(GameSuppliers.sport)}
                            data-qa="btnCollectToSportWallet"
                        />
                    </WalletAmountRow>
                </Section>
                <Section title={t('transfer.selectWallet')}>
                    <Form onSubmit={onSubmit} {...registerForm()}>
                        <FormRow>
                            <Label>{t('transfer.fromWallet')}：</Label>
                            <FormField {...registerFormField('fromWallet')}>
                                <TransferDropdown
                                    {...registerInput('fromWallet')}
                                    options={fromWalletOptions}
                                    data-qa="selectFrom"
                                />
                            </FormField>
                        </FormRow>
                        <FormRow>
                            <Label>{t('transfer.toWallet')}：</Label>
                            <FormField {...registerFormField('toWallet')}>
                                <TransferDropdown
                                    {...registerInput('toWallet')}
                                    options={toWalletOptions}
                                    data-qa="selectTo"
                                />
                            </FormField>
                        </FormRow>
                        <FormRow>
                            <Label>{t('transfer.amount')}：</Label>
                            <FormField {...registerFormField('amount')}>
                                <TransferInput
                                    {...registerInput('amount')}
                                    data-qa="inputTransferAmount"
                                    placeholder={t('transfer.amountPlaceholder')}
                                />
                            </FormField>
                        </FormRow>
                        <ButtonContainer>
                            <TransferButton type="submit" data-qa="btnTransferSubmit">
                                {t('general.components.button.transfer')}
                            </TransferButton>
                        </ButtonContainer>
                    </Form>
                </Section>
            </div>
            <ConfirmTransferModal
                supplier={selectedSupplier as GameSuppliers}
                isOpen={isConfirmTransferOpened}
                onCancel={closeConfirmModal}
                onConfirm={onConfirmClick}
            />
            <TransferPartialFailModal
                isOpen={isPartialFailModalOpened}
                closeModal={closePartialFailModal}
                failList={failSuppliers}
            />
        </TransferPageContainer>
    )
}
