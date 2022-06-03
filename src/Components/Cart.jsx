import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";
import { ReactComponent as CartIcon } from "./../Assets/cartwhite.svg";
import CartItem from "./CartItem";

const Wrap = styled.div`
  background: #fff;
  padding-top: 80px;
  padding-left: 80px;
  padding-right: 80px;
  padding-bottom: 80px;
`;

const Heading = styled.h1`
  text-transform: capitalize;
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: 700;
  size: 42px;
`;

const Product = styled.div`
  background-color: blue;
`;

const OrderInfo = styled.div`
  border-top: solid 1px #e5e5e5;
  padding-top: 32px;
`;

const OrderText = styled.h4`
  display:flex;
  font-size: 24px;
  font-weight: 400;
  padding-bottom: 8px;
`;

const OrderButton = styled.button`
  padding: 16px, 32px, 16px, 32px;
  border: none;
  height: 43px;
  width: 279px;
  font: inherit;
  color: #fff;
  background-color: #5ece7b;
  cursor: pointer;
`;

const OrderStats = styled.h4`
  padding-left: 10px;
  font-size: 24px;
  font-weight: 700;
`;

class Cart extends Component {
  state = {
    total: 0,
    tax: 0,
  };
  render() {
    console.log(this.props.cart)
    return (
      <Wrap>
        <Heading>CART</Heading>
        {this.props.cart.products.map((item, i) => {
          return <CartItem product={item} key={i} />;
        })}
        <OrderInfo>
          <OrderText>Tax 21%:</OrderText>
          <OrderStats>{this.state.tax}</OrderStats>
          <OrderText>Quantity:</OrderText>
          <OrderStats>{this.props.cart.counter}</OrderStats>
          <OrderText>Total:</OrderText>
          <OrderStats>{this.state.total}</OrderStats>
          <OrderButton>ORDER</OrderButton>
        </OrderInfo>
      </Wrap>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(Cart);
