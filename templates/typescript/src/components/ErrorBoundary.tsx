import React from "react"
import type { ErrorInfo, ReactNode } from "react"

export const ErrorView = () => <h1>Sorry.. there was an error</h1>

type State = { hasError: boolean }

class ErrorBoundary extends React.Component<{ children?: ReactNode }, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorView />
    }

    return this.props.children
  }
}

export default ErrorBoundary
