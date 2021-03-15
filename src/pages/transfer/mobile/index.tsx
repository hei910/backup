import styled from 'styled-components/macro'
import AppBar from '@components/mobile/appbar'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import useTranslation from '@hooks/useTranslation'
import TransferWallets from './transferWallets'
import useInit from '../useInit'
import ToIcon from '@brand/assets/images/transfer/mobile/to.png'
import bgImg from '@mixins/backgroundImg'
import { RoundedButton } from '@components/common/button'
import Form from '@components/common/form'
import FormField from '@components/common/form/formField'
import WalletDropdown from './dropdown'
import AmountInput from './input'

const TransferPageContainer = styled(PageContainer)`
    padding-bottom: 0;
`

const TransferWalletSection = styled.div`
    margin-top: ${(props) => props.theme.vars.containerPadding};
`

const TransferFormSection = styled(FullWidthContainer)`
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    padding: 24px ${(props) => props.theme.vars.containerPadding} 36px;
`

const WalletDropdownContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`

const Label = styled.div`
    ${(props) => props.theme.typography.Body3}
    color: #373737;
    margin-bottom: 4px;
`

const InputContainer = styled.div`
    margin-bottom: 48px;
`

const ToIconDiv = styled.div`
    ${bgImg(ToIcon)}
    flex: 0 0 22px;
    height: 22px;
    margin: 18px 12px 0;
`

export default () => {
    const t = useTranslation()
    const {
        balances,
        refetchBalances,
        registerFormField,
        registerForm,
        registerInput,
        onMaxBtnClick,
        fromWalletOptions,
        toWalletOptions,
        onSubmit,
    } = useInit()

    return (
        <TransferPageContainer>
            <AppBar title={t('transfer.title')} isBackToHome />
            <TransferWalletSection>
                <TransferWallets balances={balances} refetchBalances={refetchBalances} />
            </TransferWalletSection>
            <TransferFormSection>
                <Form {...registerForm()} onSubmit={onSubmit}>
                    <Label>{t('transfer.selectWallet')}：</Label>
                    <WalletDropdownContainer>
                        <FormField {...registerFormField('fromWallet')}>
                            <WalletDropdown
                                {...registerInput('fromWallet')}
                                options={fromWalletOptions}
                                title={t('transfer.fromWallet')}
                                data-qa="selectFrom"
                            />
                        </FormField>
                        <ToIconDiv />
                        <FormField {...registerFormField('toWallet')}>
                            <WalletDropdown
                                {...registerInput('toWallet')}
                                options={toWalletOptions}
                                title={t('transfer.toWallet')}
                                data-qa="selectTo"
                            />
                        </FormField>
                    </WalletDropdownContainer>
                    <InputContainer>
                        <Label>{t('transfer.amount')}：</Label>
                        <FormField {...registerFormField('amount')}>
                            <AmountInput
                                {...registerInput('amount')}
                                placeholder={t('transfer.amountPlaceholder')}
                                onMaxBtnClick={onMaxBtnClick}
                            />
                        </FormField>
                    </InputContainer>
                    <RoundedButton buttonType="secondary" type="submit" data-qa="btnTransferSubmit">
                        {t('general.components.button.immediateTransfer')}
                    </RoundedButton>
                </Form>
            </TransferFormSection>
        </TransferPageContainer>
    )
}
