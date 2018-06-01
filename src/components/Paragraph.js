import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const ParagraphComponent = ({widget,preview,paragraphTextChanged,widgetNameChanged}) => {
    let widgetName;
    let paragraphText;
    return(
        <div>
            <div hidden={preview} className="container">
                <div className="form-group">
                    <label htmlFor="paragraphText">Paragraph:</label>
                    <input type="text" className="form-control" id="paragraphText" placeholder="Lorem ipsum"
                           onChange={()=> paragraphTextChanged(widget.id,paragraphText.value)}
                           ref={node => paragraphText = node}
                           value={widget.text}/>
                </div>
                <div className="form-group">
                    <label htmlFor="widgetName">Widget Name:</label>
                    <input type="text" className="form-control" id="widgetName" placeholder="Widget Name"
                           value={widget.name}
                           onChange={()=> widgetNameChanged(widget.id,widgetName.value)}
                           ref={node => widgetName = node}/>
                </div>
            </div>
            <div className="container">
                <div hidden={preview}>
                    <h3>Preview</h3>
                </div>
                <div>
                    <p>{widget.text}</p>
                </div>
            </div>
        </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
    paragraphTextChanged: (widgetId,newText) => actions.headingTextChanged(dispatch,widgetId,newText),
    widgetNameChanged: (widgetId,name) => actions.widgetNameChanged(dispatch,widgetId,name)
});

const mapStateToProps = state => ({
    preview: state.preview
});

export const Paragraph = connect(mapStateToProps,dispatchToPropsMapper)(ParagraphComponent);