const TOPIC_API_URL =
    'https://cs5610-summer1-2018-ssharma.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic';
const GEN_TOPIC_API_URL =
    'https://cs5610-summer1-2018-ssharma.herokuapp.com/api/topic';

let _singleton = Symbol();
export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        return fetch(TOPIC_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId)
            .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    createTopic(courseId, moduleId, lessonId,topic) {
        return fetch(TOPIC_API_URL
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
        return fetch(GEN_TOPIC_API_URL + '/' + topicId,
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
