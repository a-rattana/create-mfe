import React from "react"
import Bugsnag from "@bugsnag/js"
import BugsnagPluginReact from "@bugsnag/plugin-react"
import { ErrorView } from "./ErrorBoundary"

// To use bugsnag you need additional configuration
// https://docs.bugsnag.com/platforms/javascript/react
Bugsnag.start({
  apiKey: "YOUR_API_KEY",
  plugins: [new BugsnagPluginReact()],
})
const BugsnagBoundary = Bugsnag.getPlugin("react")?.createErrorBoundary(React)

// Wrap App in <BugsnagErrorBoundary>
export const BugsnagErrorBoundary = ({ children }) =>
  BugsnagBoundary ? <BugsnagBoundary FallbackComponent={ErrorView}>{children}</BugsnagBoundary> : null
