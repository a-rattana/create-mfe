import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import "./styles/App.scss"

const SomeFeature = React.lazy(() => import("features/SomeFeature"))

export default function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback="loading">
        <Route path="/">
          <SomeFeature />
        </Route>
      </React.Suspense>
    </BrowserRouter>
  )
}
