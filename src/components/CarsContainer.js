import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CarsView from './CarsView';

const Styles = styled.div`
  padding: 1rem;
`;

const columns = [
  {
    Header: 'Key',
    accessor: 'key',
    sortable: true,
    width: 20,
  },
  {
    Header: 'Name',
    accessor: 'Name',
    sortable: true,
  },
  {
    Header: 'Year',
    accessor: 'Year',
    sortable: true,
  },
  {
    Header: 'Horsepower',
    accessor: 'Horsepower',
    sortable: true,
  },
  {
    Header: 'Origin',
    accessor: 'Origin',
    sortable: true,
  },
];

class CarsContainer extends Component {
  state = {
    cars: [],
    error: null,
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://egis123.free.beeceptor.com/cars');
      const cars = response.data.map((car, index) => ({ ...car, key: index}));
      console.log('cars: ', cars);
      this.setState({ cars });
    } catch (error) {
      this.setState({ error: error.response.data });
      console.error(error.response);
    }
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render() {
    const { cars, error } = this.state;
    if (error) return <div>Oops, something went wrong:<br/>{error}</div>;
    if (cars.length === 0) return <div>Loading...</div>;

    return (
      <Styles>
        <h1>Retro cars (70-80s)</h1>
        <CarsView columns={columns} data={cars} />
        {/* <div style={{ margin: 10 }} />
        <ol>
          {cars.map((car, i) => (
            <li key={i}>
              {this.capitalize(car.Name)} | {car.Year} | {car.Horsepower} HPS | {car.Origin}
            </li>)
          )}
        </ol> */}
      </Styles>
    )
  }
}

export default CarsContainer;
