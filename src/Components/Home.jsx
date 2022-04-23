import React, { Component } from 'react'
import styled from 'styled-components';
import Section from './Section'

const Container = styled.div`
`

export class Home extends Component {
  render() {
    return (
        <Container>
          <Section category={this.props.match.params.category} products={this.props.location.state.products} />
        </Container>
    )
  }
}

export default Home