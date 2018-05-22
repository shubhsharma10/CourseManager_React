import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService'

export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: 'New Module' },
            modules: []
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);

        this.setCourseId =
            this.setCourseId.bind(this);

        this.moduleService = ModuleService.instance;
    }

    setModules(modules) {
        this.setState({modules: modules});
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)})
            .catch(function (response) {
                console.log('Error caught in find modules for course '+response);
            });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule() {
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(() => {this.findAllModulesForCourse(this.props.courseId);})
            .then(() => {this.setState({module: {title: 'New Module'}});});
}

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let modules = this.state.modules.map(function(module){
            return <ModuleListItem module={module}
                                   key={module.id}
                                   active = {module.id === this.props.activeModuleId}
                                   selectModule={this.props.selectModule}/>
        },this);
        return modules;
    }
    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <input onChange={this.titleChanged}
                           value={this.state.module.title}
                           id="moduleTitleFId"
                           placeholder="New Module"
                           className="form-control"/>
                    <button onClick={this.createModule} className="btn btn-primary btn-block">
                        <i className="fa fa-plus"></i>
                    </button>
                    <ul className="list-group">
                        {this.renderListOfModules()}
                    </ul>
                </div>
                <div className="col-9">
                    BB
                </div>

            </div>
        );
    }
}