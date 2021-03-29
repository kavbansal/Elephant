import React, { Component } from 'react';
import AboutDescription from '../item/AboutDescription';
import ProductHero from "../item/modules/views/ProductHero";
import ProductHowItWorks from "../item/modules/views/ProductHowItWorks";
import ProductValues from "../item/modules/views/ProductValues";
import ProductSmokingHero from "../item/modules/views/ProductSmokingHero";
import ProductCTA from "../item/modules/views/ProductCTA";



export default class Add extends Component {
  

  render() {
    
    return (
      <React.Fragment>
        <ProductHero />
        {/* <AboutDescription/> */}
        <ProductValues />
        <ProductHowItWorks />
        {/* <ProductCTA />
        <ProductSmokingHero /> */}
      </React.Fragment>
    );
  }
}
