import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import parse from 'html-react-parser'
import Attribute from './Attribute'
import { addProductCart } from '../Store/redux/reducers/cart';
import { setProduct } from "../Store/redux/reducers/product";
import ProductDetails from './ProductDetails';
import { store } from "./../Store/store";

const Wrap = styled.div`
    display: flex;
    column-gap:10px;
    justify-content:center;
    background:#FFF;
    padding-top: 120px;
    padding-left: 80px;
    padding-right: 80px;
    padding-bottom: 80px;
`

const Images = styled.div`
  display: flex ;
  flex-direction:column ;
  align-items:flex-start ;
  flex-grow:1 ;
`

const ImagesItem = styled.img`
  max-width:80px;
  max-height:80px;
  padding-bottom:20px;
  /* object-fit:scale-down ; */
  &:active{
    opacity: 0.3;
  }
  &:hover{
    opacity: 0.7;
  }
`

const ProductImage = styled.img`
  max-width:600px;
  max-height:500px;
  object-fit:scale-down ;
`
const ImageContainer = styled.div`
  position: relative;
  text-align: center;
  flex-grow:4 ;
  color: white;
`

const Order = styled.div`
`

const OrderSection = styled.div`
  padding-top: 30px;
`;

const Heading = styled.h1`
  font-weight:600,Semi-bold ;
  font-size:30px ;
  padding-bottom:10px ;
`

const Subheading = styled.h1`
  font-weight:400;
  font-size:30px ;
`

const Description = styled.div`
  max-width: 300px;
  white-space: normal;
  h1 {

  }
`

const AttributeName = styled.p`
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 700;
    font-size:18px ;
    text-transform:uppercase ;
    margin-bottom:8px ;
`

const PriceValue = styled.p`
    font-weight: 700;
    font-size:24px ;
`

const AddButton = styled.button`
  padding: 16px 32px;
  width: 100%;
  border: none;
  font: inherit;
  color: #fff;
  background-color: #5ece7b;
  cursor: pointer;
  margin-bottom: 40px;
  margin-top: 30px;
`;

function initProductState(product){
  const clone = JSON.parse(JSON.stringify(product));
  clone.attributes.map((e) => (e.items.map((l, index) => {
    return (index===0) ? l.selected = true : l.selected = false;
  })));
  return clone;
};

class PDP extends Component {
  state = {
    currentImage: this.props.location.state.product.gallery[0],
    product: {
      ...initProductState(this.props.location.state.product),
    },
  };

  componentDidMount() {
    store.dispatch(
      setProduct({...initProductState(this.props.location.state.product)})
    );
  }

  render() {
    if (!this.props.categories.loading === "succeeded") {
      return (
        <div className="loading">
          <div className="loader"></div>
        </div>
      );
    } else {
      return (
        <Wrap>
          <Images>
            {this.props.location.state.product.gallery.map((item, i) => {
              return (
                <ImagesItem
                  activeClassName="selected"
                  key={item}
                  src={item}
                  onClick={() => {
                    this.setState((state) => {
                      return { currentImage: item };
                    });
                  }}
                />
              );
            })}
          </Images>
          <ImageContainer>
            <ProductImage src={this.state.currentImage} />
          </ImageContainer>
          <ProductDetails
            product={this.state.product}
            pricePDP={
              <>
                <OrderSection>
                  <AttributeName>PRICE:</AttributeName>
                  <PriceValue>
                    {this.props.currencies.currentCurrency.symbol}
                    {
                      this.props.location.state.product.prices.filter(
                        (x) =>
                          x.currency.label ===
                          this.props.currencies.currentCurrency.label
                      )[0].amount
                    }
                  </PriceValue>
                </OrderSection>
                <AddButton
                  onClick={() => {this.props.addProductCart(this.props.product);console.log(this.props.cart)}}
                >
                  ADD TO CART
                </AddButton>
                <Description>
                  {parse(this.props.location.state.product.description)}
                </Description>
              </>
            }
          ></ProductDetails>
        </Wrap>
      );
    }
  }
};

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    currencies: state.currencies,
    product: state.product,
  };
};

export default connect(mapStateToProps, { addProductCart, setProduct })(PDP);