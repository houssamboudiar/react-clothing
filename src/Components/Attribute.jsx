import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactComponent as CartIcon } from "./../Assets/cartwhite.svg";
import parse from "html-react-parser";
import { store } from "../Store/store";
import { setProduct } from "../Store/redux/reducers/product";

const OrderSection = styled.div``;

const AttributeName = styled.p`
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const ProductPrice = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #1d1f22;
  align-items: center;
  padding-left: 5px;
`;

const Items = styled.div``;

const SizeItem = styled.button.attrs((props: { selected: boolean }) => props)`
  background: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  width: 63px;
  height: 45px;
  border: 1px solid black;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "black" : "white")};
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-right: 12px;
  &:hover {
    color: white;
    background-color: black;
  }
`;

const Swatch = styled.button.attrs(
  (props: { selected: boolean, color: string }) => props
)`
  background: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  width: 32px;
  height: 32px;
  border: 1px solid white;
  outline: ${(props) => (props.selected ? "1px solid #5ECE7B" : "none")};
  background-color: ${(props) => props.color};
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-right: 12px;
`;

//Helper
var hasNumber = /\d/;

function selectAttribute(id ,attribute){
  const clone = JSON.parse(JSON.stringify(attribute));
  clone.items.map((l, index) => {
      return l.id === id ? (l.selected = true) : (l.selected = false);
  })
  return clone;
};

function updateProductAttribute(updatedAttribute, product) {
  const clone = JSON.parse(JSON.stringify(product));
  clone.attributes.map((attribute) => {
    if (attribute.id === updatedAttribute.id) {
      attribute.items = updatedAttribute.items;
    }
  });
  return clone;
};

class Attribute extends Component {
  state = {
    selectedAttribute: {
      id: this.props.attribute.id,
      displayValue: this.props.attribute.items[0].displayValue,
      value: this.props.attribute.items[0].value,
    },
    attribute: this.props.attribute,
  };

  render() {
    if (this.props.attribute.id === "Size") {
      console.log(this.state.attribute);
      return (
        <OrderSection>
          <AttributeName>{this.props.attribute.name}:</AttributeName>
          <Items>
            {this.props.attribute.items.map((item, i) => {
              return (
                <SizeItem
                  key={item.id}
                  onClick={() => {
                    store.dispatch(setProduct(updateProductAttribute(selectAttribute(item.id, this.state.attribute), this.props.product.product)));
                    this.setState((state) => {
                      return {
                        selectedAttribute: {
                          id: this.props.attribute.id,
                          displayValue: item.displayValue,
                          value: item.value,
                        },
                        attribute: selectAttribute(item.id, state.attribute),
                      };
                    });
                  }}
                  selected={
                    item.displayValue ===
                    this.state.selectedAttribute.displayValue
                  }
                >
                  {hasNumber.test(item.displayValue) && item.displayValue}
                  {!hasNumber.test(item.displayValue) &&
                    item.displayValue === "Extra Large" &&
                    "XL"}
                  {!hasNumber.test(item.displayValue) &&
                    item.displayValue === "Extra Small" &&
                    "SM"}
                  {!hasNumber.test(item.displayValue) &&
                    item.displayValue !== "Extra Small" &&
                    item.displayValue !== "Extra Large" &&
                    item.displayValue[0]}
                </SizeItem>
              );
            })}
          </Items>
        </OrderSection>
      );
    }
    if (this.props.attribute.id === "Color") {
      return (
        <OrderSection>
          <AttributeName>{this.props.attribute.name}:</AttributeName>
          <Items>
            {this.props.attribute.items.map((item, i) => {
              return (
                <Swatch
                  key={item.id}
                  onClick={() => {
                    store.dispatch(
                      setProduct(
                        updateProductAttribute(
                          selectAttribute(item.id, this.state.attribute),
                          this.props.product.product
                        )
                      )
                    );
                    this.setState((state) => {
                      return {
                        selectedAttribute: {
                          id: this.props.attribute.id,
                          displayValue: item.displayValue,
                          value: item.value,
                        },
                        attribute: selectAttribute(item.id, state.attribute),
                      };
                    });
                  }}
                  selected={
                    item.displayValue ===
                    this.state.selectedAttribute.displayValue
                  }
                  color={item.value}
                ></Swatch>
              );
            })}
          </Items>
        </OrderSection>
      );
    }
    if (this.props.attribute.id === "Capacity") {
      return (
        <OrderSection>
          <AttributeName>{this.props.attribute.name}:</AttributeName>
          <Items>
            {this.props.attribute.items.map((item, i) => {
              return (
                <SizeItem
                  key={item.id}
                  onClick={() => {
                    this.setState((state) => {
                      console.log(state.selectedAttribute);
                      return {
                        selectedAttribute: {
                          id: this.props.attribute.id,
                          displayValue: item.displayValue,
                          value: item.value,
                        },
                      };
                    });
                  }}
                  selected={
                    item.displayValue ==
                    this.state.selectedAttribute.displayValue
                  }
                >
                  {hasNumber.test(item.displayValue) && item.displayValue}
                </SizeItem>
              );
            })}
          </Items>
        </OrderSection>
      );
    }
    if (
      this.props.attribute.items[0].id === "Yes" &&
      this.props.attribute.items[1].id === "No"
    ) {
      return (
        <OrderSection>
          <AttributeName>{this.props.attribute.name}:</AttributeName>
          <Items>
            {this.props.attribute.items.map((item, i) => {
              return (
                <SizeItem
                  key={item.id}
                  onClick={() => {
                    store.dispatch(
                      setProduct(
                        updateProductAttribute(
                          selectAttribute(item.id, this.state.attribute),
                          this.props.product.product
                        )
                      )
                    );
                    this.setState((state) => {
                      return {
                        selectedAttribute: {
                          id: this.props.attribute.id,
                          displayValue: item.displayValue,
                          value: item.value,
                        },
                        attribute: selectAttribute(item.id, state.attribute),
                      };
                    });
                  }}
                  selected={
                    item.displayValue ===
                    this.state.selectedAttribute.displayValue
                  }
                >
                  {item.displayValue.toUpperCase()}
                </SizeItem>
              );
            })}
          </Items>
        </OrderSection>
      );
    }
    return (
      <OrderSection>
        <h1>Unknown Attribute</h1>
        <h1>{this.props.attribute.name}</h1>
        <h1>{this.props.attribute.type}</h1>
      </OrderSection>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currencies: state.currencies,
    cart: state.cart,
    product: state.product,
  };
};

export default connect(mapStateToProps, { setProduct })(Attribute);
