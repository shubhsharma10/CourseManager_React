import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'

export default class CourseEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.state = {
            courseId: '',
            moduleId: 0,
            activeModuleId: -1};
        this.handleAllClickEvents = this.handleAllClickEvents.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
    }

    handleAllClickEvents(event)
    {
        var target = event.relatedTarget;
        var targetId = target.id;
        console.log(targetId);
    }

    selectCourse(courseId){
        this.setState({courseId:courseId});
    }

    selectModule(moduleId) {
        this.setState({activeModuleId:moduleId});
    }

    render() {
        return (
            <div>
                <h2>Editing course: {this.state.courseId}</h2>
                <div className="row">
                    <div className="col-4" >
                        <ModuleList courseId={this.state.courseId}
                                    activeModuleId={this.state.activeModuleId}
                                    selectModule={this.selectModule}/>
                    </div>
                    <div className="col-8">
                        <LessonTabs courseId={this.state.courseId} moduleId={this.state.activeModuleId}/>
                    </div>
                </div>
            </div>
        )
    }
}
