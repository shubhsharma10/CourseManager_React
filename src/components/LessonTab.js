import React from 'react';

class LessonTab extends React.Component {

    render() {
        return(
            <li className="nav-item">
                <a className="nav-item nav-link" href={'#' + this.props.lesson.id} data-toggle="tab" role="tab">
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
                </a>
            </li>
        );
    }
}

export default LessonTab;
