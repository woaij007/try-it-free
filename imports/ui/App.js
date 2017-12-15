import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';

// App component - represents the whole app
export default class App extends Component {

  getProducts() {
    return [
      {_id: 1, key: 1, name: '装饰假花', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1571.png'], contact: 'WeChat ID: pingjiaxin0530', number: 5, detail: '装饰假花，免费测评需要联系我', userId: '100', active: true, priority: 1, sponsered: false},
      {_id: 2, key: 2, name: '凝胶坐垫', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1569.png'], contact: 'WeChat ID: pingjiaxin0530', number: 4, detail: '凝胶坐垫，免费测评需要联系我', userId: '100', active: true, priority: 3, sponsered: false},
      {_id: 3, key: 3, name: '杯托', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1570.png'], contact: 'WeChat ID: pingjiaxin0530', number: 6, detail: '杯托，免费测评需要联系我', userId: '100', active: true, priority: 2, sponsered: false}
    ];
  }

  state = {
    filterDropdownVisible: false,
    data: this.getProducts(),
    searchText: '',
    filtered: false,
    previewVisible: false,  // 是否显示图片预览modal
    previewImages: [] // 要预览的图片
  };

  /**
   * 点击图片时显示幻灯片
   *
   * @param text
   */
  onClickImagePreview = (text) => {
    const newImageArray = [];
    if (typeof(text) === 'string' && text.length > 0) {
      newImageArray.push({original: text, thumbnail: text, alt: '图片加载失败'});
    } else if (text instanceof Array) {
      for (const tmp of text) {
        newImageArray.push({original: tmp, thumbnail: tmp, alt: '图片加载失败'});
      }
    }
    // 如果没有图片, 点击就不要显示modal
    if (newImageArray.length > 0) {
      this.setState({previewVisible: true, previewImages: newImageArray});
    }
  };

  /**
   * 隐藏图片预览
   */
  cancelPreview = () => {
    this.setState({previewVisible: false});
  };

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.getProducts().map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight" key={i}>{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
  render() {
    const columns = [{
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: (text, row, index) => {
        return <img src={text[0]} alt="图片加载失败" style={{width: '100%'}} onClick={e => this.onClickImagePreview(text[0])} className="custom-product-picture" />;
      }
    },{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: 'Number',
      dataIndex: 'number',
      key: 'number'
    }, {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      filters: [{
        text: '假花',
        value: '假花',
      }, {
        text: '杯托',
        value: '杯托',
      }],
      onFilter: (value, record) => record.detail.indexOf(value) === 0,
    }];
    return (
      <div className="container">
        <header>
          <h1>Try It Free</h1>
        </header>
        {/*用于图片预览的modal*/}
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageGallery showThumbnails={false} showPlayButton={false} showFullscreenButton={false} items={this.state.previewImages} />
        </Modal>
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}

