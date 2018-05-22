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
                <td>me</td>
                <td>
                    {this.getModifiedTime()}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() =>
                                        {this.props.delete(this.props.course.id,this.props.course.title)}}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}
export default CourseRow;