import { useState } from 'react';
import './App.css';

function App() {
 const [result, setResult] = useState(0);
 const [error, setError] = useState('');

const onSubmit = (event) =>{ 
  event.preventDefault();
  setError('') ;
  const amount = event.target.amount.value;
  const currency = event.target.currency.value;
  fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currency}`)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject();
      }
      return response.json();
    })
    .then((data) => {
      const rate = data?.rates?.[0]?.mid;
      if (!rate) {
        setError('Mamy chwilowy problem. Spróbuj później');
        return;
      }
      setResult((amount * rate).toFixed(2));
    })
    .catch(() => {
      setError('Wystąpił błąd. Spróbuj później');
    });
}

  return (
    <>
      <h1 class='box text'>Przelicznik walut</h1>
      <form id='form' onSubmit={onSubmit}>
        <input
          class=' box input'
          type='number'
          required
          min='0.01'
          step='0.01'
          name='amount'
        />
        <select class='box curr' name='currency'>
          <option value='EUR' selected>
            EUR
          </option>
          <option value='USD'>USD</option>
          <option value='CHF'>CHF</option>
        </select>
        <button class='box btn' type='submit'>
          Przelicz
        </button>
        <hr class='line' />
        <p class='result'>
          <span id='result'>{result}</span> PLN
        </p>
        <p id='error'>{error}</p>
      </form>
    </>
  );
}

export default App;
