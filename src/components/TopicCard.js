import React from 'react';
import {Link} from 'react-router-dom';

export default class TopicCard extends React.Component {

    render() {
        return(
            <div className="card">
                <div className="card-header">
                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}
                    >
                        <h5 >{this.props.topic.title}</h5>
                    </Link>
                </div>
                <div className="float-right">
                    <a className="btn-floating btn-small float-right waves-effect waves-light red"
                       onClick={() =>
                       {this.props.delete(this.props.topic.id,this.props.topic.title)}}>
                        <i className="material-icons">clear</i>
                    </a>
                </div>
            </div>
        );
    }
}
