import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom';
import styled from 'styled-components';
import { ReactComponent as CartIcon} from './../Assets/cartwhite.svg'

const Wrap = styled.div`
    background:#FFF;
    padding-top: 80px ;
    padding-left: 80px ;
    padding-right: 80px ;
    padding-bottom: 80px ;
`

const Heading = styled.h2`
    text-transform:capitalize ;
    padding-top: 40px;
    padding-bottom: 40px;
    font-weight: 400;
    size: 42px;
    `;

const AddCartButton = styled.button`
    padding: 0;
    border: none;
    font: inherit;
    color: #FFF;
    background-color: #5ECE7B;
    cursor: pointer;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    position: absolute;
    bottom: 57px;
    left: 305px;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.2));
    opacity:0 ;
`
const ProductCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #FFF;
  &:hover{
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  &:hover ${AddCartButton} {
    opacity: 1;
  }
`;

const ProductLink = styled(NavLink)`

`;

const ProductOutOfStockCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #FFF;
  &:hover{
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  opacity:50% ;
`;

const OutOfStockText = styled.p`
  font-size:24px ;
  font-weight:400 ;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ProductImage = styled.img`
  max-width:354px;
  max-height:330px;
  object-fit:scale-down ;
`
const ImageContainer = styled.div`
  position: relative;
  text-align: center;
  color: white;
`

const Content = styled.div`
  padding: 16px;
`;

const CartIconStyled = styled(CartIcon)`
  align-items: center;
  justify-content: center;
  width:24px;
  height:24px;
`

const ProductName = styled.div`
  font-weight: 200;
  font-size: 18px;
  color: #1D1F22;
  align-items: center;
  padding-left:5px ;
`;

const ProductPrice = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #1D1F22;
  align-items: center;
  padding-left:5px ;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px
`;

class Category extends Component {

  render() {
      if (!this.props.categories.loading === "succeeded") {
      return (
          <div className="loading">
              <div className="loader"></div>
          </div>
      );
      }else{
        return (
        <Wrap>
          <Heading>{this.props.category}</Heading>
          <Grid>
              {this.props.products.map((item, i)=>{
                if(item.inStock){
                  return (
                    <ProductLink to={{ pathname: `/product/${item.id}`, state: { product: item} }} >
                      <ProductCard key={i}>
                        <ImageContainer>
                          <ProductImage src={item.gallery[0]}/>
                        </ImageContainer>                      
                        <AddCartButton><CartIconStyled /></AddCartButton>
                        <Content>
                            <ProductName>
                              {item.name}
                            </ProductName>
                          <ProductPrice>
                            {this.props.currencies.currentCurrency.symbol}
                            {item.prices.filter(x => x.currency.label === this.props.currencies.currentCurrency.label)[0].amount}
                            </ProductPrice>
                        </Content>
                      </ProductCard>
                    </ProductLink>)
                }else{
                  return(
                    <ProductOutOfStockCard key={i}>
                      <ImageContainer>
                        <ProductImage src={item.gallery[0]}/>
                        <OutOfStockText>OUT OF STOCK</OutOfStockText>
                      </ImageContainer>
                      <AddCartButton><CartIconStyled /></AddCartButton>
                      <Content>
                          <ProductName>
                            {item.name}
                          </ProductName>
                          <ProductPrice>
                            {this.props.currencies.currentCurrency.symbol}
                            {item.prices.filter(x => x.currency.label === this.props.currencies.currentCurrency.label)[0].amount}
                          </ProductPrice>
                      </Content>
                    </ProductOutOfStockCard>)
                }
              })}
        </Grid>
        </Wrap>)
      }
  }
};

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    currencies: state.currencies,
  };
};

export default connect(mapStateToProps, null)(Category);