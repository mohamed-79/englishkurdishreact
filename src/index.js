import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // default language
  resources: {
    en: {
      translation: require('./translations/en.json')
    },
    es: {
      translation: require('./translations/es.json')
    },
    fr: {
      translation: require('./translations/fr.json')
    }
  }
});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);
