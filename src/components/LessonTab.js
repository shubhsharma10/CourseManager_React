import React from 'react';

class LessonTab extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <li className="nav-item">
                <a className="nav-item nav-link" data-toggle="tab" role="tab">
                    <div className="row">
                        <div className="col-8">
                            {this.props.lesson.title}
                        </div>
                        <div className="col-2">
                            <button className="btn btn-sm">
                                <i class="fa fa-times"></i>
                                </button>
                        </div>
                    </div>

                </a>
            </li>
        );
    }
}

export default LessonTab;
