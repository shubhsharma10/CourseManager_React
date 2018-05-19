import React, {Component} from 'react'
import CourseList from './CourseList'

class CourseManager extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseList/>
            </div>
        )
    }
}

export default CourseManager;