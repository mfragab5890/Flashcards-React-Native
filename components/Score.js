import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Score extends React.Component {
  render() {
    const { correctQuestions, totalQuestions, navigation } = this.props

    return (
      <View style = {styles.container}>
        <View style = { styles.item }>
          <Text style = { [styles.subHeader, { color:"green" }] }>
            congrats you finshed this quiz and your score is
          </Text>
          <Text style = { styles.subHeader }>{correctQuestions}/{totalQuestions}</Text>
        </View>
        <View style = {{ flex : 1 }}>
          <TouchableOpacity
            style = {[styles.btn, styles.bottom]}
            onPress = {() => navigation.navigate('Decks')}
          >
            <Text style = {styles.subHeader}>Go Back To Your Decks!</Text>
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
    flex: 1.5,
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
    justifyContent: 'center',
    alignItems: 'stretch',
    borderBottomColor: 'brown',
    marginTop:10,
  }
})
