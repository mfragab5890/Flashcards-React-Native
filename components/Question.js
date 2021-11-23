import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Question extends React.Component {
  render() {
    const { question, answer, randomAnswer, submitAnswer } = this.props
    const correct = answer === randomAnswer ? true : false
    return (
      <View style = { styles.container }>
        <View style = { styles.item }>
          <Text style = { [styles.subHeader, { color:"green" }] }>Question :</Text>
          <Text style = { styles.subHeader }>{question}</Text>
          <Text style = { [styles.subHeader, { color:"green" }] }>Suggested Answer :</Text>
          <Text style = { styles.subHeader }>{randomAnswer}</Text>
        </View>
        <View style = {styles.btnGroup}>
          <TouchableOpacity
            style = {[styles.btn, {borderBottomColor: 'green'}]}
            onPress = {() => submitAnswer(correct ? true : false)}
          >
            <Text style = {styles.subHeader}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {[styles.btn, {borderBottomColor: 'red'}]}
            onPress = {() => submitAnswer(correct ? false : true)}
          >
            <Text style = {styles.subHeader}>Incorrect</Text>
          </TouchableOpacity>
        </View>
        <View style = {{ flex : 1 }}>
          <TouchableOpacity
            style = {[styles.btn, styles.bottom]}
            onPress = {() => submitAnswer('flipCard')}
          >
            <Text style = {styles.subHeader}>flip Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  item:{
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 5
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
  btn:{
    flex:1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#302718',
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: 5,
    margin: 5,
    marginVertical: 10,
    padding: 5,
    width: '50%'
  },
  btnGroup: {
    flex:1,
    justifyContent: 'flex-start',
    width:'95%',
    borderBottomWidth:5,

  },
  bottom: {
    flex : 0.5,
    borderBottomColor: 'brown',
    marginTop:10,
  }
})
