import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { submitNewDeck } from '../utils/api'
import { addDeck } from '../actions'

class NewDeck extends React.Component {
  state = {
    input: ''
  }

  onChangeText = (input) => {
    this.setState({
      input : input
    })
  }

addNewDeck = async () => {
  const { input } = this.state
  const { dispatch, navigation, forbiddenNames } = this.props
  if (forbiddenNames.includes(input)) {
    return alert('Sorry A Deck With The Same Name Already Exists');
  }
  const newDeck = await submitNewDeck(input).catch(err => {console.warn('submit error',err);})
  await dispatch(addDeck(newDeck))
  await this.setState({
    input:''
  })
  await Keyboard.dismiss()
  navigation.navigate('Deck', { deckId: input })
}

  render(){
    return (
      <KeyboardAvoidingView style = {styles.container}>
        <View style = {styles.item}>
          <Text style = {styles.header}>What Is the title to your new deck?</Text>
        </View >
        <View style={{flex:1, justifyContent: 'center', alignItems: 'stretch',}}>
          <TextInput
            value = {this.state.input}
            style = {styles.txtInput}
            placeholder="Enter Deck Name here"
            onChangeText={this.onChangeText}
            />
        </View>
        <View style = {{flex:1, justifyContent: 'center', alignItems:'center' }}>
          <TouchableOpacity
            style = {[styles.btn, {borderBottomColor: '#E3D477'}]}
            onPress = {this.addNewDeck}
            >
            <MaterialCommunityIcons name="plus" size={35} color="#E3D477" />
            <Text style = {styles.subHeader}> Create Deck!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  item:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    paddingBottom: 20,
    borderRadius: 5,
    borderBottomWidth: 5
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  btn:{
    backgroundColor: '#302718',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#302718',
    borderWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    marginBottom: 20,
    height: 70,
  },
  txtInput: {
    margin: 12,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid',
    borderLeftColor: '#302718',
    borderLeftWidth: 10,
    padding: 5,
    paddingLeft: 15,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 70,
  }
})

const mapStateToProps = (decks) => {
  const forbiddenNames = Object.keys(decks)
  return {
    forbiddenNames,
  };
}

export default connect(mapStateToProps)(NewDeck)
