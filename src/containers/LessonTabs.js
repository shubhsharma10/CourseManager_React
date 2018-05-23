import React from 'react'
import ModuleService from '../services/ModuleService'
import LessonService from '../services/LessonService'
import LessonTab from "../components/LessonTab";
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
        this.setState({lessons: lessons})
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
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
                delete={this.deleteLesson}/>
        });
        return lessons;
    }


    render() {
        return (
            <div>
                <ul className="nav nav-pills justify-content-right">
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
            </div>
        );
    }
}