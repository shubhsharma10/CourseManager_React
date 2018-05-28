import React from 'react';
import {Link} from 'react-router-dom';

export default class TopicCard extends React.Component {

    render() {
        return(
            <div className="card">
               <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}
                     >
                   <h5 className="card-header">{this.props.topic.title}</h5>
                   <button className="btn btn-danger float-right btn-sm" onClick={() =>
                   {this.props.delete(this.props.topic.id,this.props.topic.title)}}>
                       <i className="fa fa-times"/>
                   </button>
               </Link>
            </div>
        );
    }
}
