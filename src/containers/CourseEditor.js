import React from 'react'
import ModuleList from './ModuleList'
import CourseService from '../services/CourseService'

export default class CourseEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;

        this.setCourseID = this.setCourseID.bind(this);
        this.setCourse = this.setCourse.bind(this);
        this.state = {
            courseId: '',
            course: '',};
    }

    componentDidMount() {
        this.setCourseID(this.props.match.params.courseId);
        this.setCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseID(newProps.match.params.courseId);
        this.setCourse(newProps.match.params.courseId);
    }

    setCourseID(courseId){
        this.setState({courseId:courseId});
    }

    setCourse(courseId) {
        this.courseService
            .findCourseById(courseId)
            .then((course) => {
                this.setState({course:course});
            });
    }

    getCourseTitle() {
        return this.state.course.title;
    }

    render() {
        return (
            <div>
                <h3>{this.getCourseTitle()}</h3>
                <ModuleList courseId={this.state.courseId}/>
            </div>
        )
    }
}
