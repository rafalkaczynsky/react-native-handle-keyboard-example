import React, { Component } from 'react';
import { View, Text, TextInput, Platform, Image, Animated, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native';
import logo from './logo.png';

var IMAGE_HEIGHT = 200
var IMAGE_HEIGHT_SMALL = 80

export default class App extends Component {
  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);

    if (Platform.OS === 'android') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
      Animated.timing(this.imageHeight, {
        toValue: IMAGE_HEIGHT_SMALL,
      }).start();
    
  };

  keyboardWillHide = (event) => {
    console.log('keyboarWillHide')
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  
  };

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'android' ? -300 : 0}
        style={styles.container}
        behavior="padding"
      >
          <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
          <Text style={styles.label}>React Native app respond gracefully when the keyboard pops up</Text>
          <View style={{width: '100%'}}> 
          <TextInput
            placeholder="Email"
            style={styles.input}
            underlineColorAndroid='transparent'
          />
          <TextInput
            placeholder="First Name"
            style={styles.input}
            underlineColorAndroid='transparent'
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            underlineColorAndroid='transparent'
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            underlineColorAndroid='transparent'
          />
          </View>
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding:20,
    backgroundColor: 'lightblue',
  },
  logo: {
    resizeMode: 'contain'  
  },
  input: {
    height: 40, 
    borderColor: 'grey', 
    backgroundColor: 'white', 
    borderWidth: 1, 
    marginBottom: 10, 
    fontSize: 12, 
    paddingLeft: 10
},
  label: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
