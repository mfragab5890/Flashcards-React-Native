import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { handleAddDeckCard } from '../actions'

class NewCard extends React.Component {
  state = {
    question : '',
    answer : '',
  }

  onChangeQuestion = (question) => {
    this.setState({
      question : question
    })
  }
  onChangeAnswer= (answer) => {
    this.setState({
      answer : answer
    })
  }

addNewCard = async () => {
  const { question, answer } = this.state

  if (question === '') {
    return alert("Sorry question Can't be embty! ");
  }
  if (answer === '') {
    return alert("Sorry answer Can't be embty! ");
  }

  const deckId = this.props.navigation.state.params.deckId
  const { dispatch, navigation } = this.props
  const card = {
    question,
    answer,
  }
  await dispatch(handleAddDeckCard(deckId,card))
  await Keyboard.dismiss()
  navigation.navigate('Deck', { deckId: deckId })
}

  render(){
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style = {styles.container}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style = {styles.header}>Question?</Text>
            <TextInput
              value = {this.state.question}
              style = {styles.txtInput}
              placeholder="Enter Card Question Here"
              onChangeText={this.onChangeQuestion}
              />
            <Text style = {styles.header}>Answer?</Text>
            <TextInput
              value = {this.state.answer}
              style = {styles.txtInput}
              placeholder="Enter The Correct Answer Here"
              onChangeText={this.onChangeAnswer}
              />
            <View style = {styles.btnContainer}>
            <TouchableOpacity
              onPress = {this.addNewCard}
              style = {[styles.btn, {borderBottomColor: '#E3D477'}]}
              >
              <MaterialCommunityIcons name="plus" size={35} color="#E3D477" />
              <Text style = {styles.subHeader}> Create New Card!</Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
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
  btnContainer: {
    marginTop: 12
  },
  btn:{
    backgroundColor: '#302718',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 4,
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
  txtInput: {
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid',
    borderLeftColor: '#302718',
    borderLeftWidth: 10,
    padding: 5,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
    height: 70,
    width: '95%',
    alignSelf: 'center',
    margin: 10,
  }
})


export default connect()(NewCard)
