import React from 'react'
import {Route, Switch } from 'react-router-dom'
import ModuleService from '../services/ModuleService'
import LessonService from '../services/LessonService'
import CourseService from '../services/CourseService'
import LessonTab from "../components/LessonTab";
import LessonContentEditor from './LessonContentEditor'
import {WidgetEditor} from './WidgetEditor'
import bootbox from '../../node_modules/bootbox.js/bootbox.js';

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            courseId: '',
            activeTabIndex: '',
            lesson: { title: 'New Lesson' },
            lessons: []
        };

        this.createLesson = this.createLesson.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);

        this.lessonService = LessonService.instance;
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForCourseModule(newProps.courseId,newProps.moduleId);
    }

    findAllLessonsForCourseModule(courseId,moduleId) {
        this.lessonService
            .findAllLessonsForCourseModule(courseId,moduleId)
            .then((lessons) => {
            if(lessons !== null)
                this.setLessons(lessons)
        });
    }

    setLessons(lessons) {
        lessons.sort((a, b) => a.id - b.id);
        this.setState({lessons: lessons});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    updateCourseModifiedTime(){
        this.courseService
            .findCourseById(this.state.courseId)
            .then((response) => {
                response.modified = new Date().toUTCString();
                this.courseService
                    .updateCourse(this.state.courseId,response);
            });
    }

    createLesson() {
        bootbox.prompt({
            size: "small",
            title: "Lesson name",
            value: "New Lesson",
            closeButton: false,
            callback: (result) => {
                if(result !== null){
                    let lesson = {title: result};
                    this.lessonService
                        .createLesson(this.props.courseId,this.props.moduleId, lesson)
                        .then(() => {
                            this.updateCourseModifiedTime();
                        })
                        .then(() => {
                        this.findAllLessonsForCourseModule(this.props.courseId,this.props.moduleId);
                    })
                }
            }
        });
    }

    deleteLesson(lessonId,lessonTitle){
        let confirmMessage = 'Are you sure, you want to delete '+lessonTitle+' ?';
        bootbox.confirm(confirmMessage,(result) =>
        {
            if(result) {
                this.lessonService
                    .deleteLesson(lessonId)
                    .then(() => {
                        this.updateCourseModifiedTime();
                    })
                    .then(() => {
                        this.findAllLessonsForCourseModule(this.state.courseId,this.state.moduleId);
                    });
            }
        });
    }

    renderTabs() {
        let lessons = this.state.lessons.map((lesson)=> {
            return <LessonTab
                courseId={this.props.courseId}
                moduleId={this.props.moduleId}
                lesson={lesson}
                key={lesson.id}
                id={lesson.id}
                delete={this.deleteLesson}/>
        });
        return lessons;
    }

    render() {
        return (
            <div className="container">
                <ul className="nav nav-tabs lesson-tabs justify-content-right">
                    {this.renderTabs()}
                    <li style={{margin:'5px'}}>
                        <div style={{paddingTop: '10px'}}>
                        <button className='btn btn-success'
                                onClick={this.createLesson}>
                            Add Lesson
                        </button>
                        </div>
                    </li>
                </ul>
                <div>
                    <Switch>
                        <Route exact path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                               component={LessonContentEditor}/>
                        <Route exact path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"
                               component={WidgetEditor}/>
                    </Switch>
                </div>
            </div>
        );
    }
}