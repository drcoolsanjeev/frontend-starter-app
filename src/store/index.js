import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import MiddlewareListener from '@redhat-cloud-services/frontend-components-utilities/files/MiddlewareListener';

let registry;
let middlewareListener;

export function init (...middleware) {
    if (registry) {
        throw new Error('store already initialized');
    }

    middlewareListener = new MiddlewareListener();

    registry = new ReducerRegistry({}, [
        promiseMiddleware,
        middlewareListener.getMiddleware(),
        ...middleware
    ]);

    //If you want to register all of your reducers, this is good place.
    /*
     *  registry.register({
     *    someName: (state, action) => ({...state})
     *  });
     */
    return registry;
}

export function getStore () {
    return registry.getStore();
}

export function register (...args) {
    return registry.register(...args);
}

export function addNewListener ({ actionType, callback }) {
    return middlewareListener.addNew({
        on: actionType,
        callback
    });
}
