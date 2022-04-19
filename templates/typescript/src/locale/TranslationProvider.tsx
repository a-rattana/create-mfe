import React from "react"
import { IntlProvider } from "react-intl"
import enCommonMessages from "./en-US.json"
import frCommonMessages from "./fr-FR.json"

type Messages = Record<string, any>

export const TranslationProvider = ({
  messages = [],
  children,
}: {
  messages?: [Messages?, Messages?]
  children?: React.ReactNode
}) => {
  const language = navigator.languages.filter((lang) => ["en", "fr"].includes(lang.slice(0, 2)))
  const locale = language[0] || "en"

  const translations: Record<string, Messages> = {
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
 * HOC for injecting translations into components
 * @example
 * export default injectTranslations(MyComponent, [enMessages, frMessages])
 */
export const injectTranslations = (Component: React.ComponentType, messages?: [Messages?, Messages?]) => {
  return (props: any) => (
    <TranslationProvider messages={messages}>
      <Component {...props} />
    </TranslationProvider>
  )
}

/**
 * Helper function for flattening translation json into dot strings
 * @example
 * jsonToDotString({ x: { y: 'z'} }) // { 'x.y': 'z' }
 */
export const jsonToDotString = (obj: Record<string, any> = {}, output: Record<string, string> = {}, prefix = "") => {
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === "object" && val !== null) {
      jsonToDotString(val, output, prefix + key + ".")
    } else {
      output[prefix + key] = val
    }
  })
  return output
}
