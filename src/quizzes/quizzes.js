import React, {useState,useEffect} from "react"
import quizService from "../services/quiz-service"
import {Link, useParams} from "react-router-dom";

const QuizzesList =() =>{
    const {courseId} = useParams();
    const [quizzes,setQuizzes] =useState([])
    useEffect(() =>{
// fetch("http://localhost:3000/api/quizzes")
//     .then(response => response.json())
//     .then((quizzes)=>{setQuizzes(quizzes)

        quizService.findAllQuizzes().then((quizzes) => {setQuizzes(quizzes)})
    }, [])
    return(
        <div>
            <div className='row'>
                <Link to='/courses/table' className='fas fa-times'/>
                <h1>Quizzes List</h1>
            </div>
            <ul className='list-group'>
                {
                    quizzes.map(quiz => <li className='list-group-item' key={quiz._id}>
                        <Link className='btn' to={`/courses/${courseId}/quizzes/${quiz._id}`}>{quiz.title}</Link>
                        <Link to={`/courses/${courseId}/quizzes/${quiz._id}`} className='btn btn-primary float-right'>Start</Link>
                        <Link className='btn btn-secondary float-right'
                              to={`/courses/${courseId}/quizzes/${quiz._id}/attempts`}>Attempts Histories</Link>
                    </li>)
                }
            </ul>
        </div>
    )
}
export default QuizzesList