import React from 'react'
import ModuleService from '../services/ModuleService'
import LessonService from '../services/LessonService'
import LessonTab from "../components/LessonTab";

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            courseId: '',
            activeTabIndex: '',
            lesson: { title: 'New Lesson' },
            lessons: [
                {title:'Lesson1', id: 2435}
            ]
        };
        this.createLesson = this.createLesson.bind(this);

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.lessonService = LessonService.instance;
        this.moduleService = ModuleService.instance;
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    findAllLessonsForCourseModule(courseId,moduleId) {
        this.lessonService
            .findAllLessonsForCourseModule(courseId,moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
        if(moduleId > -1) {
            this.findAllLessonsForCourseModule(this.state.courseId, moduleId);
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
    }

    createLesson() {
        this.lessonService
            .createLesson(this.props.courseId,this.props.moduleId, this.state.lesson)
            .then(this.findAllLessonsForCourseModule(this.props.courseId,this.props.moduleId))
    }

    renderTabs() {
        let lessons = this.state.lessons.map(function(lesson){
            return <LessonTab
                lesson={lesson}
                key={lesson.id}/>
        },this);
        return lessons;
    }

    renderActiveTabContent() {

    }


    render() {
        return (
            <div>
                <h4>{this.state.moduleId}</h4>
                <ul className="nav nav-tabs">
                    {this.renderTabs()}
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <div className='row'>
                                <div className='col-8'>
                                    <input className='form-control form-control-sm'
                                           placeholder='New Lesson'
                                           value={this.state.lesson.title}
                                           onChange={this.setLessonTitle}/>
                                </div>
                                <div className='col-1'>
                                    <button className='btn btn-success btn-sm'
                                            onClick={this.createLesson}>
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <span className="float-right">
                        <button className="btn btn-primary" style={{margin:'5px'}}>Rename</button>
                        <button className="btn btn-danger" style={{margin:'5px'}}>Delete</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

{/*<ul className="nav nav-tabs">*/}
    {/*<li class="nav-item">*/}
        {/*<a class="nav-link active" id="home-tab" data-toggle="tab" role="tab" href="#home" aria-controls="home" aria-selected="true">Home</a>*/}
    {/*</li>*/}
    {/*<li class="nav-item">*/}
        {/*<a class="nav-link" id="profile-tab" data-toggle="tab" role="tab" href="#profile" aria-controls="profile" aria-selected="false">Profile</a>*/}
    {/*</li>*/}
{/*</ul>*/}
{/*<div className="tab-content" id="myTabContent">*/}
    {/*<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">*/}
    {/*Test1*/}
    {/*</div>*/}
    {/*<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">*/}
    {/*Test2*/}
    {/*</div>*/}
    {/*</div>*/}