import React, { Component } from 'react';
import axios from 'axios';

class Cars extends Component {
  state = {
    cars: [],
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://egis123.free.beeceptor.com/cars');
      console.log(response);
      this.setState({ cars: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { cars } = this.state;
    if (cars.length === 0) return <div>Loading...</div>;

    return (
      <div>
        <ol>
          {cars.map((car, i) => <li key={i}>{car.Name} | {car.Year}</li>)}
        </ol>
      </div>
    )
  }
}

export default Cars;
