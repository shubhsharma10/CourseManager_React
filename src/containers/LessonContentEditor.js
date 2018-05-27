import React from 'react'
import LessonContent from './LessonContent'
import LessonService from '../services/LessonService'

export default class LessonContentEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            lesson: '',
            topics: []
        };

        this.setCourseID = this.setCourseID.bind(this);
        this.setModuleID = this.setModuleID.bind(this);
        this.setLessonID = this.setLessonID.bind(this);

        this.lessonService = LessonService.instance;
    }

    componentDidMount() {
        this.setCourseID(this.props.match.params.courseId);
        this.setModuleID(this.props.match.params.moduleId);
        this.setLessonID(this.props.match.params.lessonId);
        this.findLessonById(this.props.match.params.lessonId);
    }
    componentWillReceiveProps(newProps) {
        this.setCourseID(newProps.match.params.courseId);
        this.setModuleID(newProps.match.params.moduleId);
        this.setLessonID(newProps.match.params.lessonId);
        this.findLessonById(newProps.match.params.lessonId);
    }

    setCourseID(courseId) {
        this.setState({courseId:courseId});
    }

    setModuleID(moduleId) {
        this.setState({moduleId:moduleId});
    }

    setLessonID(lessonId) {
        this.setState({lessonId:lessonId});
    }

    setLesson(lesson) {
        this.setState({lesson: lesson});
    }

    findLessonById(lessonId) {
        this.lessonService
            .findLessonById(lessonId)
            .then((lesson) => {
                if(lesson !== null)
                    this.setLesson(lesson)
            });
    }

    render() {
        return (
            <div className="tab-content">
                <LessonContent
                    courseId = {this.state.courseId}
                    moduleId = {this.state.moduleId}
                    lessonId = {this.state.lessonId}
                    key = {this.state.lesson.id}
                    lessonTitle = {this.state.lesson.title}/>
            </div>
        )
    }
}
