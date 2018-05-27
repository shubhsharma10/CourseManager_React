import React from 'react'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import {WidgetReducer} from '../reducers/WidgetReducer'
import {WidgetList} from './WidgetList'

export default class WidgetEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topicId: '',
            widgetStore: ''
        };

        this.setCourseID = this.setCourseID.bind(this);
        this.setModuleID = this.setModuleID.bind(this);
        this.setLessonID = this.setLessonID.bind(this);
        this.setTopicID = this.setTopicID.bind(this);

        this.state.widgetStore = createStore(WidgetReducer);
    }

    componentDidMount() {
        this.setCourseID(this.props.match.params.courseId);
        this.setModuleID(this.props.match.params.moduleId);
        this.setLessonID(this.props.match.params.lessonId);
        this.setTopicID(this.props.match.params.topicId);
    }
    componentWillReceiveProps(newProps) {
        this.setCourseID(newProps.match.params.courseId);
        this.setModuleID(newProps.match.params.moduleId);
        this.setLessonID(newProps.match.params.lessonId);
        this.setTopicID(newProps.match.params.topicId);
    }

    setCourseID(courseId) {
        this.setState({courseId:courseId});
    }

    setModuleID(moduleId) {
        this.setState({moduleId:moduleId});
    }

    setLessonID(lessonId) {
        this.setState({lessonId:lessonId});
    }

    setTopicID(topicId) {
        this.setState({topicId:topicId});
    }

    render() {
        return (
            <Provider store={this.state.widgetStore}>
                <div id="customTabContent">
                    {this.state.topicId !== undefined && <WidgetList topicId={this.state.topicId}/>}
                </div>
            </Provider>
        )
    }
}
