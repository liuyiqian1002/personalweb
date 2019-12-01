import React, { Component } from 'react';
// import RichTextEditor from 'react-rte';
// import CKEditor from 'react-ckeditor-component';
import LzEditor from './editor/index';

export default class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: '',
      fileList: this.init(this.props.value),
    };
    this.receiveHtml = this.receiveHtml.bind(this);
  }

  init = (linkUrl) => {
    return [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ];
    return [
      {
        uid: -1,
        name,
        status: 'done',
        linkUrl,
      },
    ];
  };

  componentDidMount() {
    this.setState({ htmlContent: this.props.importContent ? this.props.importContent : '' });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      htmlContent: nextProps.importContent ? nextProps.importContent : '',
    });
  }

  receiveHtml(content) {
    this.props.onChange(content);
    this.setState({ fileList: [] });
  }

  onChange = (data) => {
    const { fileList } = data;
    let { value } = this.state;
    fileList.forEach((item) => {
      item.url = item.thumbUrl;
      if (item.response && item.response.code === 200) {
        value = JSON.parse(item.response.data)[0].linkUrl;
      }
    });
    this.setState({ fileList, value });
    if (data.file && data.file.response && data.file.response.code === 200) {
      // if (this.props.onChange) {
      //   this.props.onChange(value);
      // }
    }
  };

  render() {
    const uploadProps = {
      // action: '/hallManage/tool/upload/image?prefix=1&fileType=15',
      action: 'http://192.168.1.190/hallManage/tool/upload/image?prefix=1&fileType=15',
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.fileList,
      data: (file) => {
        console.log(file);
      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true,
    };
    console.log(this.state.fileList);
    return (
      <LzEditor
        active
        importContent={this.state.htmlContent}
        cbReceiver={this.receiveHtml}
        uploadProps={uploadProps}
        video={false}
        audio={false}
      />
    );
  }
}
