import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const LinkComponent = ({widget,preview,linkURLChanged,linkTextChanged,widgetNameChanged}) => {
    let linkURL;
    let linkText;
    let widgetName;
    return(
        <div>
            <div hidden={preview} className="container">
                <div className="form-group">
                    <label htmlFor="linkURL">Link URL:</label>
                    <input type="url" className="form-control" id="linkURL" placeholder="http://lorempixel.com/300/150"
                           onChange={()=> linkURLChanged(widget.id,linkURL.value)}
                           ref={node => linkURL = node}
                           value={widget.href}/>
                </div>
                <div className="form-group">
                    <label htmlFor="linkText">Link text:</label>
                    <input type="text" className="form-control" id="linkText" placeholder="Link text"
                           onChange={()=> linkTextChanged(widget.id,linkText.value)}
                           ref={node => linkText = node}
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
                    {widget.href !== undefined && <a href={widget.href}>{widget.text}</a>}
                </div>
            </div>
        </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
    linkURLChanged: (widgetId,newLink) => actions.linkURLChanged(dispatch,widgetId,newLink),
    linkTextChanged: (widgetId,newText) => actions.headingTextChanged(dispatch,widgetId,newText),
    widgetNameChanged: (widgetId,name) => actions.widgetNameChanged(dispatch,widgetId,name)
});

const mapStateToProps = state => ({
    preview: state.preview
});

export const Link = connect(mapStateToProps,dispatchToPropsMapper)(LinkComponent);