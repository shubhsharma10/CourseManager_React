import React from 'react'
import {connect} from 'react-redux'

const WidgetComponent = ({widget}) => {
    let select;
    return(
        <li>
            <div>
                {widget.id} {widget.widgetType}
                <select value={widget.widgetType} ref={node => select = node}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                </select>
                <button onClick={e => {
                    e.preventDefault();
                    //deleteWidget(widget.id);
                }}>
                    Delete
                </button>
            </div>
            {/*<div>*/}
                {/*{widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}*/}
                {/*{widget.widgetType==='Image' && <Image/>}*/}
            {/*</div>*/}
        </li>
    );
};


export const Widget = connect()(WidgetComponent);
