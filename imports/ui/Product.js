import React, { Component } from 'react';

// Product component - represents a single product item
export default class Product extends Component {
  render() {
    return (
      <li>{this.props.product.detail}</li>
    );
  }
}