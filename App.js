import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Alert } from 'react-native';
import Camera from 'react-native-camera';

export default class App extends Component {

    takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  onBarCodeRead(qr) {
    if( !this.readed ){
      Alert.alert(JSON.stringify(qr.data));
      this.readed = true;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality={Camera.constants.CaptureQuality.high}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          barCodeTypes={[
          	Camera.constants.BarCodeType.QR,
          ]}
          >
    
          <Text style={styles.capture} >Point the camera at the QR Code </Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 150,
    marginBottom: 150,
    marginLeft: 30,
    marginRight: 30,
    
  },
  capture: {
    flex: 0,
    color: '#fff',
    font: 10
  },
});