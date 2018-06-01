import React from 'react';
import {Link} from 'react-router-dom'

class LessonTab extends React.Component {

    render() {
        return(
            <li >
                <Link className = {this.props.active ? 'nav-item nav-link activeLI': 'nav-item nav-link'}
                      onClick={() => this.props.selectLesson(this.props.lesson.id)}
                      to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}
                      role="tab">
                    <div className="row">
                        <div className="col-8" align="center">
                            {this.props.lesson.title}
                        </div>
                        <div className="col-4" style={{paddingTop: '10px'}}>
                            <a className="btn-floating btn-small waves-effect waves-light red"
                               onClick={() =>
                               {this.props.delete(this.props.lesson.id,this.props.lesson.title)}}>
                                <i className="material-icons">clear</i>
                            </a>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
}

export default LessonTab;
