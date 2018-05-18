import React from 'react';

export default class ModuleListItem
    extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                Module 1
                <span className="float-right">
                    <i className="fa fa-trash"></i>
                    <i className="fa fa-pencil"></i>
                </span>
            </li>
        );
    }
}
