import React, { Component } from 'react'
import styled from 'styled-components';

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

class ProductImageSection extends Component {
    state = {
        currentImage: this.props.gallery[0],
    };

    render() {
        return (
            <>
            <Images>
                {this.props.gallery.map((item, i) => {
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
            </>
        );
        }
    }

export default ProductImageSection;