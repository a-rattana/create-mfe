import { injectTranslations } from "locale/TranslationProvider"
import { FormattedMessage } from "react-intl"

const Feature = () => {
  return (
    <h1>
      <FormattedMessage id="feature.title" />
    </h1>
  )
}

export default injectTranslations(Feature)
