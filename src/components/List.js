import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const renderUnorderedList = (listItems) => {
    return(
        <ul>
            {listItems.map(item => {
            return <li>{item}</li>;
        })}
        </ul>
    )
};

const renderOrderedList = (listItems) => {
    return(
        <ol>
            {listItems.map(item => {
            return <li>{item}</li>;
        })}
        </ol>
    )
};

const renderListItems = (text,listType) => {
    let listItems = text.split('\n');
    if(listType === "Unordered")
        return renderUnorderedList(listItems);
    else
        return renderOrderedList(listItems);
};

const ListComponent = ({widget,preview,listTextChanged,listTypeChanged,widgetNameChanged}) => {
    let widgetName;
    let listType;
    let listText;
    return(
        <div>
            <div hidden={preview} className="container">
                <div className="row">
                    <h3>{widget.widgetType} widget</h3>
                </div>
                <div className="form-group">
                    <label htmlFor="listText">List Text:</label>
                    <textarea className="form-control" id="listText" placeholder="Put \n eact \item"
                           onChange={()=> listTextChanged(widget.id,listText.value)}
                           ref={node => listText = node} data-role="none"
                           value={widget.text}/>
                </div>
                <div className="form-group">
                    <label htmlFor="listType">List Type:</label>
                    <select onChange={() => listTypeChanged(widget.id,listType.value)}
                            id="listType"
                            className="form-control"
                            ref={node => listType = node}
                            value={widget.listType}>
                        <option value="Unordered">Unordered List</option>
                        <option value="Ordered">Ordered List</option>
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
                    {widget.listType === "Unordered" && renderListItems(widget.text,widget.listType)}
                    {widget.listType === "Ordered" && renderListItems(widget.text,widget.listType)}
                </div>
            </div>
        </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
    listTextChanged: (widgetId,newText) => actions.headingTextChanged(dispatch,widgetId,newText),
    listTypeChanged: (widgetId,newType) => actions.listTypeLChanged(dispatch,widgetId,newType),
    widgetNameChanged: (widgetId,name) => actions.widgetNameChanged(dispatch,widgetId,name)
});

const mapStateToProps = state => ({
    preview: state.preview
});

export const List = connect(mapStateToProps,dispatchToPropsMapper)(ListComponent);