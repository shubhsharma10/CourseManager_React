import React from 'react'
import {connect} from 'react-redux'
import {Heading} from './Heading'
import {Image} from './Image'

const WidgetComponent = ({widget}) => {
    let select;
    return(
        <li>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h2>{widget.WidgetType} Widget</h2>
                    </div>
                    <div className="col-4">
                    </div>
                    <div className="col-4">
                        <button className="btn-primary">
                            <i className="fa fa-arrow-up"/>
                        </button>
                        <button className="btn-primary">
                            <i className="fa fa-arrow-down"/>
                        </button>
                        <select className="select-widget" value={widget.widgetType} ref={node => select = node}>
                            <option>Heading</option>
                            <option>Paragraph</option>
                            <option>List</option>
                            <option>Image</option>
                        </select>
                        <button className="btn-danger"
                                onClick={e => {
                                        e.preventDefault();
                                        //deleteWidget(widget.id);
                            }}>
                            <i className="fa fa-times"/>
                        </button>
                    </div>
                </div>


            </div>
            <div>
                {widget.WidgetType === 'Heading' && <Heading widget={widget}/>}
                {widget.WidgetType === 'Image' && <Image/>}
            </div>
        </li>
    );
};


export const Widget = connect()(WidgetComponent);
