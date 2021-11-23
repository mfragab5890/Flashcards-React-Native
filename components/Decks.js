import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

class Decks extends React.Component {
  state = {
    opacity: new Animated.Value(0.99),
  }

  async componentDidMount(){
    const { dispatch } = this.props
    const FLASHCARDS_KEY = 'Flachcards:cards'
    await AsyncStorage.removeItem(FLASHCARDS_KEY)
    await dispatch(handleInitialData())

  }

  onDeckPress = async (item) => {
    const { navigation } = this.props
    const { opacity } = this.state
    await Animated.timing(opacity, {toValue:0, duration:300, useNativeDriver: true}).start()
    setTimeout(() => {
      navigation.navigate('Deck', { deckId: item })
    }, 300)
    setTimeout(() => {
      Animated.timing(opacity, {toValue:0.99, duration:500, useNativeDriver: true}).start()
    }, 300)
  }

  renderItem = ({item}) => {
    const { title, questions } = this.props.decks[item]
    return (
      <TouchableOpacity
        style = {{flex:1}}
        onPress = {() => this.onDeckPress(item)}
      >
        <View style = {styles.item}>
          <Text style = {styles.header}>{title}</Text>
          <Text style = {styles.subHeader}>{questions && questions.length} Cards</Text>
        </View>
      </TouchableOpacity>

    );
  }
  render(){
    const { decks } = this.props
    const { opacity } = this.state
    const decksLength = Object.keys(decks).length
    if (decksLength > 0) {
      return (
        <Animated.View style = {{opacity:opacity}}>
          <FlatList
            data = {Object.keys(decks)}
            renderItem = {this.renderItem}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}
          />
      </Animated.View>
      );
    }
    else {
      return (
        <View style = { [styles.item, {borderWidth:5, borderColor:'black'}] } >
          <MaterialCommunityIcons name='cards' size={70} color = 'black' />
          <Text style = { styles.header } >
            You Currently Don't Have Any Decks Please Create A New Deck.
          </Text>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  item:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DED1BD',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 10,
    borderBottomColor: '#302718'
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
})

const mapStateToProps = (decks) => {
  return {
    decks,
  }
}


export default connect(mapStateToProps)(Decks)
