import React from 'react';
import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService'

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {course: {title: ""},courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
                console.log(courses);
            });
    }

    courseRows() {
        return ( this.state.courses.map(function (course) {
            return <CourseRow course={course}/>
        }));
    }

    titleChanged(event) {
        this.setState({course:{title:event.target.value}});
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });

    }

    render() {
        return (
            <div>
            <h2>Course List</h2>
            <table>
                <thead>
                <tr><th>Title</th></tr>
                <tr>
                    <th><input id="titleFld"
                               onChange={this.titleChanged}
                               placeholder="cs101"/></th>
                    <th>
                        <button onClick={this.createCourse}>
                        Add
                    </button></th>
                </tr>
                </thead>
                <tbody>
                { this.courseRows() }
                </tbody>
            </table>
            </div>

    )
    }
}
export default CourseList;
