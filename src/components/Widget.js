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
        <li id="sunkenDiv">
            <div hidden={preview} className="container" id="widgetControlRow">
                <div className="row">
                    <div className="col-xl-9 col-md-5 col-sm-1 col-lg-7">
                        <h3>{widget.widgetType} widget</h3>
                    </div>
                    <div className="form-group col-xl-3 col-md-7 col-sm-11 col-lg-5">
                        <select className="float-right from-control browser-default"
                                value={widget.widgetType}
                                ref={node => select = node}
                                onChange={() => changeWidgetType(widget.id,select.value)}>
                            <option>Heading</option>
                            <option>Paragraph</option>
                            <option>Link</option>
                            <option>List</option>
                            <option>Image</option>
                        </select>
                        <a className="btn-floating btn-small float-right waves-effect waves-light red"
                           onClick={e => {
                               e.preventDefault();
                               deleteWidget(widget.id);
                           }}>
                            <i className="material-icons">clear</i>
                        </a>
                        <a hidden={currIndex === length-1}
                           className="btn-floating btn-small float-right waves-effect waves-light green"
                           onClick={()=> moveOrderDown(widget.id)}>
                            <i className="material-icons">arrow_downward</i>
                        </a>
                        <a hidden={currIndex === 0}
                           className="btn-floating btn-small float-right waves-effect waves-light green"
                           onClick={()=> moveOrderUp(widget.id)}>
                            <i className="material-icons">arrow_upward</i>
                        </a>
                    </div>
                </div>


            </div>
            <div>
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
