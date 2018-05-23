import React from 'react'
import ModuleService from '../services/ModuleService'
import LessonService from '../services/LessonService'
import CourseService from '../services/CourseService'
import LessonTab from "../components/LessonTab";
import LessonContent from "./LessonContent"
import bootbox from '../../node_modules/bootbox.js/bootbox.js';

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            courseId: '',
            activeTabIndex: '',
            lesson: { title: 'New Lesson' },
            lessons: [
                {title:'Lesson1', id: 2435}
            ]
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
            .then((lessons) => {this.setLessons(lessons)});
    }

    setLessons(lessons) {
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
        let confirmMessage = 'Do you want to delete '+lessonTitle+' ?';
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
                lesson={lesson}
                key={lesson.id}
                id={lesson.id}
                delete={this.deleteLesson}/>
        });
        return lessons;
    }

    renderTabContent() {
        let lessonsContent = this.state.lessons.map((lesson) => {
            return <LessonContent
                    courseId = {this.state.courseId}
                    moduleId = {this.state.moduleId}
                    lessonId = {lesson.id}
                    lessonTitle = {lesson.title}/>
        });
        return lessonsContent;
    }


    render() {
        return (
            <div className="container-fluid">
                <ul className="nav nav-tabs lesson-tabs justify-content-right">
                    {this.renderTabs()}
                    <li style={{margin:'5px'}}>
                        <div style={{paddingTop: '10px'}}>
                        <button className='btn btn-success'
                                onClick={this.createLesson}>
                            <i className="fa fa-plus"></i>
                        </button>
                        </div>
                    </li>
                </ul>
                <div className="tab-content">
                    {this.renderTabContent()}
                </div>
            </div>
        );
    }
}