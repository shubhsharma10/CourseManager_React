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
                course: {title: "CS0000",created: "", modified: "", modules: []},
                courses: []
            };
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.getCourseRows = this.getCourseRows.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            })
            .catch(function (response) {
                console.log('error caught in find courses'+response);
            });
    }

    getCourseRows() {
        return ( this.state.courses.map((course) => {
            return <CourseRow course={course} key={course.id} delete={this.deleteCourse} />
        }));
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
            .then(() => { this.findAllCourses(); })
            .then(() => { document.getElementById('titleFId').value = 'CS0000';})

    }

    deleteCourse(courseId,courseTitle) {
        let confirmMessage = 'Do you want to delete '+courseTitle+' ?';
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
            <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Owner</th>
                    <th>Last Modified</th>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <th>
                        <input id="titleFId"
                               className="form-control"
                               onChange={this.titleChanged}
                               defaultValue="CS0000"/>
                    </th>
                    <th>me</th>
                    <th>today</th>
                    <th>
                        <button className="btn btn-primary" onClick={this.createCourse}>
                        Add
                    </button></th>
                </tr>
                </thead>
                <tbody>
                { this.getCourseRows() }
                </tbody>
            </table>
            </div>

    )
    }
}
export default CourseList;
