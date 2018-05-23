import React, {Component} from 'react'
import CourseList from './CourseList'
import CourseEditor from './CourseEditor'
import LessonContent from './LessonContent'
import {BrowserRouter as Router,Route } from 'react-router-dom'

class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Route
                        exact path="/" component={CourseList}>
                    </Route>
                    <Route
                        path="/course/:courseId" component={CourseEditor}>
                    </Route>
                    <Route
                        path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonContent}>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;