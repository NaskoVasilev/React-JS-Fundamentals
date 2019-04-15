import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './ContactBook.css'
import data from './contacts.json'
let currentContact = data[0]

const Header = () => <header>&#9993; Contact Book</header>

const Footer = () => <footer>Contact Book SPA &copy; 2017</footer>

const Details = (props) => {
  const { contact } = props

  return (<div id="details">
    <h1>Details</h1>
    <div className="content">
      <div className="info">
        <div className="col">
          <span className="avatar">&#9787;</span>
        </div>
        <div className="col">
          <span className="name">{contact.firstName}</span>
          <span className="name">{contact.lastName}</span>
        </div>
      </div>
      <div className="info">
        <span className="info-line">&phone; {contact.phone}</span>
        <span className="info-line">&#9993; {contact.email}</span>
      </div>
    </div>
  </div>)
}

const Contacts = (props) => {
  const data = props.data

  return data.map((c, i) => (<div onClick={() => renderContactDetails(i)} className="contact" key={i}>
    <span className="avatar small">&#9787;</span>
    <span className="title">{c.firstName} {c.lastName}</span>
  </div>))
}

const renderContactDetails = (index) => {
  currentContact = data[index]
  ReactDOM.render(<ContactBook />, document.getElementById('root'))
}

class ContactBook extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div id="book">
          <div id="list">
            <Contacts data={data} />
          </div>
          <Details contact={currentContact} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default ContactBook
