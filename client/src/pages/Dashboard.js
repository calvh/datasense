import React, { Component } from 'react'
import Navigation from './../components/Navigation/Navigation'
import { Container, Row, Col } from 'reactstrap'
import Datasets from './../components/Datasets/Datasets'
import Header from './../components/Header/Header'

function Dashboard() {
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
