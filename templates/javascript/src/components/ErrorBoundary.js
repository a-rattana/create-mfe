import React from "react"

export const ErrorView = () => <h1>Sorry.. there was an error</h1>

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView />
    }

    return this.props.children
  }
}

export default ErrorBoundary
