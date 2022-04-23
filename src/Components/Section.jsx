import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';

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

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #FFF;
`;

const ProductImage = styled.img`
  max-width:354px;
  max-height:330px;
  object-fit:scale-down ;
`

const ProductName = styled.div`
  font-weight: 300;
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

class Section extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      if (!this.props.categories.loading=="succeeded") {
      return (
          <div className="loading">
              <div className="loader"></div>
          </div>
      );
      }else{
        console.log(this.props)
        return (
        <Wrap>
          <Heading>{this.props.category}</Heading>
          <Grid>
              {this.props.products.map((item, i)=>{
                  return  (
                    <ProductCard key={i}>
                      <ProductImage src={item.gallery[0]}/>
                      <ProductName>
                        {item.name}
                      </ProductName>
                      <ProductPrice>
                        &#x24;{item.prices[0].amount}
                      </ProductPrice>
                    </ProductCard>
                  )
              })}
        </Grid>
        </Wrap>)
      }
  }
};

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps, null)(Section);