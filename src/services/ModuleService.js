import * as constants from '../constants/index'

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            constants.MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                return null;
            });
    }

    createModule(courseId, module) {
        return fetch(constants.MODULE_API_URL.replace('CID', courseId),
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
        return fetch(constants.DIRECT_MODULE_API_URL + '/' + moduleId,
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
