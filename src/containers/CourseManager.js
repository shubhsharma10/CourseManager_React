import React, {Component} from 'react'
import CourseList from './CourseList'
import CourseEditor from './CourseEditor'
import {BrowserRouter as Router,Route } from 'react-router-dom'

class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Course Manager</h1>
                    <CourseList/>
                    <Route path="/course/list"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId/edit"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;