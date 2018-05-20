import React from 'react';
import {Link} from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props) {
        super(props);
    }

    getModifiedTime() {
        var modifiedTime = new Date(this.props.course.modified);
        return modifiedTime.toDateString()+" "+modifiedTime.toTimeString().split(' ')[0];
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>
                    {this.getModifiedTime()}
                </td>
                <td>
                    <i className="fa fa-times fa-2x"
                       onClick={() =>
                    {this.props.delete(this.props.course.id)}}>

                    </i>
                </td>
            </tr>
        )
    }
}
export default CourseRow;