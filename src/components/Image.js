import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const ImageComponent = ({widget,preview,imageURLChanged,widgetNameChanged}) => {
    let inputURL;
    let widgetName;

    return(
        <div>
            <div hidden={preview} className="container">
                <div className="form-group">
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="url" className="form-control" id="imageURL" placeholder="http://lorempixel.com/300/150"
                           onChange={()=> imageURLChanged(widget.id,inputURL.value)}
                           ref={node => inputURL = node}
                           value={widget.src}/>
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
                    {widget.src !== undefined && <img src={widget.src} className="img-thumbnail"/>}
                </div>
            </div>
        </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
    imageURLChanged: (widgetId,newURL) => actions.imageURLChanged(dispatch,widgetId,newURL),
    widgetNameChanged: (widgetId,name) => actions.widgetNameChanged(dispatch,widgetId,name)
});

const mapStateToProps = state => ({
    preview: state.preview
});

export const Image = connect(mapStateToProps,dispatchToPropsMapper)(ImageComponent);