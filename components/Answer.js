import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Answer extends React.Component {
  render() {
    const { answer, userAnswer, flipCard, nextQuestion, lastQuestion } = this.props
    const rightAnswer = "Right, Good Jop!"
    const wrongAnswer = "Wrong, Don't worry next time you will do better"

    return (
      <View style = { styles.container }>
        <View style = { styles.item }>
          <Text style = { [styles.subHeader, { color:"green" }] }>The Correct Answer is:</Text>
          <Text style = { styles.subHeader }>{answer}</Text>
          {
            !flipCard && (
              <Text style = { [styles.subHeader, { color:"green" }] }>
                Your Answer Was {userAnswer? rightAnswer : wrongAnswer}
              </Text>
            )
          }
        </View>
        <View style = {{ flex : 1 }}>
          <TouchableOpacity
            style = {[styles.btn, styles.bottom]}
            onPress = {() => nextQuestion(true)}
          >
            <Text style = {styles.subHeader}>{lastQuestion !== 1 ? 'Next Question' : 'View Score'}</Text>
          </TouchableOpacity>
          <View style = {{flex:1}}></View>
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
    justifyContent: 'flex-start',
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
    width: '70%'
  },
  bottom: {
    flex : 0.5,
    borderBottomColor: 'brown',
    marginTop:10,
  }
})
