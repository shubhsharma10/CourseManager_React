const LESSON_API_URL =
    'https://cs5610-summer1-2018-ssharma.herokuapp.com/api/course/CID/module/MID/lesson';
const GEN_LESSON_API_URL =
    'https://cs5610-summer1-2018-ssharma.herokuapp.com/api/lesson';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllLessonsForCourseModule(courseId,moduleId) {
        return fetch(LESSON_API_URL
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
        return fetch(LESSON_API_URL
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
        return fetch(GEN_LESSON_API_URL + '/' + lessonId,
            {
                method: 'DELETE'
            });
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
}
