import React from 'react';

import QRStreamHome from './src/qrshome';
import QRStreamResult from "./src/qrsresult";
import QRStreamCapture from "./src/qrscapture";

export default class QRStream extends React.Component {
  constructor(props) {
    super(props);

    this.goHome = this.goHome.bind(this);
    this.newCapture = this.newCapture.bind(this);
    this.showResult = this.showResult.bind(this);
    this.state = {
      status: -1,
      metadata: {},
      content: ""
    }
  }

  goHome = () => {
    this.setState({status: -1});
  }
  newCapture = () => {
    this.setState({status: 0});
  }
  showResult = (metadata, content) => {
    this.setState({status: 2, metadata: metadata, content: content});
  }

  render() {
    let page = <QRStreamHome/>

    switch (this.state.status) {
      case -1:
        page = <QRStreamHome onGoHome={this.goHome} onNewCapture={this.newCapture}/>;
        break;
      case 2:
        page = <QRStreamResult metadata={this.state.metadata} content={this.state.content} onGoHome={this.goHome} onNewCapture={this.newCapture}/>
        break;
      case 0:
      case 1:
        page = <QRStreamCapture onGoHome={this.goHome} showResult={this.showResult}/>
        break;
      default:
        page = <View />;
        break;
    }

    return page;
    // return <QRStreamResult metadata={{}}/>
  }
}
