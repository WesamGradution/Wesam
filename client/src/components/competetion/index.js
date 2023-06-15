/* 
 * Quiz App Component
 * Author: Abdullah
 * Date: May 6th, 2023
 * 1.00 
 * 
 * This code is a React component that renders a quiz app.
 * The app fetches questions from an API or a passed data from database, randomizes the answer options, and allows the user to select an answer for each question within given time.
 * The app calculates the user's score and displays it when the user clicks the "Get Result" button.
 * The app also displays the total number of questions.
 * This component uses the following sub-components:
 * - fetchDataFromAPI: a function that fetches data from an API
 * - fetchDataFromObject: a function that processes question data
 * - getResult: a function that calculates the user's score
 * - handleAnswerChange: a function that handles changes to the selected answer
 * - renderQA: a function that renders the questions and answer options
 * 
 * This component can receives the following props:
 * - dataBaseQuestions: an array of question objects from a database
 * - for API, all optinal: questionsNumber , int questionsCategory, [hard, easy, medium] questionsDifficulty, ["multiple" or "boolean"] questionsType
 
* The component renders the following UI elements:
 * - A message indicating that the data is being fetched
 * - The questions and answer options
 * - The "Get Result" button
 * - The total number of questions
 */
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import he from 'he';
import { useNavigate } from 'react-router-dom';
import { useGetFormInfoQuery, usePostUserScoreMutation } from '../../reduxToolKit/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../reduxToolKit/userSlice';


function Competetion(props) {
  const [userPoints, setUserPoints] = useState(0)
  const [userScore, setUserScore] = useState(null)

  const {_id} = useSelector(selectUser)

  const dispatch = useDispatch()

  const userId = _id

  const [postScore] = usePostUserScoreMutation()

  const navigate = useNavigate()



  
    
 

    /**
   * The user's current score.
   * @type {number|null}
   */
  

  /**
 * The number of questions in the quiz.
 * If `props.dataBaseQuestions` is defined, the number of questions will be the length of that array.
 * Otherwise, if `props.questionsNumber` is defined, the number of questions will be that value.
 * If neither `props.dataBaseQuestions` nor `props.questionsNumber` is defined, the default number of questions is 3.
 *
 * @type {int}*/
  const questionsNumber = props.dataBaseQuestions ? props.dataBaseQuestions.length : props.questionsNumber || 3

  /**
 * State variable that holds an array of object -question data-
 *
 * @type {Array<Object>}*/
  const [questionsData, setQuestionsData] = useState([]);

  /**
 * State variable that holds an array of selected answers for the quiz questions.
 * The length of the array is determined by the `questionsNumber`.
 * Each element of the array is initially set to `null`.
 *
 * @type {Array<null|any>}  */
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsNumber).fill(null)); 

/**
 * Initializes a state variable `timeLeft` to either the value of `props.time` multiplied by 60 -in secounds- (if `props.time` is defiend), 
 * or `null` -unlimited time- (if `props.time` is undefined). The state variable can be updated using the `setTimeLeft` function.
 *
 * @type {number} */
  const [timeLeft, setTimeLeft] = useState(props.time ? props.time * 60 : null);

/**
 * Runs a timer that counts down from `timeLeft` (in seconds) to 0. When the timer reaches 0, it clears the interval and calls the `getResult` function.
 *
 * @typedef {function} TimerId
 * @returns {TimerId} A function that clears the timer interval.
 */  
  useEffect(() => {
    if (timeLeft === null) {
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft <= 0) {
          clearInterval(timerId);
          getResult();
          return 0;
        }
        return timeLeft - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);  



/**
 * Generate a URL for the Open Trivia DB API based on the provided props.
 *
 * The URL includes the number of questions to retrieve (`questionsNumber`)@type {number},
 * the category of questions to retrieve (`questionsCategory`, default is 18 which is Science: Computers) @type {number},
 * the difficulty of the questions (`questionsDifficulty`, if provided otherwise empty String. Can be "easy", "medium", or "hard") @type {string},
 * and the type of questions (`questionsType`, if provided otherwise empty String. Can be "multiple" or "boolean") @type {string}.
 *
 * @returns {string} The generated API URL
 * */
  const getAPILink = () => {
    const questionsCategory = props.questionsCategory || 18
    const questionsDifficulty = props.questionsDifficulty ? `&difficulty=${props.questionsDifficulty}` : "";
    const questionsType = props.questionsType ? `&type=${props.questionsType}` : "";
    const generatedLink = `https://opentdb.com/api.php?amount=${questionsNumber}&category=${questionsCategory}${questionsDifficulty}${questionsType}`;
    return generatedLink
  }

 /**
 * Takes in an array of question objects and returns an array of decoded question objects with randomized answer options order.
 * 
 * @param {Array} questionObject - An array of question objects. Each question object should have the following properties:
 *   - question (string): the text of the question
 *   - correct_answer (string): the text of the correct answer
 *   - incorrect_answers (array): an array containing the incorrect answer options
 * 
 *   assign setQuestionsData: an array of decoded question objects, where each object has the following properties:
 *   - question (string): the decoded text of the question
 *   - answerOptions (array): an array of decoded answer options, where the correct answer is randomly placed among the incorrect options
 *   - correctAnswer (string): the decoded text of the correct answer
 */
  const fetchDataFromObject = (questionObject) => {
    const fetchedData = questionObject.map((element) => {
      const points = element.points? element.points : 0
      const question = he.decode(element.question);
      const correctAnswer = he.decode(element.correct_answer);
      const wrongAnswers = Object.values(element.incorrect_answers).map((str) => he.decode(str));
      const answerOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      return {
        question: question,
        answerOptions: answerOptions,
        correctAnswer: correctAnswer,
        points: points
      };
    })
    setQuestionsData(fetchedData); 
  }

  /**
 * Fetches data from an API and processes it using the `fetchDataFromObject` function.
 * The API URL is determined by the `getAPILink` function.
 */
  const fetchDataFromAPI = () => {
    const apiLink = getAPILink();
    Axios.get(apiLink)
      .then((response) => {
        fetchDataFromObject(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        alert("there is something wrong with getting data, please go home page")
      });
  };

  /**
 * Runs a function to fetch questions either from the database or from an API.
 * If `props.dataBaseQuestions` is not null, the `fetchDataFromObject` function is called with the `props.dataBaseQuestions` array as an argument.
 * Otherwise, the `fetchDataFromAPI` function is called to fetch questions from an API.
 *
 * This runs only once, when the component mounts, because the dependencies array is empty.
 *
 */
  useEffect(() => {
    props.dataBaseQuestions ? fetchDataFromObject(props.dataBaseQuestions) : fetchDataFromAPI();
  }, []);
  

  /**
 * Calculates the user's score based on their selected answers and the correct answers in `questionsData`.
 * If the `selectedAnswers` array includes a `null` value, an alert is shown to remind the user to answer all questions.
 * Otherwise, the user's score and points are calculated by comparing their selected answers to the correct answers in `questionsData`.
 *
 */
  const getResult = () => { 
    if (selectedAnswers.includes(null)) {
      alert("Please answer all questions.");
      return;
    }
    const score1 = questionsData.reduce((accumulator, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    setUserScore(score1);
    setTimeLeft(0);
  
    // Calculate total points earned by the user
    const totalPoints = questionsData.reduce((accumulator, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return accumulator + question.points;
      } else {
        return accumulator;
      }
    }, 0);
    setUserPoints(totalPoints)
    // HERE WE SHOULD BE STORING INFORMATION TO MONGODB DATABASE

      const points = userPoints
      const score = userScore
      postScore({userId,points,score})

      
  };


  /**
 * Handles changes to the selected answer for a given question.
 * Updates the `selectedAnswers` state with the new answer.
 *
 * @param {Object} event - The event object generated by the onChange event on the answer input.
 * @param {number} questionIndex - The index of the question in `questionsData`.
 */
  const handleAnswerChange = (event, questionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = event.target.value;
    setSelectedAnswers(newSelectedAnswers);
    console.log(newSelectedAnswers);
  };

  const handleGoHome = () =>{
    navigate("/home")
    //window.location.reload();
    //const {data} = useGetFormInfoQuery(userId)

    //dispatch(updateUser(data))
  }

  /**
 * Renders the questions and answer options in the `questionsData` array.
 * If `questionsData` is empty, displays a message indicating that the data is being fetched.
 *
 * @returns {JSX.Element} A JSX element containing the questions and answer options to be ineracted to.
 */
  const renderQA = () => {
    if (questionsData.length === 0) {
      return <p>Just a second...</p>
    }
    if (userScore !== null){
      
      return (
        <div>
          <p>You've completed the quiz with score: {userScore}/{questionsNumber} and points: {userPoints}</p>
          <button onClick={handleGoHome}>home page</button>
        </div>
      )
    }
    return (
      <>
        {questionsData.map((element, questionIndex) => (
        <div className='question and answers' key={element.question}>
          <div className='question'>
            <h2>{element.question}</h2>
          </div>

          <div className="answers"> 
            {element.answerOptions.map((answer, answerIndex) => (
              <label key={answer}>
                <input type="radio" name={questionIndex} value={answer} checked={selectedAnswers[questionIndex] === answer} 
                onChange={(event) => handleAnswerChange(event, questionIndex)} />{answer}
              </label>
            ))}
          </div>
        </div>
        ))}
        <button onClick={()=> {selectedAnswers.includes(null)? alert("you forgot some question :) "): getResult()}}>Get Result</button>
        <p>Total questions: {questionsData.length}</p>

        {timeLeft !== null && (<p>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>)}
      </>
    );
  };

  
    
  return (
    <div className='Quiz' style={{textAlign:"center"}}>
      {renderQA()}
    </div>
  );
}

export default Competetion;