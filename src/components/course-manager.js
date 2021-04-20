import React from "react";
import './course-manager.css'
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import {BrowserRouter, Route} from "react-router-dom";
import courseService, {createCourse, findAllCourses,deleteCourse} from "../services/course-service";
import CourseEditor from "./course-editor/course-editor";

export default class CourseManager extends React.Component{
    state = {
        courses:[],
        title:""
    }


componentDidMount() {
        findAllCourses()
            .then(courses => this.setState({courses:courses}))
}
//
    addCourse = () => {

        const newCourse = {
            title: this.state.title,
            ownedBy: "me",
            lastModified: new Date().getUTCFullYear()
        }
//         // alert('add course')
//
        courseService.createCourse(newCourse)
            .then(actualCourse => {
                    this.state.courses.push(actualCourse)
                    this.setState(this.state)
                document.getElementById("courseTitleFld").value=""
                }
            )
    }

    deleteCourse = (courseToDelete) => {
        courseService.deleteCourse(courseToDelete._id)
            .then(status=>{
                this.setState((prevState)=>({...prevState,
                courses:prevState.courses.filter(
                    course => course._id !== courseToDelete._id
                )}))
            })
    }

    updateCourse = (course) => {
        courseService.updateCourse(course._id, course)
            .then(status => {
                this.setState((prevState) => {
                    let nextState = {...prevState}
                    nextState.courses = prevState.courses.map(c => {
                        if(c._id === course._id) {
                            return course
                        } else {
                            return c
                        }
                    })
                    return nextState
                })
            })
    }

     render(){
        return(
            <div>
            <Route path={"/courses/table"} exact>
                <div className="row wbdv-padding">
                    <div className="col-2 col-sm-3 col-md-1">
                        <i className="float-right fa fa-bars fa-2x"></i>
                    </div>
                    <div style={{textAlign:"center"}} className="d-none d-lg-block col-md-2">
                        <h5>Course Manager</h5>
                    </div>
                    <div className="col-8 col-sm-6 col-md-7">
                        <input id="courseTitleFld"
                                type="text"
                               className="form-control
                               search-color"
                               // placeholder="New Course Title"
                        onChange={(e) => {
                            const newTitle = e.target.value
                            this.setState({title:newTitle})
                        }}
                               placeholder="New Course Title"/>
                    </div>
                    <div onClick={this.addCourse} className="btn col-2 col-sm-3 col-md-1">
                        <i className="fa fa-plus-circle fa-2x float-right"></i>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <footer id ="footer">
                    <em onClick={this.addCourse} id="footerIcon" className="fa fa-plus-circle fa-3x color-red"></em>
                </footer>
            </Route>
                <Route path={"/courses/grid"} exact>
                    <div className="row wbdv-padding">
                        <div className="col-2 col-sm-3 col-md-1">
                            <i className="float-right fa fa-bars fa-2x"></i>
                        </div>
                        <div style={{textAlign:"center"}} className="d-none d-lg-block col-md-2">
                            <h5>Course Manager</h5>
                        </div>
                        <div className="col-8 col-sm-6 col-md-7">
                            <input id="courseTitleFld"
                                   type="text"
                                   className="form-control
                               search-color"
                                // placeholder="New Course Title"
                                   onChange={(e) => {
                                       const newTitle = e.target.value
                                       this.setState({title:newTitle})
                                   }}
                                   placeholder="New Course Title"/>
                        </div>
                        <div onClick={this.addCourse} className="btn col-2 col-sm-3 col-md-1">
                            <i className="fa fa-plus-circle fa-2x float-right"></i>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                    <footer id ="footer">
                        <em onClick={this.addCourse} id="footerIcon" className="fa fa-plus-circle fa-3x color-red"></em>
                    </footer>
                </Route>
                <Route path="/courses/grid" exact={true}>
                    <CourseGrid courses={this.state.courses}
                                createCourse={this.addCourse}
                                deleteCourse={this.deleteCourse}
                                updateCourse={this.updateCourse}/>
                </Route>
                {/*<Route path="/courses/table" component={CourseTable}/>*/}
                <Route path="/courses/table" exact={true}>
                    <CourseTable courses={this.state.courses}
                                 createCourse={this.addCourse}
                                 deleteCourse={this.deleteCourse}
                                 updateCourse={this.updateCourse}/>
                </Route>
                    <Route path={[
                        "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId/widgets",
                        "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId",
                        "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId",
                        "/courses/:layout/edit/:courseId/modules/:moduleId",
                        "/courses/:layout/edit/:courseId"]}
                           render={(props) => <CourseEditor {...props}/>}>
                    </Route>
            </div>
        )
    }
}
