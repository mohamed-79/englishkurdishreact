import React, { useState } from 'react';
import translations from './translations/wergeran.json';
import  Button  from 'react-bootstrap/Button';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const translateWord = (word, targetLanguage) => {
    const translatedWord = translations[word]?.[targetLanguage];
    return translatedWord || 'Translation not found';
  };

  const searchInTranslations = (term) => {
    const matchingWords = Object.keys(translations).filter(
      (word) =>
        word.toLowerCase().includes(term.toLowerCase()) ||
        translateWord(word, 'en').toLowerCase().includes(term.toLowerCase()) ||
        translateWord(word, 'ku').toLowerCase().includes(term.toLowerCase())
    );
    return matchingWords;
  };

  const filteredWords = searchInTranslations(searchTerm);

  const toggleLanguage = () => {
    setCurrentLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ku' : 'en'));
  };

  if (searchTerm === '') {
    return (
      <div>
       
        <h1>بەرنامێ وەرگێڕانا پەیڤا</h1>
        <div>
          <input
            type="text"
            placeholder="...لێگەریانا پەیڤا"
            value={searchTerm}
            onChange={handleSearch}
          />
          <p>زاراڤەکی داخل بکە بو وەرگێڕانێ</p>
        </div>
      </div>
    );
  }

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
        <Button variant="dark" onClick={toggleLanguage}>
           {currentLanguage === 'en' ? 'کوردی' : 'English'}
        </Button>        
    
        
        {filteredWords.length === 0 && <p>No matching words found.</p>}
        {filteredWords.map((word) => (
          <div key={word}>
            <p>
              <strong>{currentLanguage === 'en' ? 'English' : 'کوردی'}: </strong>
              {translateWord(word, currentLanguage)}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;
