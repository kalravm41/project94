import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Platform,
    TextInput,
  } from "react-native";
  import {Header,Icon,Card, Avatar} from 'react-native-elements';
  import * as ImagePicker from 'expo-image-picker';
  import firebase from 'firebase';
  import db from '../config';

  export default class find extends Component{
      render(){
          return(
              <View>
                  <html>
                      <head>
                      <script defer>
                         
                      </script>
                      <script src='  '></script>

                      <title>Face Recognition</title>
                      
                      </head>

                      <body>
                        <input type="file" id="imageUpload"/>
                      </body>
                      
                  </html>
              </View>
          );
      }
  }