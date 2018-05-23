const MODULE_API_URL =
    'https://cs5610-summer1-2018-ssharma.herokuapp.com/api/course/CID/module';

const DIRECT_MODULE_API_URL = 'https://cs5610-summer1-2018-ssharma.herokuapp.com/api/module'

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            });
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            {
                return response;
            });
    }

    deleteModule(moduleId) {
        return fetch(DIRECT_MODULE_API_URL + '/' + moduleId,
            {
                method: 'DELETE'
            });
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }
}
