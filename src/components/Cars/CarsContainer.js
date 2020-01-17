import React, { Component } from 'react';
import styled from 'styled-components';

import { getCars } from '../../api/cars';
import { data } from '../../mockData/data';
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
    const tooManyRequests = true;
    if (tooManyRequests) {
      const numberedData = data.map((car, index) => ({ ...car, key: index}));
      this.setState({ cars: numberedData });
    } else {
      const cars = await getCars();
      if (cars.error) {
        this.setState({ error: cars.error });
      } else {
        this.setState({ cars });
      }
    }
  }

  render() {
    const { cars, error } = this.state;
    if (error) return <div>Oops, something went wrong:<br/>{error}</div>;
    if (cars.length === 0) return <div>Loading...</div>;

    return (
      <Styles>
        <h1>Retro cars (70-80s)</h1>
        <CarsView columns={columns} data={cars} />
      </Styles>
    );
  }
}

export default CarsContainer;
