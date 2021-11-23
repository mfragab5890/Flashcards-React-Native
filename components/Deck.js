import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { fetchDeckCards } from '../utils/api'
import { handleDeleteDeck } from '../actions'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'

class Deck extends React.Component {
  onDeleteDeck = (title) => {
    const { dispatch, navigation } = this.props
    dispatch(handleDeleteDeck(title))
    navigation.navigate('Decks')
  }
  onStartQuiz = () => {
    const { navigation, deck } = this.props
    const { questions, title } = deck
    if(questions.length === 0){
      return navigation.navigate("NoCards")
    }
    const answersPool = questions.map((question) => {
      return question.answer
    })
    return navigation.navigate('Quiz', {
      deckId: title,
      questions,
      answersPool,
     })
  }

  render(){
    const title = this.props.navigation.state.params.deckId
    const { navigation, deck } = this.props
    return (
      <View style = {styles.container}>
        <View style = {styles.item}>
          <Text style = {styles.header}>{title}</Text>
          <Text style = {styles.subHeader}>{deck && deck.questions.length} Cards</Text>
          <MaterialCommunityIcons name={deck && deck.questions.length >1?'cards':'card-text'} size={45} color={'#4A6163'} />
        </View >
        <View style={{flex:0.5}}></View>
        <View style = {{flex:1, justifyContent: 'space-between',}}>
          <TouchableOpacity
            style = {[styles.btn, {borderBottomColor: '#4A6163'}]}
            onPress = {() => navigation.navigate('NewCard', { deckId: title })}
          >
            <MaterialCommunityIcons name="card-plus" size={35} color="black" />
            <Text style = {styles.header}>Add Card!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {[styles.btn, {borderBottomColor: 'green'}]}
            onPress = {this.onStartQuiz}
          >
            <MaterialCommunityIcons name="pencil-box-multiple" size={40} color="green" />
            <Text style = {styles.header}>Start Quiz!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {[styles.btn, {borderBottomColor: '#DB0038'}]}
            onPress = {() => this.onDeleteDeck(title)}
          >
          <MaterialCommunityIcons name="delete-circle" size={35} color="red" />

              <Text style = {styles.subHeader}>Delete Deck!</Text>
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
    flex: 0.5,
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
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#302718',
    borderBottomWidth: 4,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  }
})

const mapStateToProps = (decks, {navigation}) => {
  const title = navigation.state.params.deckId
  const deck = decks[title]
  return {
    deck,
  }
}

export default connect(mapStateToProps)(Deck)
