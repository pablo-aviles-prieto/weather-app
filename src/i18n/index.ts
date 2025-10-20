// biome-ignore lint/style/noExportedImports: <i18n documentation>
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../locales/en/translation.json' with { type: 'json' };
import esTranslations from '../locales/es/translation.json' with { type: 'json' };

const resources = {
	en: {
		translation: enTranslations,
	},
	es: {
		translation: esTranslations,
	},
};

export type SupportedLanguage = keyof typeof resources;

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
