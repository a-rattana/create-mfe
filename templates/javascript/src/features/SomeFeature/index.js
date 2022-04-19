import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom"
import { injectTranslations } from "locale/TranslationProvider"
import { FormattedMessage } from "react-intl"
import Button, { ButtonGroup } from "@8x8/oxygen-button"
import Typography from "@8x8/oxygen-typography"

export const usePath = (basename = "") => {
  const match = useRouteMatch()
  return (slug = "") => {
    const path = basename ? `${basename}/${slug}` : `${match.url}/${slug}`
    return path.replace(/\/+$/, "").replace(/\/{2,}/g, "/") || "/"
  }
}

function SomeFeature({ basename = "" }) {
  const path = usePath(basename)
  return (
    <div style={{ textAlign: "center", width: "500px", margin: "auto" }}>
      <ButtonGroup>
        <Link to={path("/")}>
          <Button variant="secondary">
            <FormattedMessage id="someFeature.home" />
          </Button>
        </Link>
        <Link to={path("/routing")}>
          <Button variant="secondary">
            <FormattedMessage id="someFeature.routing" />
          </Button>
        </Link>
      </ButtonGroup>

      <Switch>
        <Route path={path("/")} exact>
          <Home />
        </Route>
        <Route path={path("/routing")}>
          <RoutingExample />
        </Route>
      </Switch>
    </div>
  )
}

function Home() {
  return (
    <>
      <Typography as="h1" size="xl">
        <FormattedMessage id="someFeature.title" />
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
    </>
  )
}

function RoutingExample() {
  const path = usePath()
  return (
    <>
      <Typography as="h1" size="xl">
        Nested routes
      </Typography>
      <Link to={path("/1")}>Page 1</Link> | <Link to={path("/2")}>Page 2</Link>
      <Switch>
        <Route path={path("/:pageId")}>
          <ParametersExample />
        </Route>
        <Route path={path("/")}>
          <Typography as="h2" size="lg">
            Select a page
          </Typography>
        </Route>
      </Switch>
    </>
  )
}

function ParametersExample() {
  let { pageId } = useParams()
  return (
    <Typography as="h2" size="lg">
      You selected page: {pageId}
    </Typography>
  )
}

export default injectTranslations(SomeFeature)
