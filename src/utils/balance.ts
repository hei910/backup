export const getDisplayBalance = (balance: string) => {
    return Math.floor(+balance * 100) / 100
}
