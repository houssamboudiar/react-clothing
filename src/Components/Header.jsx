import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as CartIcon } from './../Assets/cart.svg'
import { ReactComponent as ArrowUp } from './../Assets/arrow-up.svg'
import { fetchCategories } from '../Store/redux/reducers/categories';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom';
import { fetchCurrencies } from '../Store/redux/reducers/currencies';
import CurrencySwitcher from './CurrencySwitcher';

const Surface = styled.div`
  display:flex;
  position : fixed;
  min-height : 80px;
  width: 100%;
  align-items: center;
  padding: 0 80px;
  background-color:#FFF ;
  z-index:10 ;
`

const Logo = styled.div`
  display: flex ;
  justify-content: center;
`

const Navigation = styled.div`
  display: flex ;
  width: 100%;
  align-items: flex-start;
  p {
    font-weight: 600, Medium;
    size: 16px;
    text-transform: uppercase;
    padding: 0 15px;
    line-height: 19.2px;
    flex-wrap: nowrap;
    &.active{
      border-bottom: 5px solid red;
    }
  }
`

const ItemLink = styled(NavLink)`
    font-weight: 600, Medium;
    size: 16px;
    text-transform: uppercase;
    padding: 10px 15px 10px 15px;
    line-height: 57.2px;
    flex-wrap: nowrap;
    padding-bottom: 10px;
`

const Actions = styled.div`
  display: flex ;
  justify-content: flex-end;
  width: 100%;
  p {
    height: 20px;
    width: 20px;
  }
`

export const ActionStyle = styled.div`
  display: flex ;
  align-items: center;
  padding: 0 10px;
  a {
    font-weight: 600;
    size: 18px;
    text-transform: uppercase;
    padding: 0 15px;
    line-height: 28.8px;
    flex-wrap: nowrap;
    padding: 0 7px;
  }
`

const CartIconStyled = styled(CartIcon)`
  align-items: center;
  justify-content: center;
`

const ArrowUpStyled = styled(ArrowUp)`
  line-height: 28.8px;
  padding-left: 5px;
  height: 25px;
  width: 17px;
  align-items: center;
  justify-content: center;
`

class Header extends Component {

    componentDidMount() {
        this.props.fetchCurrencies()
    }
  
    render() {
    if (!this.props.categories.loading==="succeeded") {
      return (
          <div className="loading">
              <div className="loader"></div>
          </div>
      );
    }else{
      return (
        <Surface>
          <Navigation>
            {(this.props.categories.loading==="succeeded")&&this.props.categories.categories.map((item, i)=>{
              return <ItemLink activeClassName="selected" key={i} to={{ pathname: `/${item.name}`,state: { products: item.products} }}>{item.name}</ItemLink>
            })}
          </Navigation>
          <Logo>
            <img src='/logo.svg' alt='React Clothing' />
          </Logo>
          <Actions>
            <ActionStyle>
              <CurrencySwitcher currencies={this.props.currencies}/>
            </ActionStyle>
            <ActionStyle>
              <CartIconStyled />
            </ActionStyle>
          </Actions>
        </Surface>
      )
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    currencies: state.currencies
  };
};
// no-unused-vars
export default connect(mapStateToProps, {fetchCurrencies})(Header);