import React from 'react'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Question from './Question'
import Answer from './Answer'
import Score from './Score'

export default class Quiz extends React.Component {
  state = {
    randomAnswer : '',
    answerdQuestions : 0,
    totalQuestions : 0,
    questionInView : 0,
    viewAnswer : false,
    userAnswer : true,
    quizFinshed : false,
    correctQuestions : 0,
    flipCard : false
  }
  componentDidMount(){
    const { answersPool, questions } = this.props.navigation.state.params
    this.setState({
      totalQuestions : questions.length,
      randomAnswer : answersPool[Math.floor(Math.random() * (answersPool.length) )]
    })
  }

  handleSubmitAnswer = (answer) => {
    if (answer !== 'flipCard') {
      this.setState({
        userAnswer : answer,
        viewAnswer : true,
        flipCard : false
      })
    }
    else {
      this.setState({
        userAnswer : false,
        viewAnswer : true,
        flipCard : true
      })
    }


  }
  nextQuestion = async () => {
    const {
      questionInView,
      totalQuestions,
      answerdQuestions,
      correctQuestions,
      userAnswer
    } = this.state

    if ( questionInView < totalQuestions-1 ) {
      this.setState({
        answerdQuestions : (answerdQuestions + 1),
        correctQuestions : userAnswer ? (correctQuestions + 1) : correctQuestions,
        viewAnswer : false,
        questionInView : (questionInView + 1),
        flipCard : false

      })
    }
    else {
      this.setState({
        correctQuestions : userAnswer ? (correctQuestions + 1) : correctQuestions,
        quizFinshed:true,
      })
      await clearLocalNotification()
        .then(setLocalNotification).catch(err => {console.warn('set quiz notification:',err);})
    }
  }

  render() {
    const { navigation } = this.props
    const { deckId, answersPool, questions } = navigation.state.params
    const {
      randomAnswer,
      answerdQuestions,
      totalQuestions,
      questionInView,
      viewAnswer,
      userAnswer,
      quizFinshed,
      correctQuestions,
      flipCard
    } = this.state

    if (!quizFinshed) {
      return (
        <View style = {styles.container}>
          <View style = {styles.topBar}>
            <Text style = {styles.subHeader} > {answerdQuestions+1}/{totalQuestions} </Text>
            <Text style = {styles.subHeader} > {deckId} </Text>
          </View>
          {
            viewAnswer
            ? <Answer
                answer = {questions[questionInView].answer}
                userAnswer = {userAnswer}
                nextQuestion = { this.nextQuestion }
                flipCard = { flipCard }
                lastQuestion = {(answerdQuestions+1)/totalQuestions}
              />
            : <Question
                question = {questions[questionInView].question}
                answer = {questions[questionInView].answer}
                randomAnswer = {randomAnswer}
                submitAnswer = {this.handleSubmitAnswer}
              />
          }
        </View>
      )
    }
    else {
      return (
        <Score
          totalQuestions = {totalQuestions}
          correctQuestions = {correctQuestions}
          navigation = { navigation }
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    margin: 10,
    padding: 5,
    borderRadius: 5,
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  topBar:{
    flexDirection: 'row',
    width: '95%',
    borderBottomWidth: 5,
    justifyContent: 'space-between'
  },
  body:{
    flex:1,
    justifyContent: 'space-between',
    width: '95%',
    borderBottomWidth: 5,
    justifyContent: 'space-between'
  },
  subHeader: {
    fontSize: 25,
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
  },
})
