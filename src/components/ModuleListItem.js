import React from 'react';

export default class ModuleListItem
    extends React.Component {

    render() {
        return (
            <li className = {this.props.active ? 'list-group-item active': 'list-group-item'}
                onClick={() => this.props.selectModule(this.props.module.id)}>
                {this.props.module.title}
                <span className="float-right">
                    <button className="btn btn-sm btn-danger"
                            onClick={() =>
                            {this.props.delete(this.props.module.id,this.props.module.title)}}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </span>
            </li>
        );
    }
}
