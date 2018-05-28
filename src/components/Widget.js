import React from 'react'
import {connect} from 'react-redux'
import {Heading} from './Heading'
import {Image} from './Image'
import {Paragraph} from './Paragraph'
import * as actions from '../actions/WidgetActions'

const WidgetComponent = ({widget,preview,deleteWidget,changeWidgetType}) => {
    let select;
    return(
        <li>
            <div hidden={preview} className="container well">
                <div className="row justify-content-end">
                    <div className="col-4">
                    </div>
                    <div className="col-4">
                        <button className="btn-primary">
                            <i className="fa fa-arrow-up"/>
                        </button>
                        <button className="btn-primary">
                            <i className="fa fa-arrow-down"/>
                        </button>
                        <select className="select-widget"
                                value={widget.widgetType}
                                ref={node => select = node}
                                onChange={() => changeWidgetType(widget.id,select.value)}>
                            <option>Heading</option>
                            <option>Paragraph</option>
                            <option>List</option>
                            <option>Image</option>
                        </select>
                        <button className="btn-danger"
                                onClick={e => {
                                        e.preventDefault();
                                        deleteWidget(widget.id);
                            }}>
                            <i className="fa fa-times"/>
                        </button>
                    </div>
                </div>


            </div>
            <div>
                {widget.widgetType === 'Heading' && <Heading widget={widget}/>}
                {widget.widgetType === 'Image' && <Image widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <Paragraph widget={widget}/>}
            </div>
        </li>
    );
};

const dispatchToPropsMapper = (dispatch) => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch,widgetId),
    changeWidgetType: (widgetId,newType) => actions.changeWidgetType(dispatch,widgetId,newType)
});

const mapStateToProps = state => ({
    preview: state.preview
});

export const Widget = connect(mapStateToProps,dispatchToPropsMapper)(WidgetComponent);
