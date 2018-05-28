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
            widgets: widgets.sort((a, b) => a.widgetOrder - b.widgetOrder),
            topicId: topicId
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

export const imageURLChanged = (dispatch,widgetId,newURL) => {
    dispatch({
        type: constants.IMAGE_URL_CHANGED,
        id: widgetId,
        src: newURL
    });
};

export const linkURLChanged = (dispatch,widgetId,newURL) => {
    dispatch({
        type: constants.LINK_URL_CHANGED,
        id: widgetId,
        href: newURL
    });
};

export const listTypeLChanged = (dispatch,widgetId,newType) => {
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType
    });
};

export const widgetNameChanged = (dispatch,widgetId,name) => {
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        name: name
    });
};

export const changeWidgetType = (dispatch,widgetId,newType) => {
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: newType
    });
};

export const saveWidgets = dispatch => {
    dispatch({
        type: constants.SAVE
    });
};

export const previewWidgets = dispatch => {
    dispatch({
        type: constants.PREVIEW
    });
};