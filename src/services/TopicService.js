import * as constants from '../constants/index'

let _singleton = Symbol();
export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        return fetch(constants.TOPIC_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId)
            .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                return null;
            });
    }

    createTopic(courseId, moduleId, lessonId,topic) {
        return fetch(constants.TOPIC_API_URL
                .replace('CID', courseId)
                .replace('MID', moduleId)
                .replace('LID', lessonId),
            {
                body: JSON.stringify(topic),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            });
    }

    deleteTopic(topicId) {
        return fetch(constants.GEN_TOPIC_API_URL + '/' + topicId,
            {
                method: 'DELETE'
            });
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }
}
