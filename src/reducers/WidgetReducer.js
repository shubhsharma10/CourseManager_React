import * as constants from '../constants/index'



export const WidgetReducer = (state={widgets: [],preview: false},action) => {
    switch (action.type) {
        case constants.HEADING_TEXT_CHANGED:
            return {
                ...state,
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.IMAGE_URL_CHANGED:
            return {
                ...state,
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.src = action.src;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.LINK_URL_CHANGED:
            return {
                ...state,
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.href = action.href;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.LIST_TYPE_CHANGED:
            return {
                ...state,
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listType = action.listType;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.WIDGET_NAME_CHANGED:
            return {
                ...state,
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.name = action.name;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.HEADING_SIZE_CHANGED:
            return {
                ...state,
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.SELECT_WIDGET_TYPE:
            let newState =  {
                ...state,
                widgets:
                    state.widgets.filter((widget)=>
                    {
                        if(widget.id === action.id) {
                            widget.widgetType = action.widgetType;
                        }
                        return true;
                    })};
            return JSON.parse(JSON.stringify(newState));

        case constants.SAVE:
            alert('Saved Widgets to database');
            fetch(constants.WIDGET_API_URL.replace('TID', state.parentTopicId)+'/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            });
            return state;

        case constants.PREVIEW:
            newState = Object.assign({},state);
            newState.preview = !newState.preview;
            return newState;

        case constants.FIND_ALL:
            return {
                widgets: action.widgets.map(widget => {
                        widget.size = widget.size.toString();
                        return widget;
                    }
                ),
                preview: false,
                parentTopicId: action.topicId};

        case constants.ADD:
            return {
                ...state,
                widgets:
                [...state.widgets,
                    {
                        id: state.widgets.length+4,
                        widgetType: 'Heading',
                        size: '2',
                        text: 'New Widget',
                        name: '',
                        widgetOrder: 12,
                        listType: 'Unordered'
                    }],
            };
        case constants.DELETE:
            return {
                ...state,
                widgets:
                state.widgets.filter(widget => widget.id !== action.id)};
        default:
            return state;
    }
};