import React, { Component } from 'react'
import Navigation from './../components/Navigation/Navigation'
import { Container, Row, Col } from 'reactstrap'
import Datasets from './../components/Datasets/Datasets'
import Header from './../components/Header/Header'

function Dashboard() {

  // TODO componentWillMount - check JWT - if valid, render, else, go back to login
  // async componentDidMount() {
  //   let accessString = localStorage.getItem('JWT');
  //   console.log(accessString);
  //   if (accessString == null) {
  //     this.setState({
  //       isLoading: false,
  //       error: true,
  //     });
  //   } else {
  //     await axios
  //       .get('http://localhost:3003/findUser', {
  //         params: {
  //           username: this.props.match.params.username,
  //         },
  //         headers: { Authorization: `JWT ${accessString}` },
  //       })
  //       .then(response => {
  //         this.setState({
  //           first_name: response.data.first_name,
  //           last_name: response.data.last_name,
  //           email: response.data.email,
  //           username: response.data.username,
  //           password: response.data.password,
  //           isLoading: false,
  //           error: false,
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error.data);
  //       });
  //   }
  // }

  return (
    <div>
      <Navigation />
      <Container>
        <Header />
      </Container>
      <Container>
        <Row>
          <Datasets />
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
