import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  increaseProductQte,
  decreaseProductQte,
} from "../Store/redux/reducers/cart";
import { ReactComponent as IncreaseIcon } from "./../Assets/plus-square.svg";
import { ReactComponent as DecreaseIcon } from "./../Assets/minus-square.svg";

const Quantity = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items:center;
`;

const IncreaseButton = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

const DecreaseButton = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const Increase = styled(IncreaseIcon)`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Decrease = styled(DecreaseIcon)`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Counter = styled.h1`
  font-weight: 400;
  font-size: 24px;
  height: 100%;
  display:flex ;
  justify-content: center;
  align-items: center;
`;

class ProductQuantity extends Component {
  render() {
    return (
      <Quantity>
        <IncreaseButton
          onClick={() => {
            this.props.increaseProductQte(this.props.product);
          }}
        >
          <Increase />
        </IncreaseButton>
        <Counter>{this.props.product.qte}</Counter>
        <DecreaseButton
          disabled={this.props.cart.counter === 1}
          onClick={() => {
            this.props.decreaseProductQte(this.props.product);
          }}
        >
          <Decrease />
        </DecreaseButton>
      </Quantity>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currencies: state.currencies,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, {
  increaseProductQte,
  decreaseProductQte,
})(ProductQuantity);