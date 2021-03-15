export function countTimeZone(date: Date) {
    const offset = -4.0 // EA
    const utc = date.getTime() + date.getTimezoneOffset() * 60000
    return new Date(utc + 3600000 * offset)
}
