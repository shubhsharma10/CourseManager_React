import React, {Component} from 'react'
import CourseList from './CourseList'
import CourseEditor from './CourseEditor'
import TopicEditor from './TopicEditor'
import LessonContentEditor from './LessonContentEditor'
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
                    {/*<Route*/}
                        {/*path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonContent}>*/}
                    {/*</Route>*/}
                    <Route
                        path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonContentEditor}>
                    </Route>
                    <Route
                        path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId" component={TopicEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;