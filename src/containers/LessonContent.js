import React from 'react';
import TopicService from '../services/TopicService'
import CourseService from '../services/CourseService'
import TopicCard from '../components/TopicCard'
import bootbox from '../../node_modules/bootbox.js/bootbox.js';
import $ from 'jquery'

class LessonContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topic : {title:''},
            topics: []
        };

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);

        this.topicService = TopicService.instance;
        this.courseService = CourseService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
        $('.nav-tabs a').on('shown.bs.tab', (()=>{
            this.findAllTopicsForLesson(this.props.courseId,this.props.moduleId,this.props.lessonId);
        }));
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId,newProps.moduleId,newProps.lessonId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }


    setTopicTitle(title) {
        this.setState(
            {topic:
                {title: title}});
    }

    setTopics(topics) {
        this.setState({topics: topics});
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId,moduleId,lessonId)
            .then((topics) => {
                if(topics !== null)
                    this.setTopics(topics)
            });
    }

    updateCourseModifiedTime(){
        this.courseService
            .findCourseById(this.state.courseId)
            .then((response) => {
                response.modified = new Date().toUTCString();
                this.courseService
                    .updateCourse(this.state.courseId,response);
            });
    }

    createTopic() {
        bootbox.prompt({
            size: "small",
            title: "Topic name",
            value: "New Topic",
            closeButton: false,
            callback: (result) => {
                if(result !== null){
                    let topic = {title: result};
                    this.topicService
                        .createTopic(this.state.courseId,this.state.moduleId,this.state.lessonId, topic)
                        .then(() => {
                            this.updateCourseModifiedTime();
                        })
                        .then(() => {
                            this.findAllTopicsForLesson(this.state.courseId,this.state.moduleId,this.state.lessonId);
                        });
                }
            }
        });
    }

    deleteTopic(topicId,topicTitle) {
        let confirmMessage = 'Do you want to delete '+topicTitle+' ?';
        bootbox.confirm(confirmMessage,(result) =>
        {
            if(result) {
                this.topicService
                    .deleteTopic(topicId)
                    .then(() => {
                        this.updateCourseModifiedTime();
                    })
                    .then(() => {
                        this.findAllTopicsForLesson(this.state.courseId,this.state.moduleId,this.state.lessonId);
                    });
            }
        });
    }

    renderTopics() {
        let topics = this.state.topics.map((topic)=> {
            return <TopicCard
                topic={topic}
                key={topic.id}
                id={topic.id}
                delete={this.deleteTopic}/>
        });
        return topics;
    }

    render() {
        return(
            <div className="tab-pane fade" id={this.state.lessonId}>
                <div className="row">
                    <div className="card-columns col-10">
                        {this.renderTopics()}
                    </div>
                    <div className="col-2">
                        <button className='btn btn-success'
                                onClick={this.createTopic}>
                            Add Topic
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LessonContent;

