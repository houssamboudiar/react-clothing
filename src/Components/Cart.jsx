import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";
import { ReactComponent as CartIcon } from "./../Assets/cartblack.svg";
import CartItem from "./CartItem";
import { onCheckout } from "../Store/redux/reducers/cart";

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

const Order = styled.div`
  border-top: solid 1px #e5e5e5;
  padding-top: 32px;
`;

const OrderText = styled.h4`
  display: flex;
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
  margin-top:16px ;
`;

const OrderStats = styled.h4`
  padding-left: 10px;
  font-size: 24px;
  font-weight: 700;
`;

const Item = styled.div`
  border-top: solid 1px #e5e5e5;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const CartIconStyled = styled(CartIcon)`
  display: block;
  color: green;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
`;

const EmptyHeading = styled.h1`
  text-transform: capitalize;
  padding-top: 20px;
  font-weight: 700;
  size: 32px;
  text-align:center ;
`;

const OrderInfo = styled.div`
  display: flex;
  padding-top:8px ;
`;

const Stat = styled.h4`
  font-size: 24px;
  font-weight: 500;
  width: 125px;
`;

const StateValue = styled.h4`
  font-size: 24px;
  font-weight: 700;
`;

class Cart extends Component {
  state = {
    total: this.props.cart.total,
    tax: 0,
  };

  render() {
    return (
      <Wrap>
        <Heading>CART</Heading>
        {!this.props.cart.products.length && (
          <Item>
            <CartIconStyled />
            <EmptyHeading>NO ITEMS IN CART</EmptyHeading>
          </Item>
        )}
        {this.props.cart.products &&
          this.props.cart.products.map((item, i) => {
            return <CartItem product={item} key={i} />;
          })}
          <Order>
          <OrderInfo>
            <Stat>Tax 21%: </Stat>
            <StateValue>
              {this.props.currencies.currentCurrency.symbol}{" "}
              {((this.props.cart.total * 21) / 100).toFixed(2)}
            </StateValue>
          </OrderInfo>

          <OrderInfo>
            <Stat>Quantity: </Stat>
            <StateValue>{this.props.cart.counter}</StateValue>
          </OrderInfo>

          <OrderInfo>
            <Stat>Total: </Stat>
            <StateValue>
              {this.props.currencies.currentCurrency.symbol}
              {this.props.cart.total.toFixed(2)}
            </StateValue>
          </OrderInfo>

          <OrderButton onClick={() => this.props.onCheckout()}>
            ORDER
          </OrderButton>
          </Order>
      </Wrap>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    cart: state.cart,
    currencies: state.currencies,
  };
};

export default connect(mapStateToProps, { onCheckout })(Cart);
