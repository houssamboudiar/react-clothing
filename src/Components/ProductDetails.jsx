import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Attribute from "./Attribute";

const Order = styled.div``;

const OrderSection = styled.div``;

const Heading = styled.h1`
  font-weight: 600, Semi-bold;
  font-size: 30px;
  padding-bottom: 10px;
`;

const Subheading = styled.h1`
  font-weight: 400;
  font-size: 30px;
  padding-bottom: 10px;
`;

const AttributeName = styled.p`
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const PriceValue = styled.p`
  font-weight: 700;
  font-size: 24px;
  padding-bottom: 10px;
`;

class CartItem extends Component {
  render() {
    return (
      <Order>
        <OrderSection>
          <Heading>{this.props.product.brand}</Heading>
          <Subheading>{this.props.product.name}</Subheading>
          {this.props.priceCart && (
            <PriceValue>
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
        {this.props.product.attributes.map((item, i) => {
          return <Attribute key={i} attribute={item} />;
        })}
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
