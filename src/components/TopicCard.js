import React from 'react';
import {Link} from 'react-router-dom';

export default class TopicCard extends React.Component {

    render() {
        return(
            <div>
               <Link className="card"
                     to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}
                     style={{width: "10rem"}}>
                   <div className="card-body">
                       <h5 className="card-title">{this.props.topic.title}</h5>
                       <p className="card-text">Quick example for adding details of a topic later here</p>
                   </div>
                   <button className="btn btn-danger float-right btn-sm" onClick={() =>
                                {this.props.delete(this.props.topic.id,this.props.topic.title)}}>
                       <i className="fa fa-times"/>
                   </button>
               </Link>
            </div>
        );
    }
}
