import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';
import data from './data.json';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [swapped, setSwapped] = useState(false);

  const fuse = new Fuse(Object.keys(data), { includeScore: true });

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleSearch1 = (e) => {
    const term = e.target.value;
    setSearchTerm1(term);
    setSearchTerm2(term);
  };

  const handleSearch2 = (e) => {
    const term = e.target.value;
    setSearchTerm1(term);
    setSearchTerm2(term);
  };

  const handleSwap = () => {
    setSwapped(!swapped);
  };

  const getTranslation = (key) => {
    const translation = t(key);
    return swapped ? swapWords(translation) : translation;
  };

  const swapWords = (text) => {
    const words = text.split(' ');
    return words
      .map((word, index) => {
        return index % 2 === 0 ? word.toUpperCase() : word.toLowerCase();
      })
      .join(' ');
  };

  const searchResults1 = searchTerm1
    ? fuse.search(searchTerm1).map((result) => result.item)
    : Object.keys(data);

  const searchResults2 = searchTerm2
    ? fuse.search(searchTerm2).map((result) => result.item)
    : Object.keys(data);

  return (
    <div className="container">
      <h1>
        {t('hello')} {t('world')}!
      </h1>
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('es')}>Español</button>
        <button onClick={() => handleLanguageChange('fr')}>Français</button>
      </div>
      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search 1"
            className="search-input"
            value={searchTerm1}
            onChange={handleSearch1}
          />
        </div>
        <div className="swap-container">
          <button className="swap-button" onClick={handleSwap}>
            Swap
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search 2"
            className="search-input"
            value={searchTerm2}
            onChange={handleSearch2}
          />
        </div>
      </div>
      <div className="results-container">
        <ul>
          {searchResults1.map((key) => (
            <li key={key}>{getTranslation(key)}</li>
          ))}
        </ul>
        <ul>
          {searchResults2.map((key) => (
            <li key={key}>{getTranslation(key)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
