import React, { Component } from 'react'
import Navigation from './../components/Navigation/Navigation'
import { Container, Row, Col } from 'reactstrap'

function Settings() {
  return (
    <div>
      <Navigation />
      <Container fluid>
        <Row>
          <Col md="12">Settings</Col>
        </Row>
      </Container>
    </div>
  )
}

export default Settings
