import React from 'react'
import * as actions from '../actions/WidgetActions'
import {connect} from 'react-redux'
import {Widget} from '../components/Widget'

class WidgetListComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            topicId: ''
        };
    }

    componentWillReceiveProps(newProps) {
        if(newProps.topicId !== this.state.topicId){
            this.setState({topicId: newProps.topicId});
            this.props.findAllWidgets(newProps.topicId);
        }
    }


    render() {
        return(
            <div className="container widgetListContainer">
                <div className="row">
                    <div className="col-xl-9 col-md-5 col-sm-0 col-lg-8">
                    </div>
                    <div className="col-xl-3 col-md-7 col-sm-12 col-lg-4">
                        <button className="btn btn-primary ml-2 float-right"
                                onClick={this.props.previewWidgets}>
                            Preview
                        </button>
                        <button hidden={this.props.preview}
                                className="btn btn-success float-right"
                                onClick={this.props.saveWidgets}>
                            Save
                        </button>
                    </div>
                </div>
                <div>
                <ul className="list-group">
                    {this.props.widgets.map((widget,index) =>
                        <Widget key={widget.id} currIndex={index} widget={widget} length={this.props.widgets.length}/>)}
                </ul>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-4 col-sm-11 col-lg-4">
                        <button className="btn btn-success float-right"
                                onClick={() => this.props.addWidget()}>
                            Add Widget
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

// connect parameters
const mapStateToProps = (state) => ({
    widgets: state.widgets,
    preview: state.preview,
    parentTopicId: state.parentTopicId
});

const mapDispatchToProps = (dispatch) => ({
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch,topicId),
    addWidget: () => actions.addWidget(dispatch),
    saveWidgets: () => actions.saveWidgets(dispatch),
    previewWidgets: () => actions.previewWidgets(dispatch)

});

export const WidgetList = connect(mapStateToProps,mapDispatchToProps)(WidgetListComponent);