import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactComponent as ArrowUp } from "./../Assets/arrow-up.svg";
import { setCurrency } from "../Store/redux/reducers/currencies";
import { setCartCurrency } from "../Store/redux/reducers/cart";
import { setShowCurrency } from "../Store/redux/reducers/currencies";
import { setShowCart } from "../Store/redux/reducers/cart";
/* The container <div> - needed to position the dropdown content */
const SwitcherDiv = styled.div`
  position: relative;
  display: inline - block;
  z-index:10;
`;

const SwitcherContent = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 114px;
  box-shadow: 0px 4px 35px 0px rgb(168 172 176 / 19%);
  z-index: 1;
  top: 24px;
  left: -60px;
  a {
    size: 18px;
    text-transform: uppercase;
    padding: 0 15px;
    line-height: 28.8px;
    flex-wrap: nowrap;
    padding: 0 7px;
  }
`;

const SwitcherButton = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  line-height: 28.8px;
  flex-wrap: nowrap;
  padding: 0 7px;
`;

const Container = styled.div``;

const Currency = styled.div`
  font-weight: 500 !important;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const ArrowUpStyled = styled(ArrowUp)`
  line-height: 28.8px;
  margin-left: 9px;
  height: 12px;
  width: 12px;
  align-items: center;
  justify-content: center;
  transform: ${(props) => (props.isOpen ? "rotate(0deg)" : "rotate(180deg)")};
`;

class CurrencyList extends Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.onClickOutside && this.props.onClickOutside();
      this.props.onClickOutside && console.log("yo it works");
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  };

  render() {
    return (
      <Container>
        {/* rEDUCER cURRENCY vALUE */}
        <SwitcherButton
          onClick={() => {
            this.props.setShowCurrency(!this.props.currencies.showCurrency);
            this.props.setShowCart(false);
          }}
        >
          {this.props.currencies.currentCurrency.symbol}
          <ArrowUpStyled isOpen={this.props.currencies.showCurrency} />
        </SwitcherButton>
        <SwitcherDiv>
          {this.props.currencies.showCurrency && (
            <SwitcherContent>
              {this.props.currencies.currencies.map((item, i) => {
                // eslint-disable-next-line
                return (
                  <Currency
                    key={i}
                    onClick={() => {
                      this.props.setCurrency(item);
                      this.props.setCartCurrency(item);
                      this.props.setShowCurrency(
                        !this.props.currencies.showCurrency
                      );
                    }}
                  >
                    <a onClick={(e)=>e.preventDefault()} href="/#">
                      {item.symbol} {item.label}
                    </a>
                    <br />
                  </Currency>
                );
              })}
            </SwitcherContent>
          )}
        </SwitcherDiv>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currencies: state.currencies,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, {
  setCurrency,
  setCartCurrency,
  setShowCurrency,
  setShowCart,
})(CurrencyList);
