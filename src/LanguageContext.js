import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);
export function useLanguage() {
  return useContext(LanguageContext);
}
