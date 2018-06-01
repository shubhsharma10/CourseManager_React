import React from 'react';
import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService'
import bootbox from '../../node_modules/bootbox.js/bootbox.js';
import '../../node_modules/materialize-css/dist/css/materialize.css'
import '../../node_modules/materialize-css/dist/js/materialize.js'

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
                courses.sort((a, b) => a.id - b.id);
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
        let confirmMessage = 'Are you sure, you want to delete '+courseTitle+' ?';
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
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand">Course Manager</a>

                    <input className="input-field ml-2 mr-3 mt-1 mb-1"
                           id="titleFId" type="text" placeholder="Enter Course title here"
                           onChange={this.titleChanged}
                    />
                    <a className="btn-floating btn-small waves-effect waves-light red"
                        onClick={this.createCourse}>
                        <i className="material-icons">add</i>
                    </a>
                </nav>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Owner</th>
                            <th>Last Modified</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.getCourseRows() }
                        </tbody>
                    </table>
                </div>
            </div>

    )
    }
}
export default CourseList;
