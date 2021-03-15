/* eslint-disable no-console */
import React from 'react'

interface ErrorBoundaryProps {
    errorReturn: any
    noErrorReturn: any
    callback?: any
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false }

    static getDerivedStateFromError(error: any) {
        console.error('ErrorBoundary getDerivedStateFromError error:', error)
        return { hasError: true }
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error('ErrorBoundary componentDidCatch error:', error)
        console.error('ErrorBoundary componentDidCatch errorInfo:', errorInfo)
        this.props.callback?.()
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return this.props.errorReturn
        }

        return this.props.noErrorReturn
    }
}

export default ErrorBoundary
