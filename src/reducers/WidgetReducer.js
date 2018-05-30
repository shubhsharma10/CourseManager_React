import * as constants from '../constants/index'
import bootbox from '../../node_modules/bootbox.js/bootbox';

const moveOrderUp = (widgets,widgetId) => {
    let index = widgets.map(function (widget) { return widget.id; }).indexOf(widgetId);
    if(index === 0)
    {
        return widgets;
    }
    else
    {
        let order1 = widgets[index-1].widgetOrder;
        let order2 = widgets[index].widgetOrder;
        widgets[index-1].widgetOrder = order2;
        widgets[index].widgetOrder = order1;
        widgets[index] = Object.assign({},widgets[index]);
        widgets[index-1] = Object.assign({},widgets[index-1]);
        widgets.sort((a, b) => a.widgetOrder - b.widgetOrder);
        return widgets;
    }
};

const moveOrderDown = (widgets,widgetId) => {
    let index = widgets.map(function (widget) { return widget.id; }).indexOf(widgetId);
    if(index === widgets.length-1)
    {
        return widgets;
    }
    else
    {
        let order1 = widgets[index+1].widgetOrder;
        let order2 = widgets[index].widgetOrder;
        widgets[index+1].widgetOrder = order2;
        widgets[index].widgetOrder = order1;
        widgets[index] = Object.assign({},widgets[index]);
        widgets[index+1] = Object.assign({},widgets[index+1]);
        widgets.sort((a, b) => a.widgetOrder - b.widgetOrder);
        return widgets;
    }
};

const resetOrder = (widgets) => {
    let counter = 1;
    widgets.map(widget => {
        widget.widgetOrder = counter;
        counter++;
        return widget;
    });
    return widgets;
};


const isDuplicateWidgetName = (widgets) => {
    let nameArr = widgets.map(function(widget){ return widget.name });
    return nameArr.some(function(widgetName, idx){
        return nameArr.indexOf(widgetName) !== idx
    });
};

export const WidgetReducer = (state={widgets: [],preview: false, isWidgetNameUnique: true},action) => {
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
            var newWidgets = state.widgets.map(widget => {
                if(widget.id === action.id) {
                    widget.name = action.name;
                }
                return Object.assign({}, widget);
            });

            return {
                ...state,
                widgets: newWidgets,
                isWidgetNameUnique: ! isDuplicateWidgetName(newWidgets)
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
            fetch(constants.WIDGET_API_URL.replace('TID', state.parentTopicId)+'/save', {
                method: 'post',
                body: JSON.stringify(resetOrder(state.widgets)),
                headers: {
                    'content-type': 'application/json'
                }
            });

            bootbox.alert("Saved widgets to the database!");
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
                parentTopicId: action.topicId,
                isWidgetNameUnique: true};

        case constants.ADD:
            return {
                ...state,
                widgets:
                [...state.widgets,
                    {
                        id: Date.now() & 0xfffffff,
                        widgetType: 'Heading',
                        size: '2',
                        text: 'New Widget',
                        name: '',
                        widgetOrder: state.widgets.length + 1 ,
                        listType: 'Unordered'
                    }],
            };
        case constants.DELETE:
            var newWidgets = resetOrder(state.widgets.filter(widget => widget.id !== action.id));
            return {
                ...state,
                widgets: newWidgets,
                isWidgetNameUnique: ! isDuplicateWidgetName(newWidgets)};
        case constants.MOVE_ORDER_UP:
            return {
                ...state,
                widgets: moveOrderUp([...state.widgets],action.id)
            };
        case constants.MOVE_ORDER_DOWN:
            return {
                ...state,
                widgets: moveOrderDown([...state.widgets],action.id)
            };
        default:
            return state;
    }
};