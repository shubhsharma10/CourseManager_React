import * as constants from '../constants/index'

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllLessonsForCourseModule(courseId,moduleId) {
        return fetch(constants.LESSON_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                return null;
            });
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(constants.LESSON_API_URL
                .replace('CID', courseId)
                .replace('MID', moduleId),
            {
                body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteLesson(lessonId) {
        return fetch(constants.GEN_LESSON_API_URL + '/' + lessonId,
            {
                method: 'DELETE'
            });
    }

    findLessonById(lessonId) {
        return fetch(constants.GEN_LESSON_API_URL + '/' + lessonId)
            .then((response) => {
                return response.json();
            })
            .catch(function (error) {
                return null;
            });
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
}
