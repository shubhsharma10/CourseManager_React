import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const HeadingComponent = ({widget,preview,headingSizeChanged,headingTextChanged}) => {
    let headingSize;
    let widgetName;
    let headingText;
    console.log('heading componentn');
    return(
        <div>
            <div hidden={preview} className="container">
                <div className="form-group">
                    <label for="headingText">Heading Text:</label>
                    <input type="text" className="form-control" id="headingText" placeholder="Heading Text"
                           onChange={()=> headingTextChanged(widget.id,headingText.value)}
                           ref={node => headingText = node}
                           value={widget.text}/>
                </div>
                <div className="form-group">
                    <label for="headingSize">Heading Size:</label>
                    <select onChange={() => headingSizeChanged(widget.id,headingSize.value)}
                            id="headingSize"
                            className="form-control"
                            ref={node => headingSize = node}
                            value={widget.size}>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="widgetName">Widget Name:</label>
                    <input type="text" className="form-control" id="widgetName" placeholder="Widget Name"
                           onChange={()=> headingTextChanged(widget.id,widgetName.value)}
                           ref={node => widgetName = node}
                           value={widget.name}/>
                </div>
            </div>
            <div className="container">
                <div>
                    <h3>Preview</h3>
                </div>
                <div>
                    {widget.size === '1' && <h1>{widget.text}</h1>}
                    {widget.size === '2' && <h2>{widget.text}</h2>}
                    {widget.size === '3' && <h3>{widget.text}</h3>}
                </div>
            </div>
        </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
    headingSizeChanged: (widgetId,newSize) => actions.headingSizeChanged(dispatch,widgetId,newSize),
    headingTextChanged: (widgetId,newText) => actions.headingTextChanged(dispatch,widgetId,newText)
});

const mapStateToProps4 = state => ({
    preview: state.preview
});

export const Heading = connect(mapStateToProps4,dispatchToPropsMapper)(HeadingComponent);