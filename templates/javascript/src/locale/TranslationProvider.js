import { IntlProvider } from "react-intl"
import enCommonMessages from "./en-US.json"
import frCommonMessages from "./fr-FR.json"

export const TranslationProvider = ({ messages = [], children }) => {
  const language = navigator.languages[0].slice(0, 2)
  const locale = ["en", "fr"].includes(language) ? language : "en"

  const translations = {
    en: { ...enCommonMessages, ...messages[0] },
    fr: { ...frCommonMessages, ...messages[1] },
  }

  return (
    <IntlProvider locale={locale} messages={jsonToDotString(translations[locale])}>
      {children}
    </IntlProvider>
  )
}

/**
 * HOC for injecting other translations into components
 * @example
 * export default injectTranslations(MyComponent, [enMessages, frMessages])
 * @param {component} Component - Component to inject translations into
 * @param {array} messages - Array of json translations
 * @returns Component
 */
export const injectTranslations = (Component, messages) => {
  return (props) => (
    <TranslationProvider messages={messages}>
      <Component {...props} />
    </TranslationProvider>
  )
}

/**
 * Helper function for flattening translation json into dot strings.
 * @example
 * jsonToDotString({ x: { y: 'z'} }) // { 'x.y': 'z' }
 * @param {object} obj - Translations json object
 * @param {object} output - The final object that gets output
 * @param {string} prefix - Creates the dot notation for child objects
 * @returns object
 */
export const jsonToDotString = (obj = {}, output = {}, prefix = "") => {
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === "object" && val !== null) {
      jsonToDotString(val, output, prefix + key + ".")
    } else {
      output[prefix + key] = val
    }
  })
  return output
}
