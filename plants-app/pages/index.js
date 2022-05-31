import React, { useState } from 'react';
import Pusher from 'pusher-js';

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
const data1 = [
  {
    id: '0',
    lightness: '12.5',
    humidity: '9.5',
    pression: '10.0',
    airquality: '11.0',
    temperature: '5.0'
  }
]

const data2 = [
  {
    id: '1',
    lightness: '10.5',
    humidity: '11.5',
    airquality: '14.0',
    temperature: '10.0'
  }
]

// const pusher = new Pusher('app-key', {
//   cluster: 'cluster-location',
//   encrypted: true
// })

// const channel = pusher.subscribe('plant-data')


export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: data1
    }
    this.stop = false;
  }

  componentDidMount () {
    this.receiveUpdateFromPusher()
  }

  // receiveUpdateFromPusher () {
  //   channel.bind('plant-data', data => {
  //     this.setState({
  //       data: [...this.state.data, data]
  //     })
  //   })
  // }

  handleFormSubmit (data) {
    axios.post('http://localhost:8080/add-review', data)
    .then(res => {
      console.log('received by server')
    })
    .catch(error => {
      throw error
    })
  }

  handleKeyDown(event) {
    if(event.keyCode === 13 && this.stop == false) { 
        this.stop = true
  }
  else if (event.keyCode === 13 && this.stop == true){
    this.stop = false
  }
}

  submitNewData() {
    if (this.stop == true && this.state.data == data1) {
      this.setState({
        data: data2
      })
    }
    else if (this.stop == true && this.state.data == data2) {
      this.setState({
        data: data1
      })
    }
  };

  render () {
    return (
      <div className='plants-background'>
        <div className='grey-navbar'></div>
      </div>
    )
  }
} 