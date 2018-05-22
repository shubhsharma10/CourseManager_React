import React from 'react'

export default class ModuleEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: ''
        };

        this.setCourseID = this.setCourseID.bind(this);
        this.setModuleID = this.setModuleID.bind(this);
    }

    componentDidMount() {
        this.setCourseID(this.props.match.params.courseId);
        this.setModuleID(this.props.match.params.moduleId);
    }
    componentWillReceiveProps(newProps) {
        this.setCourseID(newProps.match.params.courseId);
        this.setModuleID(newProps.match.params.moduleId);
    }

    setCourseID(courseId) {
        this.setState({courseId:courseId});
    }

    setModuleID(moduleId) {
        this.setState({moduleId:moduleId});
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                </div>
                <div className="col-9">
                    <h1>BBCCS</h1>
                </div>
            </div>
        )
    }
}
