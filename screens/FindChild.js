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

  export default class FindChild extends Component{
      constructor(){
          super();
          this.state={
              Image: '',
              userId: firebase.auth().currentUser.email,
              name: '',
              docId: ''
          }
      }

      selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!cancelled) {
          this.uploadImage(uri, this.state.userId);
        }
      };

      uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
    
        var ref = firebase
          .storage()
          .ref()
          .child("user_Images/" + imageName);
    
        return ref.put(blob).then((response) => {
          this.fetchImage(imageName);
        });
      };

      fetchImage = (imageName) => {
        var storageRef = firebase
          .storage()
          .ref()
          .child("user_Images/" + imageName);
    
        // Get the download URL
        storageRef
          .getDownloadURL()
          .then((url) => {
            this.setState({ Image: url });
            console.log(url);
          })
          .catch((error) => {
            this.setState({ Image: "#" });
            console.log(error);
          });
      };

      getUserProfile() {
        db.collection("users")
          .where("email_id", "==", this.state.userId)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({
                name: doc.data().first_name,
                Image: doc.data().user_Images,
                docId: doc.id
              });
            });
          });
      }

      updateUri=()=>{
          db.collection('users').doc(this.state.docId).update({
              user_Images: this.state.Image
          })
      }



    componentDidMount() {
        this.fetchImage(this.state.userId);
        this.getUserProfile();
      }

      render(){
          return(
              <View style={{flex:1}}>
                <Header
                   leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
                   centerComponent={{ text: 'Find Child', style: { color: '#000', fontSize:20,fontWeight:"bold", } }}
                   backgroundColor='#fff'
                 />
                  <ImageBackground source={require('../assets/HomeImg.jpg')} style={styles.image}>
                      <View style={styles.card}>
                          <Card containerStyle={{width: 700, height: 700}} dividerStyle={{width:4,height:4}}>
                          <Card.Title style={styles.cardtitle}>Add Child's Picture</Card.Title>         

                          <Card.Divider/>  


                          <View style={{margin: 15}}> 
                               <Avatar
                                rounded
                                source ={{
                                    uri: this.state.Image
                                }}
                                size='xlarge'
                                containerStyle={styles.imageContainer}/>
                            </View>   

                             <View style={{margin: 15}}>
                             <TouchableOpacity style={styles.button} onPress={()=>{this.selectPicture();}}>
                                <Text style={styles.buttonText}>Pick Image Of the kidnapped Child</Text>
                            </TouchableOpacity>
                            </View> 

                            <View style={{margin: 15}}> 
                            <TouchableOpacity style={styles.button1} onPress={()=>{this.updateUri()}}>
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>                            
                            </View>                                       
                          </Card>
                      </View>
                  </ImageBackground>
              </View>
          );
      }
  }  const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems: 'center',
     justifyContent: 'center'
   },
   card:{
    flex:1,
    alignItems: 'Right',
    justifyContent: 'Right'
  },
   formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#000',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    fontWeight: 'bold'
  },
  attribute :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    color: '#000'
  },
  cardtitle :{
    flex:1,
    fontSize: 35,
    justifyContent:'center',
    alignItems:'center',
    fontStyle: 'Bold',
  },
  button:{
    width:"85%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    marginLeft: 15,
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
    button1:{
        width:"85%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#00ff00",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        marginLeft: 15,
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },
    buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"#fff"
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      imageContainer:{
        width: 500,
        height: 300,
        marginTop: 20,
        borderRadius: 5,
        alignSelf: 'center'
      },
})

