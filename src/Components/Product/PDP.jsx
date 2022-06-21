import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addProductCart } from '../../Store/redux/reducers/cart';
import { fetchProductById, setProduct } from "../../Store/redux/reducers/product";
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

  componentDidMount() {
    store.dispatch(fetchProductById(this.props.match.params.id))
  }

  render() {
    if (this.props.product.loading === 'pending') {
      return (
        <div className="loading">
          <div className="loader"></div>
        </div>
      );
    } 
    if(this.props.product.loading === 'succeeded') {
      return (
        <Wrap>
          <ProductImageSection gallery={this.props.product.product.gallery} />
          <ProductDetails
            product={this.props.product.product}
            isCart={false}
            inStock={this.props.product.product.inStock}
            pricePDP={<ProductOrderSection initProduct={this.props.product.product} />}>
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