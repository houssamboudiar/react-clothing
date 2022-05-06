import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import Category from './Category'

const Container = styled.div`
`

class Home extends Component {
  render() {
    if (this.props.match.params.category === "all") {
      if (!this.props.categories.categories[0]) {
        return (
          <div className="loading">
            <div className="loader"></div>
          </div>
        );
      } else {
        return (
          <Container>
            <Category category={this.props.categories.categories[0].name} products={this.props.categories.categories[0].products} />
          </Container>
        )
      }
    } else {
      return (
        <Container>
          <Category category={this.props.match.params.category} products={this.props.location.state.products} />
        </Container>
      )
    }
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps, null)(Home);