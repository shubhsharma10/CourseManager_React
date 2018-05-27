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
            <div className="container">
                <h1>Widget List {this.props.widgets.length}</h1>
                <div className="row justify-content-end">
                    <div className="col-md-4 col-sm-11 col-lg-4">
                        <button hidden={this.props.preview} className="btn btn-success mr-2 mb-2">Save</button>
                        <button className="btn btn-primary mb-2" data-toggle="button">Preview</button>
                    </div>
                </div>
                <div>
                <ul className="list-group">
                    {this.props.widgets.map(widget =>
                        <Widget key={widget.id} widget={widget}/>)}
                </ul>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-4 col-sm-11 col-lg-4">
                        <button className="btn btn-success mt-2"
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
    preview: state.preview
});

const mapDispatchToProps = (dispatch) => ({
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch,topicId),
    addWidget: () => actions.addWidget(dispatch)

});

export const WidgetList = connect(mapStateToProps,mapDispatchToProps)(WidgetListComponent);