import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Attribute from "./Attribute";

const Order = styled.div``;

const OrderSection = styled.div``;

const Heading = styled.h1.attrs((props: { small: boolean }) => props)`
  font-size: ${(props) => (props.small ? "16px" : "30px")};
  font-weight: ${(props) => (props.small ? 300 : 600)};
  padding-bottom: 10px;
  white-space: pre;
`;

const Subheading = styled.h1.attrs((props: { small: boolean }) => props)`
  font-size: ${(props) => (props.small ? "16px" : "30px")};
  font-weight: ${(props) => (props.small ? 300 : 400)};
  padding-bottom: 10px;
  white-space: pre;
`;

const PriceValue = styled.p.attrs((props: { small: boolean }) => props)`
  font-size: ${(props) => (props.small ? "16px" : "24px")};
  font-weight: ${(props) => (props.small ? 500 : 700)};
  padding-bottom: 10px;
`;

class CartItem extends Component {
  render() {
    return (
      <Order>
        <OrderSection>
          <Heading small={this.props.small}>{this.props.product.brand}</Heading>
          <Subheading small={this.props.small}>
            {this.props.product.name}
          </Subheading>
          {this.props.isCart && (
            <PriceValue small={this.props.small}>
              {this.props.currencies.currentCurrency.symbol}
              {
                this.props.product.prices.filter(
                  (x) =>
                    x.currency.label ===
                    this.props.currencies.currentCurrency.label
                )[0].amount
              }
            </PriceValue>
          )}
        </OrderSection>
        <attr>
        {this.props.product.attributes.map((item, i) => {
          return (
            <Attribute key={i} attribute={item} isCart={this.props.isCart} small={this.props.small} />
            );
          })}
        </attr>
        {this.props.pricePDP}
      </Order>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currencies: state.currencies,
  };
};

export default connect(mapStateToProps, null)(CartItem);
