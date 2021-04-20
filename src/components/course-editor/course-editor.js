import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../../reducers/module-reducer";
import lessonReducer from "../../reducers/lesson-reducer";
import topicReducer from "../../reducers/topic-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";
import './course-editor.css'
import courseService from "../../services/course-service";
import WidgetList from "../widgets/widget-list";
import widgetReducer from "../../reducers/widget-reducer";

const reducer = combineReducers({
    moduleReducer:moduleReducer,
    lessonReducer:lessonReducer,
    topicReducer:topicReducer,
    widgetReducer:widgetReducer
})

const store = createStore(reducer)

const CourseEditor = ({history}) => {
    const {layout,courseId, moduleId} = useParams();
    const [courseName, setCourseName] = useState({title: ""})
    useEffect( () => {
        courseService.findCourseById(courseId).then(course => {setCourseName({title: course.title})})
    }, [courseId]);

    return(
        <Provider store={store}>
            <div className="container-fluid">
                <div>
                    <h2>
                        <Link to={`/courses/${layout}`}>
                            <i className="fa fa-arrow-left"></i>
                        </Link>
                        {courseName.title}

                    </h2>
                    &nbsp;&nbsp;
                </div>
                <div className="row">
                    <div className="col-4">
                        <ModuleList/>
                    </div>
                    <div className='col-8'>
                        <LessonTabs/>
                        <TopicPills/>
                        <WidgetList/>
                    </div>
                </div>
            </div>
        </Provider>
    )}

export default CourseEditor