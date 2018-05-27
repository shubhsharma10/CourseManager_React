import React from 'react'

export default class LessonContentEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topics: []
        };

        this.setCourseID = this.setCourseID.bind(this);
        this.setModuleID = this.setModuleID.bind(this);
        this.setLessonID = this.setLessonID.bind(this);
    }

    componentDidMount() {
        this.setCourseID(this.props.match.params.courseId);
        this.setModuleID(this.props.match.params.moduleId);
        this.setLessonID(this.props.match.params.lessonId);
    }
    componentWillReceiveProps(newProps) {
        this.setCourseID(newProps.match.params.courseId);
        this.setModuleID(newProps.match.params.moduleId);
        this.setLessonID(newProps.match.params.lessonId);
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

    render() {
        return (
            <div className="tab-content">
                <LessonContent
                    courseId = {this.props.courseId}
                    moduleId = {this.props.moduleId}
                    lessonId = {this.props.lessonId}
                    key = {lesson.id}
                    lessonTitle = {lesson.title}/>
            </div>
        )
    }
}
