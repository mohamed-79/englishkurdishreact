import React, { useState } from 'react';
import translations from './translations/wergeran.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const translateWord = (word, targetLanguage) => {
    const translatedWord = translations[word]?.[targetLanguage];
    return translatedWord || 'Translation not found';
  };

  const searchInTranslations = (term) => {
    const matchingWords = Object.keys(translations).filter((word) =>
      word.toLowerCase().includes(term.toLowerCase()) ||
      translateWord(word, 'en').toLowerCase().includes(term.toLowerCase()) ||
      translateWord(word,  'ku').toLowerCase().includes(term.toLowerCase())
    );
    return matchingWords;
  };

  const filteredWords = searchInTranslations(searchTerm);

  return (
    <div>
      <h1>Word Translation App</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {filteredWords.map((word) => (
          <div key={word}>
            
            <p>
              <strong>English: </strong>
              {translateWord(word, 'en')}
            </p>
            <div >
              <strong>Kurdish: </strong>
              {translateWord(word, 'ku')}
            </div>

          </div>
        ))}
        {filteredWords.length === 0 && <p>No matching words found.</p>}
      </div>
    </div>
  );
}

export default App;
