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

const Increase = styled(IncreaseIcon).attrs((props: { small: boolean }) => props)`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.small ? "24px" : "48px")};
  width: ${(props) => (props.small ? "24px" : "48px")};
`;

const Decrease = styled(DecreaseIcon).attrs((props: { small: boolean }) => props)`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.small ? '24px' : '48px')};
  width: ${(props) => (props.small ? '24px' : '48px')};
`;

const Counter = styled.h1.attrs((props: { small: boolean }) => props)`
  font-weight: 400;
  font-size: ${(props) => (props.small ? "16px" : "24px")};
  height: 100%;
  display: flex;
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
          <Increase small={this.props.small} />
        </IncreaseButton>
        <Counter small={this.props.small}>{this.props.product.qte}</Counter>
        <DecreaseButton
          disabled={this.props.product.qte === 1}
          onClick={() => {
            this.props.decreaseProductQte(this.props.product);
          }}
        >
          <Decrease small={this.props.small} />
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