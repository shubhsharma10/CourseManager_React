import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const HeadingComponent = ({widget,preview,headingSizeChanged,headingTextChanged,widgetNameChanged}) => {
    let headingSize;
    let widgetName;
    let headingText;
    return(
        <div>
            <div hidden={preview} className="container">
                <div className="form-group">
                    <label htmlFor="headingText">Heading Text:</label>
                    <input type="text" className="form-control" id="headingText" placeholder="Heading Text"
                           onChange={()=> headingTextChanged(widget.id,headingText.value)}
                           ref={node => headingText = node}
                           value={widget.text}/>
                </div>
                <div className="form-group">
                    <label htmlFor="headingSize">Heading Size:</label>
                    <select onChange={() => headingSizeChanged(widget.id,headingSize.value)}
                            id="headingSize"
                            className="form-control browser-default"
                            ref={node => headingSize = node}
                            value={widget.size}>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                        <option value="5">Heading 5</option>
                    </select>
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
                    {widget.size === '1' && <h1>{widget.text}</h1>}
                    {widget.size === '2' && <h2>{widget.text}</h2>}
                    {widget.size === '3' && <h3>{widget.text}</h3>}
                    {widget.size === '4' && <h4>{widget.text}</h4>}
                    {widget.size === '5' && <h5>{widget.text}</h5>}
                </div>
            </div>
        </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
    headingSizeChanged: (widgetId,newSize) => actions.headingSizeChanged(dispatch,widgetId,newSize),
    headingTextChanged: (widgetId,newText) => actions.headingTextChanged(dispatch,widgetId,newText),
    widgetNameChanged: (widgetId,name) => actions.widgetNameChanged(dispatch,widgetId,name)
});

const mapStateToProps4 = state => ({
    preview: state.preview
});

export const Heading = connect(mapStateToProps4,dispatchToPropsMapper)(HeadingComponent);