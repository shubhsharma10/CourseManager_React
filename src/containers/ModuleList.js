import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import ModuleEditor from './ModuleEditor';
import bootbox from '../../node_modules/bootbox.js/bootbox.js';

export default class ModuleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: 'New Module' },
            selectedModuleId: '',
            moduleSelected: false,
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
        this.setState({selectedModuleId:moduleId});
        this.setState({moduleSelected:true});
        //this.context.history.push('/module/'+moduleId);
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
                                   courseId={this.state.courseId}
                                   key={module.id}
                                   active = {module.id === this.state.selectedModuleId}
                                   selectModule={this.selectModule}
                                   delete={this.deleteModule}/>
        },this);
        return modules;
    }

    render() {
        return (
            <Router>
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
                        <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}/>
                    </div>

                </div>
            </Router>
        );
    }
}