import React from 'react';
import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService'
import bootbox from '../../node_modules/bootbox.js/bootbox.js';

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state =
            {
                course: {title: "",created: "", modified: "", modules: []},
                courses: []
            };
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                console.log(courses);
                this.setState({courses: courses});
            })
            .catch(function (response) {
                console.log('error caught in find courses'+response);
            });
    }

    courseRows() {
        return ( this.state.courses.map(function (course) {
            return <CourseRow course={course} key={course.id} delete={this.deleteCourse} />
        },this));
    }

    titleChanged(event) {
        this.setState(
            {course:
                {title:event.target.value,
                 created: new Date().getTime(),
                 modified: new Date().getTime(),
                 modules: []}});
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });

    }

    deleteCourse(courseId,courseTitle) {
        let confirmMessage = 'Are you sure you want to delete course: '+courseTitle+' ?';
        bootbox.confirm(confirmMessage,(result) =>
            {
                if(result) {
                    this.courseService
                        .deleteCourse(courseId)
                        .then(() => {
                            this.findAllCourses();
                        });
                }
            });
    }

    render() {
        return (
            <div className="container-fluid">
            <h2>Course List</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Owner</th>
                    <th>Last Modified</th>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <th><input id="titleFld"
                               className="form-control"
                               onChange={this.titleChanged}
                               placeholder="CS0000"/></th>
                    <th>me</th>
                    <th>today</th>
                    <th>
                        <button className="btn btn-primary" onClick={this.createCourse}>
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
