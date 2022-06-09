import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";
import { ReactComponent as CartIcon } from "./../Assets/cartblack.svg";
import CartItem from "./CartItem";
import CartOverlayItem from "./CartOverlayItem";
import { onCheckout } from "../Store/redux/reducers/cart";
import { setShowCart } from "../Store/redux/reducers/cart";

const Wrap = styled.div`
  background: #fff;
  padding: 32px 16px;
`;

const Heading = styled.h4`
  font-weight: 700;
  size: 16px;
  color: #1d1f22;
`;

const Product = styled.div`
  background-color: blue;
`;

const OrderInfo = styled.div`
  padding-top: 32px;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const CartOverlayHeader = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Total = styled.h4`
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 8px;
  flex:6 ;
`;

const TotalValue = styled.h4`
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 8px;
`;

const BagItems = styled.h4`
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 8px;
`;

const BtnGroup = styled.div`
  padding-top: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: space-between;
`;

const Checkout = styled.button`
  padding: 12px 27px;
  border: none;
  height: 43px;
  width: 140px;
  font: inherit;
  color: #fff;
  background-color: #5ece7b;
  border: 1px solid #5ece7b;
  cursor: pointer;
  font-size: 14px;
`;

const CartLink = styled(NavLink)`
  height: 43px;
  width: 140px;
  font-weight: 700;
  font-size: 14px;
`;

const CheckLink = styled(NavLink)`
  height: 43px;
  width: 140px;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
`;

const ViewBag = styled.button`
  padding: 7px 28px;
  border: none;
  height: 43px;
  width: 140px;
  font: inherit;
  color: #1d1f22;
  border: 1px solid #1d1f22;
  cursor: pointer;
  font-size: 14px;
  background-color: #fff;
`;

const OrderStats = styled.h4`
  padding-left: 10px;
  font-size: 24px;
  font-weight: 700;
`;

const Item = styled.div`
  padding-top: 42px;
  padding-bottom: 10px;
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
  z-index: 1;
  width: 70px;
  height: 70px;
`;

const EmptyHeading = styled.h1`
  text-transform: capitalize;
  padding-top: 20px;
  font-weight: 400;
  size: 32px;
  text-align: center;
`;

const ScrollContainer = styled.div`
  overflow-y: scroll;
  max-height: 45vh;
  padding-left: 18px;
  padding-right: 9px;
`;

const ScrollableOverlay = styled.div`
`;


class CartOverlay extends Component {
  render() {
    return (
      <Wrap>
        <CartOverlayHeader>
          <TotalValue>My Bag</TotalValue>
          {this.props.cart.counter === 1 && (
            <Total>, {this.props.cart.counter} </Total>
          )}
          {this.props.cart.counter !== 1 && (
            <Total>, {this.props.cart.counter} items</Total>
          )}
        </CartOverlayHeader>
        <ScrollContainer>
          <ScrollableOverlay>
            {!this.props.cart.products.length && (
              <Item>
                <Total>NO ITEMS IN CART</Total>
              </Item>
            )}
            {this.props.cart.products &&
              this.props.cart.products.map((item, i) => {
                return <CartOverlayItem product={item} key={i} />;
              })}
          </ScrollableOverlay>
        </ScrollContainer>

        <OrderInfo>
          <Total>Total</Total>
          <TotalValue>
            {this.props.currencies.currentCurrency.symbol}
            {this.props.cart.total.toFixed(2)}
          </TotalValue>
        </OrderInfo>
        <BtnGroup>
          <ViewBag>
            <CartLink
              onClick={() => this.props.setShowCart(!this.props.cart.showCart)}
              to={{ pathname: `/cart` }}
            >
              VIEW BAG
            </CartLink>
          </ViewBag>
          <Checkout onClick={() => this.props.onCheckout()}>
            <CheckLink
              onClick={(e) => e.preventDefault()}
              to={{ pathname: `#` }}
            >
              CHECK OUT
            </CheckLink>
          </Checkout>
        </BtnGroup>
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

export default connect(mapStateToProps, { onCheckout, setShowCart })(CartOverlay);
