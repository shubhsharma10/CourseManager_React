import React from 'react';

export default class ModuleListItem
    extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className = {this.props.active ? 'list-group-item active': 'list-group-item'}
                onClick={() => this.props.selectModule(this.props.module.id)}>
                {this.props.module.title}
                <span className="float-right">
                    <i className="fa fa-trash"></i>
                    <i className="fa fa-pencil"></i>
                </span>
            </li>
        );
    }
}
