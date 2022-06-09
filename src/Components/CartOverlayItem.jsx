import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Attribute from "./Attribute";
import ProductDetails from "./ProductDetails";
import ProductQuantity from "./ProductQuantity";
import { ReactComponent as ImageArrow } from "./../Assets/image-arrow.svg";

const Item = styled.div`
  padding-top: 32px;
`;

const Grid = styled.div``;

const Row = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

const Details = styled.div`
  flex: 5;
`;

const Quantity = styled.div`
  flex: 0.5;
  padding-right: 24px;
`;

const Preview = styled.div`
  display: flex;
  flex: 1;
`;

const Heading = styled.h1`
  font-weight: 600, Semi-bold;
  font-size: 30px;
  padding-bottom: 10px;
`;

const Subheading = styled.h1`
  font-weight: 400;
  font-size: 30px;
`;

const PriceValue = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

const Images = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
`;

const ProductImage = styled.img`
  max-width: 121px;
  max-height: 190px;
  object-fit: scale-down;
`;
const ImageContainer = styled.div`
  display: flex;
  position: relative;
  text-align: center;
  flex-grow: 4;
  color: white;
  margin-left: 24px;
`;

const PreviousImage = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  color: #fff;
  background-color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: 16px;
  height: 24px;
  transform: rotate(180deg);
  left: 120px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const NextImage = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  color: #fff;
  background-color: #fff;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  position: absolute;
  bottom: 16px;
  left: 152px;
  height: 24px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const ImageArrowIcon = styled(ImageArrow)`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

class CartOverlayItem extends Component {
  state = {
    imageCount: this.props.product.gallery.length,
    counter: 0,
  };
  render() {
    return (
      <Item>
        <Grid>
          <Row>
            <Details>
              <ProductDetails
                product={this.props.product}
                isCart={true}
                small={true}
              />
            </Details>
            <ProductQuantity product={this.props.product} small={true} />
            <Preview>
              <ImageContainer>
                <ProductImage
                  src={this.props.product.gallery[this.state.counter]}
                />
              </ImageContainer>
            </Preview>
          </Row>
        </Grid>
      </Item>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currencies: state.currencies,
  };
};

export default connect(mapStateToProps, null)(CartOverlayItem);
