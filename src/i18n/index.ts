// biome-ignore lint/style/noExportedImports: <i18n documentation>
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json' with { type: 'json' };
import enForecast from '../locales/en/forecast.json' with { type: 'json' };
import esCommon from '../locales/es/common.json' with { type: 'json' };
import esForecast from '../locales/es/forecast.json' with { type: 'json' };

export const defaultNS = 'common';
export const resources = {
	en: {
		common: enCommon,
		forecast: enForecast,
	},
	es: {
		common: esCommon,
		forecast: esForecast,
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
		defaultNS,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
