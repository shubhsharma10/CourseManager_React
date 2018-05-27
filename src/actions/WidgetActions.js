import * as constants from '../constants/index'

export const addWidget = (dispatch) => {
    dispatch({type: constants.ADD});
};

export const deleteWidget = (dispatch,id) => {
    dispatch({type: constants.DELETE, id: id});
};

export const findAllWidgets = (dispatch,topicId) => {
    fetch(constants.WIDGET_API_URL.replace('TID', topicId))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL,
            widgets: widgets
        }));
};

export const headingSizeChanged = (dispatch,widgetId,newSize) => {
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    });
};

export const headingTextChanged = (dispatch,widgetId,newText) => {
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    });
};