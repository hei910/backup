export interface ApiResponse<T = any> {
    success: boolean
    reason?: string
    data: T
}
