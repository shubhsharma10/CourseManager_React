import React from 'react';
import {Link} from 'react-router-dom';

export default class ModuleListItem
    extends React.Component {

    render() {
        return (
            <li className = {this.props.active ? 'list-group-item active activeLI': 'list-group-item'}>
                <div>
                <Link
                onClick={() => this.props.selectModule(this.props.module.id)}
                  to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>
                <div className="float-right">
                    <a className="btn-floating btn-small waves-effect waves-light red"
                       onClick={() =>
                       {this.props.delete(this.props.module.id,this.props.module.title)}}>
                        <i className="material-icons">clear</i>
                    </a>
                </div>
                </div>
            </li>
        );
    }
}
