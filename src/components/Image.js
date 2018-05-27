import React from 'react'
import {connect} from 'react-redux'

const ImageComponent = ({widget,preview}) => {
    let inputElem;

    return(
        <div>
            <div hidden={preview}>
                <h2>Image {widget.size}</h2>
                <input ref={node => inputElem = node}
                       value="Enter image link here"/>
            </div>
            <div>
                {widget.size === '1' && <h1>{widget.text}</h1>}
                {widget.size === '2' && <h2>{widget.text}</h2>}
                {widget.size === '3' && <h3>{widget.text}</h3>}
            </div>
        </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
});

const mapStateToProps = state => ({
    preview: state.preview
});

export const Image = connect(mapStateToProps,dispatchToPropsMapper)(ImageComponent);