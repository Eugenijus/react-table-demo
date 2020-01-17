import axios from 'axios';

export const getCars = async () => {
  try {
    const response = await axios.get('https://egis123.free.beeceptor.com/cars');
    console.log('response: ', response);
    const cars = response.data.map((car, index) => ({ ...car, key: index}));
    return cars;
  } catch (error) {
    console.error(error.response);
    return { error: error.response.data };
  }
}
