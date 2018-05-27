let _singleton = Symbol();
const WIDGET_API_URL =
    'http://localhost:8080/api/widget';
const DIRECT_WIDGET_API_URL =
    'http://localhost:8080/api/topic/TID/widget';

class WidgetService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }

    createWidget(widget) {
        return fetch(WIDGET_API_URL, {
            body: JSON.stringify(widget),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response;
        })}

    deleteWidget(widgetId) {
        return fetch(DIRECT_WIDGET_API_URL + '/' + widgetId,
            {
                method: 'DELETE'
            });
    }

    findWidgetById(widgetId) {
        return fetch(DIRECT_WIDGET_API_URL + '/' + widgetId)
            .then((response) => {
                return response.json();
            });
    }

    updateCourse(courseId,course) {
        return fetch(DIRECT_WIDGET_API_URL + '/' + courseId, {
            method: 'put',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            })
            .catch(function (error) {
                console.log("Update course promise error :: "+error);
                return null;
            });
    }

    findAllWidgets() {
        return fetch(DIRECT_WIDGET_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findAllWidgetsForTopic(topicId) {
        return fetch(WIDGET_API_URL
            .replace('TID', topicId))
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                return null;
            });
    }
}

export default WidgetService;

