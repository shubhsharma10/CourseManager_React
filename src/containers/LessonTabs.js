import React from 'react'
import ModuleService from '../services/ModuleService'
import LessonService from '../services/LessonService'
import LessonTab from "../components/LessonTab";

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            courseId: '',
            lesson: { title: '' },
            lessons: [
                {title:'Lesson1', id: 2435}
            ]
        };
        this.createLesson = this.createLesson.bind(this);

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.lessonService = LessonService.instance;
        this.moduleService = ModuleService.instance;;
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    findAllLessonsForCourseModule(courseId,moduleId) {
        this.lessonService
            .findAllLessonsForCourseModule(courseId,moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
        if(moduleId > -1) {
            this.findAllLessonsForCourseModule(this.state.courseId, moduleId);
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
    }

    createLesson() {
        this.lessonService
            .createLesson(this.props.courseId,this.props.moduleId, this.state.lesson)
            .then(this.findAllLesonsForCourseModule(this.props.courseId,this.props.moduleId))
    }

    renderListOfLessons() {
        let lessons = this.state.lessons.map(function(lesson){
            return <LessonTab lesson={lesson} key={lesson.id}/>
        });
        return lessons;
    }

    render() {
        return (
            <div>
                <h4>{this.state.moduleId}</h4>
                <ul className="nav nav-tabs">
                        {this.renderListOfLessons()}
                </ul>
            </div>
        );
    }
}
