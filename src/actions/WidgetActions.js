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