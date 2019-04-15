import React, { Component } from 'react';
import './App.css';
import Street from './Street/Street';
import House from './House/House';
import HouseDetails from './HouseDetails/HouseDetails';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streets: [],
      selectedStreetIndex: 0,
      selectedHouseIndex: 0,
      hasFetched: false
    }
  }

  getSelectedStreet() {
    return this.state.streets[this.state.selectedStreetIndex].homes
  }

  getSlectedHouse() {
    return this.state.streets[this.state.selectedStreetIndex].homes[this.state.selectedHouseIndex]
  }

  streetHoverEvent(index) {
    this.setState({ selectedStreetIndex: index })
  }

  houseHoverEvent(index) {
    this.setState({ selectedHouseIndex: index })
  }

  componentWillMount() {
    fetch('http://localhost:9999/feed/street/all')
      .then(response => response.json())
      .then(data => this.setState({ streets: data.streets, hasFetched: true }))
  }

  render() {
    if (!this.state.hasFetched) {
      return <div>Loading</div>
    }

    return (<div className="App">
      <div className="streets">
        <h2>Streets</h2>
        {this.state.streets.length > 0 ? this.state.streets.map((s, i) => {
          return (<Street streetHoverEvent={this.streetHoverEvent.bind(this)} location={s.location} key={i} id={i} />)
        }) : 'There is no registred streets'}
      </div>

      <div className="houses">
        <h2>Houses</h2>
        {this.getSelectedStreet().map((h, i) => {
          return (<House type={h.type} description={h.description} id={i} key={i} imageUrl={h.imageUrl}
            houseHoverEvent={this.houseHoverEvent.bind(this)} price={h.price} />)
        })}
      </div>

      {this.state.streets.length > 0 ? <HouseDetails type={this.getSlectedHouse().type} description={this.getSlectedHouse().description}
        id={this.getSlectedHouse().id} key={this.getSlectedHouse().key} price={this.getSlectedHouse().price}
        imageUrl={this.getSlectedHouse().imageUrl} />
        : 'no house'}
    </div>)
  }
}

export default App;
