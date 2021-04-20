import React,{useEffect} from 'react'
import {connect} from "react-redux"
import EditableItem from "../editable-item"
import {useParams} from "react-router-dom"
import lessonService from "../../services/lesson-service"
// import moduleService from "../../services/module-service";

const LessonTabs = ({
                        lessons=[],
                        findLessonsForModule,
                        createLessonForModule,
                        deleteLesson,
                        updateLesson,
                        setLessonsToEmpty
                    }) => {
    const {layout,courseId, moduleId,lessonId} = useParams();
    useEffect(() => {
        if(moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        } else {
            setLessonsToEmpty(moduleId)
        }
    }, [moduleId, courseId])
    return(
        <div>
        <div style={{background:"black"}} className="p-1 text-white">
            <h3>Lessons</h3>
        </div>
        <div>
            <ul className="nav nav-tabs">
                {
                    lessons.map(lesson =>
                        <li className="nav-item" key={`${lesson._id}`}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                                deleteItem={deleteLesson}
                                updateItem={updateLesson}
                                item={lesson}
                                active={lesson._id === lessonId}/>
                        </li>
                    )
                }
                <li>
                    <i onClick={() => createLessonForModule(moduleId)}
                       className="fas fa-plus fa-2x"></i>
                </li>
            </ul>
        </div>
        </div>
    )}

const stpm =(state) => ({
    lessons: state.lessonReducer.lessons
})

const dtpm =(dispatch) => {
    return {
        findLessonsForModule: (moduleId) => {
            lessonService.findLessonsForModule(moduleId).then(lessons => dispatch({
                type: "FIND_LESSONS",
                lessons: lessons
            }))
        },
        createLessonForModule: (moduleId) => {

            if(!(moduleId !== "undefined" && typeof moduleId !== "undefined")) {
                alert("Please select the Module first")
            }
            else{
                lessonService.createLessonForModule(moduleId, {title: "New Lesson"}).then(
                    lesson => dispatch({
                        type: "CREATE_LESSON",
                        lesson: lesson
                    }))}
        },
        deleteLesson: (lesson) => {
            lessonService.deleteLesson(lesson._id).then( status => dispatch(
                {
                    type: "DELETE_LESSON",
                    lessonToDelete: lesson
                }
            ))
        },
        updateLesson: (lesson) => {
            lessonService.updateLesson(lesson._id, lesson).then(status => dispatch({
                    type: "UPDATE_LESSON",
                    lesson: lesson
                })
            )
        },
        setLessonsToEmpty: (lessonId) => {
            dispatch({
                type: "CLEAN_LESSONS"
            })
        }
    }
}
export default connect(stpm,dtpm)(LessonTabs)