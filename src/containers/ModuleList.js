import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService'
import bootbox from '../../node_modules/bootbox.js/bootbox.js';

export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: 'New Module' },
            selectedModuleId: '',
            modules: []
        };

        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);

        this.moduleService = ModuleService.instance;
    }

    setModules(modules) {
        this.setState({modules: modules});
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)})
            .catch(function (response) {
                console.log('Error caught in find modules for course '+response);
            });
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

    selectModule(moduleId) {
        this.setState({selectedModuleId:moduleId})
    }

    deleteModule(moudleId,moduleTitle) {
        let confirmMessage = 'Do you want to delete '+moduleTitle+' ?';
        bootbox.confirm(confirmMessage,(result) =>
        {
            if(result) {
                this.moduleService
                    .deleteModule(moudleId)
                    .then(() => {
                        this.findAllModulesForCourse(this.state.courseId);
                    });
            }
        });
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let modules = this.state.modules.map(function(module){
            return <ModuleListItem module={module}
                                   key={module.id}
                                   active = {module.id === this.state.selectedModuleId}
                                   selectModule={this.selectModule}
                                   rename={this.renameModule}
                                   delete={this.deleteModule}/>
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
                    <br/>
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