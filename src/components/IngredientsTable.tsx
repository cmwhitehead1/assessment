import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './IngredientsTable.scss'
import SlotList from './slots/SlotList'
import IngredientList from './ingredients/IngredientList'

const IngredientsTable = () => {
  return (
    <div className="container-wrapper">
      <Container>
        <Row>
          <Col className="first-col">
            <IngredientList />
          </Col>
          <Col>
            <SlotList />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default IngredientsTable
