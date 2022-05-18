import React, { Component, Fragment } from 'react';
import Pusher from 'pusher-js';
import ReactTable from 'react-table-6'
import Form from '../components/Form.js'
import Head from 'next/head';
import axios from 'axios';

const columns = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Lightness',
    accessor: 'lightness'
  },
  {
    Header: 'Humidity',
    accessor: 'humidity'
  },
  {
    Header: 'Pression',
    accessor: 'pression'
  },
  {
    Header: 'AirQuality',
    accessor: 'airquality'
  },
  {
    Header: 'Temperature',
    accessor: 'temperature'
  }
]
const data = [
  {
    id: '0',
    lightness: '12.5',
    humidity: '9.5',
    pression: '10.0',
    airquality: '11.0',
    temperature: '5.0'
  }
]

const pusher = new Pusher('app-key', {
  cluster: 'cluster-location',
  encrypted: true
})

const channel = pusher.subscribe('rotten-pepper')


export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: data
    }
  }

  componentDidMount () {
    this.receiveUpdateFromPusher()
  }

  receiveUpdateFromPusher () {
    channel.bind('new-movie-review', data => {
      this.setState({
        data: [...this.state.data, data]
      })
    })
  }

  handleFormSubmit (data) {
    axios.post('http://localhost:8080/add-review', data)
    .then(res => {
      console.log('received by server')
    })
    .catch(error => {
      throw error
    })
  }

  render () {
    return (
      <>
      <Head>
          <title>Movie listing</title>
        </Head>
      <div>
        <h1>Rotten <strike>tomatoes</strike> pepper</h1>
        <strong>Movie: Infinity wars </strong>
        <Form handleFormSubmit={this.handleFormSubmit.bind(this)} />
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultPageSize={10}
    />
      </div>
      </>
    )
  }
}