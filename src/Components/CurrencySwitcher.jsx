import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as ArrowUp } from './../Assets/arrow-up.svg'
import { setCurrency } from '../Store/redux/reducers/currencies';

/* The container <div> - needed to position the dropdown content */
const SwitcherDiv = styled.div`
  position: relative;
  display: inline - block;
`

const SwitcherContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 114px;
    box-shadow: 0px 4px 35px 0px rgb(168 172 176 / 19%);
    z-index: 1;
    top: -7px;
    left: -48px;
    &:hover {
      display: block;
    }
`

const SwitcherButton = styled.button`
  background-color: #FFF;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  line-height: 28.8px;
  flex-wrap: nowrap;
  padding: 0 7px;
`

const Container = styled.div`
  &:hover ${SwitcherContent} {
    display: block;
  }
`


const Currency = styled.div`
    font-weight:500 !important;
    padding: 5px 10px;
    cursor: pointer;
    &:hover{
      background-color:#EEE;
    }
`

const ArrowUpStyled = styled(ArrowUp)`
    line-height: 28.8px;
    padding-left: 9px;
    height: 11px;
    width: 22px;
    align-items: center;
    justify-content: center;
`

class CurrencyList extends Component {
  render() {
    return (
      <Container>
          {/* rEDUCER cURRENCY vALUE */}
        <SwitcherButton>{ this.props.currencies.currentCurrency.symbol}<ArrowUpStyled /></SwitcherButton>
        <SwitcherDiv>
          <SwitcherContent>
            {
              this.props.currencies.currencies.map((item, i) => {
                // eslint-disable-next-line 
                return <Currency key={i} onClick={() => { this.props.setCurrency(item) }} ><a >{item.symbol} {item.label}</a><br /></Currency>
            })}
          </SwitcherContent>
        </SwitcherDiv>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    currencies: state.currencies
  };
};

export default connect(mapStateToProps, { setCurrency })(CurrencyList);
