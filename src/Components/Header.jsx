import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as CartIcon} from './../Assets/cart.svg'
import { ReactComponent as ArrowUp} from './../Assets/arrow-up.svg'
import { fetchCategories } from '../Store/redux/reducers/categories';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Surface = styled.div`
  display:flex;
  position : absolute;
  min-height : 80px;
  width: 100%;
  align-items: center;
  padding: 0 80px;
  background-color:#FFF ;
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
  }
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

const CurrencyDropDown = styled.div`
  display: flex ;
  align-items: center;
  padding: 0 15px;
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
  height: 15px;
  width: 10px;
`

class Header extends Component {

    constructor(props) {
      super(props);
    }
    
    componentDidMount() {
      this.props.fetchCategories();
    }

    render() {
    if (!this.props.categories.loading=="succeeded") {
      return (
          <div className="loading">
              <div className="loader"></div>
          </div>
      );
    }else{
      return (
        <Surface>
          <Navigation>
            {(this.props.categories.loading=="succeeded")&&this.props.categories.categories.map((item, i)=>{
              return <p key={i}><Link to={{ pathname: `/${item.name}`,state: { products: item.products} }}>{item.name}</Link></p>
            })}
          </Navigation>
          <Logo>
            <img src='/logo.svg' alt='React Clothing' />
          </Logo>
          <Actions>
            <CurrencyDropDown><a href="">$</a><ArrowUpStyled/></CurrencyDropDown>
            <CurrencyDropDown><CartIconStyled/></CurrencyDropDown>
          </Actions>
        </Surface>
      )
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps, { fetchCategories })(Header);