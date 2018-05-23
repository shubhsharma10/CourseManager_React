import React from 'react';

export default class TopicCard extends React.Component {

    render() {
        return(
           <div className="card" style={{width: "10rem"}}>
               <div className="card-body">
                   <h5 className="card-title">{this.props.topic.title}</h5>
                   <p className="card-text">Quick example for adding details of a topic later here</p>
               </div>
           </div>
        );
    }
}
