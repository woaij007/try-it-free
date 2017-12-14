import React, { Component } from 'react';

import Product from './Product.js';

// App component - represents the whole app
export default class App extends Component {
  getProducts() {
    return [
      {_id: 1, name: '装饰假花', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1571.png'], contact: 'WeChat ID: pingjiaxin0530', number: 5, detail: '装饰假花，免费测评需要联系我', userId: '100', active: true, priority: 1, sponsered: false},
      {_id: 2, name: '凝胶坐垫', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1569.png'], contact: 'WeChat ID: pingjiaxin0530', number: 4, detail: '凝胶坐垫，免费测评需要联系我', userId: '100', active: true, priority: 3, sponsered: false},
      {_id: 3, name: '杯托', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1570.png'], contact: 'WeChat ID: pingjiaxin0530', number: 6, detail: '杯托，免费测评需要联系我', userId: '100', active: true, priority: 2, sponsered: false}
    ];
  }

  renderProducts() {
    console.log('123');
    return this.getProducts().map((product) => {
      return (
        <Product key={product._id} product={product} />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Try It Free</h1>
        </header>

        <ul>
          {this.renderProducts()}
        </ul>
      </div>
    );
  }
}

