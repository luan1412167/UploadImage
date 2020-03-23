import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './styles/index.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SliderAntd from "./components/Carousel_antd";

import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from '@fullpage/react-fullpage';
import { message, Button} from 'antd';
import axios from 'axios';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const success = () => {
  message
    .loading('Action in progress..', 2.5)
    .then(() => message.success('Loading finished', 2.5))
    .then(() => message.info('Loading finished is finished', 2.5));
};

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      // {
      //   uid: '-2',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    ],
    imgs: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) =>
  { 
    console.log(fileList.length)
    this.setState({ fileList })
  };

  handleClick(fileList) {
    console.log("sent request ", fileList.length)
    async function response(fileList) {
        let formData = new FormData();
        formData.append("img1", fileList[0].originFileObj);
        formData.append("img2", fileList[1].originFileObj);
        // console.log("sent request");
        return await axios
        .post("http://localhost:1305/similarity", formData)
        .then(res => {
          // console.log("res", res);
          return res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
      };

    message
    .loading('Action in progress..', 2.5)
    .then(() => {
      response(fileList).then(res =>
        { console.log(res)
          if (res==true) {message.success('match two img', 2.5)}
          else{message.success('not match two img', 2.5)}})})
    // .then(() => message.info('Loading finished is finished', 2.5));
  }

  onLeave(origin, destination, direction) {
    console.log("Leaving section " + origin.index);
  }
  afterLoad(origin, destination, direction) {
    console.log("After load: " + destination.index);
  }

  render() {
    const { previewVisible, previewImage, fileList, imgs } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const style_div = {
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    };
    return (

      <ReactFullpage
      scrollOverflow={true}
      sectionsColor={["orange", "purple", "green"]}
      onLeave={this.onLeave.bind(this)}
      afterLoad={this.afterLoad.bind(this)}
      render={({ state }) => {
        return (
            <div id="fullpage-wrapper">
              <div className="section section1">
                <SliderAntd>
                </SliderAntd>
              </div>
              <div className="section">
                <div style={style_div}>
                  <Upload style={style_div}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 2 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                  <Button onClick={() => this.handleClick(fileList)} type="primary">Submit</Button>
                </div>

              </div>
            </div>
                     
        );
      }}
    />
    );
  }
}

ReactDOM.render(<PicturesWall />, document.getElementById('container'));

          {/* <SliderAntd className="section section1"/> */}
          {/* <Row className="section">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Row> */}