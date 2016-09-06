import './main.scss';

import angular from 'angular';
import ngRedux from 'ng-redux';
import ReduxThunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { router } from './util/routing';
import createLogger from 'redux-logger';

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
			router5Middleware(router),
			ReduxThunk,
			createLogger({
				collapsed: true,
			}),
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
