import React from 'react';
import {Link} from 'react-router-dom'

class LessonTab extends React.Component {

    render() {
        return(
            <li>
                <Link className="nav-item nav-link"
                      to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}
                      role="tab">
                    <div className="row">
                        <div className="col-8" align="center">
                            {this.props.lesson.title}
                        </div>
                        <div className="col-4" style={{paddingTop: '10px'}}>
                            <button className="btn btn-sm btn-danger" onClick={() =>
                            {this.props.delete(this.props.lesson.id,this.props.lesson.title)}}>
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
}

export default LessonTab;
