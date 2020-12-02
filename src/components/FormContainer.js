import React from 'react'
import { Container , Row, Col } from 'react-bootstrap'

const FormContainer = ({childern}) => {
    return (
       <Container>
           <Row className='justify-content-md-center'>
               <Col xs={12} md={6}>
                   {childern}
               </Col>

           </Row>
       </Container>
    )
}

export default FormContainer
