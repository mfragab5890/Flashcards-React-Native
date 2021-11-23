import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Score extends React.Component {
  render() {
    const {
      correctQuestions,
      totalQuestions,
      navigation,
      deckId,
      restartQuiz
    } = this.props

    return (
      <View style = {styles.container}>
        <View style = { styles.item }>
          <Text style = { [styles.header, { color:"green" }] }>
            Congrats you finshed this quiz and your score is
          </Text>
          <Text style = { styles.header }>{correctQuestions}/{totalQuestions}</Text>
        </View>
        <View style = {{ flex : 1 }}>
          <TouchableOpacity
            style = {[styles.btn, styles.bottom]}
            onPress = {() => navigation.navigate('Decks')}
          >
            <Text style = {styles.subHeader}>Back To Decks!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {[styles.btn, styles.bottom]}
            onPress = {() => restartQuiz()}
          >
            <Text style = {styles.subHeader}>Restart Quiz!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {[styles.btn, styles.bottom]}
            onPress = {() => navigation.navigate('Deck',{ deckId: deckId })}
          >
            <Text style = {styles.subHeader}>Back To {deckId}!</Text>
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
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  btn:{
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
    borderColor: '#302718',
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: 5,
    margin: 5,
    marginVertical: 10,
    padding: 5,
    height: '20%',
    width: 200
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderBottomColor: 'brown',
    marginTop:10,
  }
})
