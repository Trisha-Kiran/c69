import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions"
import { BarCodeScanner } from "expo-barCode-scanner";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      domState:"normal",
      hasCameraPermissions:null,
      scanned:false,
      scannedData:''
    }
  }
  getCameraPermissions=()=>{
   const {status}=await Permissions.askAsync(Permissions.CAMERA)
   this.setState({
     hasCameraPermissions:status==="granted",
     domState:domState,
     scanned:false
   })
  }
  handleBarCodeScanned=async ({type,data})=>{
  this.setState({
    scannedData:data,
    domState:"normal",
    scanned:true
  })
  }
  render() {
    const{domState,hasCameraPermissions,scanned,scannedData}=this.state
    if(domState==="scanner"){
      <BarCodeScanner onBarCodeScan={scanned?undefined:this.handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}/>
      
    }
    return (
      <View style={styles.container}>
        <Text>{hasCameraPermissions?scannedData:"request for camera permission"}</Text>
        <TouchableOpacity onPress={()=>this.getCameraPermissions("scanner")}>
        <Text style={styles.text}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});
