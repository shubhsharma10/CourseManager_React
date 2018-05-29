import React from 'react'
import {connect} from 'react-redux'
import {Heading} from './Heading'
import {Image} from './Image'
import {Paragraph} from './Paragraph'
import {Link} from './Link'
import {List} from './List'
import * as actions from '../actions/WidgetActions'

const WidgetComponent = ({currIndex,length,widget,preview,deleteWidget,changeWidgetType,moveOrderUp,moveOrderDown}) => {
    let select;
    return(
        <li>
            <div hidden={preview} className="container" id="widgetControlRow">
                <div className="row">
                    <div className="col-xl-9 col-md-5 col-sm-0 col-lg-7">
                    </div>
                    <div className="col-xl-3 col-md-7 col-sm-12 col-lg-5">
                        <button className="btn-danger float-right"
                                onClick={e => {
                                    e.preventDefault();
                                    deleteWidget(widget.id);
                                }}>
                            <i className="fa fa-times"/>
                        </button>
                        <select className="form-control-sm float-right"
                                value={widget.widgetType}
                                ref={node => select = node}
                                onChange={() => changeWidgetType(widget.id,select.value)}>
                            <option>Heading</option>
                            <option>Paragraph</option>
                            <option>Link</option>
                            <option>List</option>
                            <option>Image</option>
                        </select>
                        <button hidden={currIndex === length-1} className="btn-primary float-right"
                                onClick={()=> moveOrderDown(widget.id)}>
                            <i className="fa fa-arrow-down"/>
                        </button>
                        <button hidden={currIndex === 0} className="btn-primary float-right"
                                onClick={()=> moveOrderUp(widget.id)}>
                            <i className="fa fa-arrow-up"/>
                        </button>


                    </div>
                </div>


            </div>
            <div id="sunkenDiv">
                {widget.widgetType === 'Heading' && <Heading widget={widget}/>}
                {widget.widgetType === 'Image' && <Image widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <Paragraph widget={widget}/>}
                {widget.widgetType === 'Link' && <Link widget={widget}/>}
                {widget.widgetType === 'List' && <List widget={widget}/>}
            </div>
        </li>
    );
};

const dispatchToPropsMapper = (dispatch) => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch,widgetId),
    changeWidgetType: (widgetId,newType) => actions.changeWidgetType(dispatch,widgetId,newType),
    moveOrderUp: (widgetId) => actions.moveOrderUp(dispatch,widgetId),
    moveOrderDown: (widgetId) => actions.moveOrderDown(dispatch,widgetId),
});

const mapStateToProps = state => ({
    preview: state.preview
});

export const Widget = connect(mapStateToProps,dispatchToPropsMapper)(WidgetComponent);
