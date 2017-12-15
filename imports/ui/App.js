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
      {_id: 1, key: 1, name: '装饰假花', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1571.png'], contact: 'WeChat ID: pingjiaxin0530', number: 5, category: '家居', detail: '装饰假花，免费测评需要联系我', userId: '100', active: true, priority: 1, sponsered: false},
      {_id: 2, key: 2, name: '凝胶坐垫', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1569.png'], contact: 'WeChat ID: pingjiaxin0530', number: 4, category: '家居', detail: '凝胶坐垫，免费测评需要联系我', userId: '100', active: true, priority: 3, sponsered: false},
      {_id: 3, key: 3, name: '杯托', picture: ['https://s3-us-west-2.amazonaws.com/try-it-free-images/WechatIMG1570.png'], contact: 'WeChat ID: pingjiaxin0530', number: 6, category: '家居', detail: '杯托，免费测评需要联系我', userId: '100', active: true, priority: 2, sponsered: false}
    ];
  }

  state = {
    filterNameDropdownVisible: false,
    filterDetailDropdownVisible: false,
    data: this.getProducts(),
    searchNameText: '',
    searchDetailText: '',
    nameFiltered: false,
    detailFiltered: false,
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

  onNameInputChange = (e) => {
    this.setState({ searchNameText: e.target.value });
  }
  onSearchName = () => {
    // reset state data to do filter
    const data = this.getProducts();
    // when detail already filtered 
    if (this.state.detailFiltered) {
      // if name also filtered, reset nameFiltered
      if(this.state.nameFiltered) {
        this.state.detailFiltered = false;
      } else { // but name not filtered, keep detail filtered results
        data = this.state.data;
      }
    }

    // if search text is empty, set nameFiltered to false, do nothing
    if(!this.state.searchNameText) {
      return this.setState({
        filterNameDropdownVisible: false,
        nameFiltered: !!searchNameText,
        data: data
      });
    }
  
    const { searchNameText } = this.state;
    const reg = new RegExp(searchNameText, 'gi');
    this.setState({
      filterNameDropdownVisible: false,
      nameFiltered: !!searchNameText,
      data: data.map((record) => {
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
  onDetailInputChange = (e) => {
    this.setState({ searchDetailText: e.target.value });
  }
  onSearchDetail = () => {
    // reset state data to do detail filter
    const data = this.getProducts();
    // when name already filtered 
    if (this.state.nameFiltered) {
      // And detail also filtered, reset nameFiltered
      if (this.state.detailFiltered) {
        this.state.nameFiltered = false;
      } else { // if detail not filtered, keep name filtered results
        data = this.state.data;
      }
    }

    // if search text is empty, don't do detail filter
    if(!this.state.searchDetailText) {
      return this.setState({
        filterDetailDropdownVisible: false,
        detailFiltered: !!searchDetailText,
        data: data
      });
    }

    const { searchDetailText } = this.state;
    const reg = new RegExp(searchDetailText, 'gi');
    this.setState({
      filterDetailDropdownVisible: false,
      detailFiltered: !!searchDetailText,
      data: data.map((record) => {
        const match = record.detail.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          detail: (
            <span>
              {record.detail.split(reg).map((text, i) => (
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
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a._id - b._id,
    },{
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
            value={this.state.searchNameText}
            onChange={this.onNameInputChange}
            onPressEnter={this.onSearchName}
          />
          <Button type="primary" onClick={this.onSearchName}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.nameFiltered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterNameDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterNameDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.number - b.number,
    }, {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [{
        text: '电子',
        value: '电子',
      }, {
        text: '儿童',
        value: '儿童',
      }, {
        text: '运动户外',
        value: '运动户外',
      }, {
        text: '家居',
        value: '家居',
      }, {
        text: '办公／文具',
        value: '办公／文具',
      }, {
        text: '珠宝服饰',
        value: '珠宝服饰',
      }],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    }, {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search detail"
            value={this.state.searchDetailText}
            onChange={this.onDetailInputChange}
            onPressEnter={this.onSearchDetail}
          />
          <Button type="primary" onClick={this.onSearchDetail}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.detailFiltered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDetailDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDetailDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
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

