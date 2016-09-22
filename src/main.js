import './main.scss';

// Angular at the top so other things don't fail that expect the global.
// Looking at you ng-redux.
import angular from 'angular';

// Build the router
import { createRouter } from 'router5';
import browserPlugin from 'router5/plugins/browser';

const route = (name, path, opts = {}) => ({ path, name, ...opts });

// Define some routes to test
const routes = [
	route('root', '/'),
];

const router = createRouter(routes, {
	defaultRoute: 'root',
}).usePlugin(browserPlugin({
	useHash: true,
	hashPrefix: '!',
}));

// Build state from some defaults
import ngRedux from 'ng-redux';
import { defaultMiddleware } from './util/state';
import { combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';

// Base reducer -- publiching route only
const appReducer = combineReducers({
	route: router5Reducer,
});


// Create root app module
const app = angular.module('dante-codes', [
	ngRedux,
]).config(['$ngReduxProvider', ($ngReduxProvider) => {
	$ngReduxProvider.createStoreWith(
		appReducer,
		[
			// Core redux nice-stuff
			...defaultMiddleware,
			// App specific
			router5Middleware(router),
		]
	);
}]).run(['$rootScope', '$ngRedux', (root) => {
	// Including $ngRedux to kick it off?

	// @todo: load route info + state
	setTimeout(() =>
		root.$applyAsync(() => {
			root.loaded = true;
			router.start();
		}),
		10
	);
}]);


// Register controllers


import { LandingController } from './landing';
import landingTpl from './landing.tpl.jade';
app.component('landing', {
	template: landingTpl,
	controller: [LandingController],
});

/*
import { ReplController } from './repl/repl.js';
import replTpl from './repl/repl.tpl.jade';
app.component('repl', {
	controller: ['$ngRedux', ReplController],
	template: replTpl,
	bindToController: {
	},
});

import { EditorDirective } from './editor/editor.js';
app.directive('editor', [EditorDirective]);
*/
