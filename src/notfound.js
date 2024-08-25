import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={6} className="text-center">
          <h1>404: Page Not Found</h1>
          <p className="lead">
            Sorry, the page you are looking for could not be found.
          </p>
        </Col>
      </Row>
      <p className="lead text-center">
        <Link to="/">Go to Home</Link>
      </p>
    </Container>
  )
}
