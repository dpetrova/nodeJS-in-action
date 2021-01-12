//localStorage defines a simple key/value store
//both keys and values must be strings

const examplePreferences = {
  temperature: 'Celcius'
};

// serialize on write
localStorage.setItem('preferences', JSON.stringify(examplePreferences));

// deserialize on read
const preferences = JSON.parse(localStorage.getItem('preferences'));
console.log('Loaded preferences:', preferences);
