import React from 'react'

export default class TopicEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topicId: '',
            widgets: []
        };

        this.setCourseID = this.setCourseID.bind(this);
        this.setModuleID = this.setModuleID.bind(this);
        this.setLessonID = this.setLessonID.bind(this);
        this.setTopicID = this.setTopicID.bind(this);
    }

    componentDidMount() {
        this.setCourseID(this.props.match.params.courseId);
        this.setModuleID(this.props.match.params.moduleId);
        this.setLessonID(this.props.match.params.lessonId);
        this.setTopicID(this.props.match.params.topicId);
    }
    componentWillReceiveProps(newProps) {
        this.setCourseID(newProps.match.params.courseId);
        this.setModuleID(newProps.match.params.moduleId);
        this.setLessonID(newProps.match.params.lessonId);
        this.setTopicID(newProps.match.params.topicId);
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

    setTopicID(topicId) {
        this.setState({topicId:topicId});
    }

    render() {
        return (
            <div>
                <h3>Entering Topic Editor for Topic: {this.props.topicId}</h3>
            </div>
        )
    }
}
