import axios from 'axios';

const BASE_URL = 'https://api.vatcomply.com';

// Obtener las monedas disponibles
export const fetchCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/currencies`);
    return Object.keys(response.data).map(key => ({
      value: key,
      label: `${response.data[key].name}`,
      symbol:`${response.data[key].symbol}`,
    }));
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }
};

// Obtener la tasa de conversión 
export const fetchConversionRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/rates?base=${fromCurrency.value}&symbols=${toCurrency.value}`);
    return {rate : response.data.rates[toCurrency.value], date:response.data.date}
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    return null;
  }
};
