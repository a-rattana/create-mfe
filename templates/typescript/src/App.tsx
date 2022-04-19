import { FormattedMessage } from "react-intl"
import { BrowserRouter, Route, Link } from "react-router-dom"
import { TranslationProvider } from "locale/TranslationProvider"
import ErrorBoundary from "components/ErrorBoundary"
import Feature from "features/Feature"

// @ts-ignore
import RemoteAppWithRoutes from "RoutingExample/Feature"

import "styles/App.css"

function App() {
  return (
    <ErrorBoundary>
      <TranslationProvider>
        <BrowserRouter>
          <Route path="/">
            <ul>
              <li>
                <Link to="/">
                  <FormattedMessage id="home" />
                </Link>
              </li>
              <li>
                <Link to="/feature">My feature</Link>
              </li>
              <li>
                <Link to="/external-app">External app</Link>
              </li>
            </ul>
          </Route>
          <Route path={"/feature"}>
            <Feature />
          </Route>
          <Route path={"/external-app"}>
            <RemoteAppWithRoutes />
          </Route>
        </BrowserRouter>
      </TranslationProvider>
    </ErrorBoundary>
  )
}

export default App
