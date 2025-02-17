import { supportedLanguages } from "../constants/languages";

export namespace LanguageUtils {
  export function getBrowserLanguage() {
      const browserLang = navigator.language.split("-")[0];
      if (!!supportedLanguages.find(l => l === browserLang)) {
        return browserLang;
      } else {
        return "en";
      }
  }
}