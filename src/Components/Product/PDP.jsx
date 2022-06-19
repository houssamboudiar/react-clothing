import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addProductCart } from '../../Store/redux/reducers/cart';
import { setProduct } from "../../Store/redux/reducers/product";
import ProductDetails from './ProductDetails';
import { store } from "../../Store/store";
import ProductImageSection from './ProductImageSection';
import ProductOrderSection from './ProductOrderSection';

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

export function initProductState(product){
  const clone = JSON.parse(JSON.stringify(product));
  clone.attributes.map((e) => (e.items.map((l, index) => {
    return (index===0) ? l.selected = true : l.selected = false;
  })));
  return clone;
};

class PDP extends Component {
  state = {
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
          <ProductImageSection gallery={this.state.product.gallery} />
          <ProductDetails
            product={this.state.product}
            isCart={false}
            inStock={this.state.product.inStock}
            pricePDP={<ProductOrderSection initProduct={this.state.product} />}>
          </ProductDetails>

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