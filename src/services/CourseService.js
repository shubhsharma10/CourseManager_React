let _singleton = Symbol();
const COURSE_API_URL =
    'https://cs5610-summer1-2018-ssharma.herokuapp.com/api/course';

class CourseService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    createCourse(course) {
        return fetch(COURSE_API_URL, {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response;
        })}

    deleteCourse(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId,
            {
                method: 'DELETE'
            });
    }

    findCourseById(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId)
            .then((response) => {
                return response.json();
            });
    }

    updateCourse(courseId,course) {
        return fetch(COURSE_API_URL + '/' + courseId, {
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

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function(response){
                return response.json();
            });
    }
}

export default CourseService;
