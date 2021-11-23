import React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NoCards() {
  return (
    <View style = {{flex:1, justifyContent:'center'}}>
      <View style = {styles.container}>
        <MaterialIcons name="error-outline" size={60} color="black" />
        <Text style = {styles.txt}> Sorry This Deck Is Empty You Can create some Cards To Start A Quiz!</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 15,
    padding: 25,
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
  txt: {
    fontSize: 30,
    textAlign: 'center',

  }
})
