import './main.scss';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngRedux from 'ng-redux';
import ReduxThunk from 'redux-thunk';

import { rootReducer } from './root';

const app = angular.module('dante-codes', [
	ngRedux, ngAnimate,
]).config(['$ngReduxProvider', ($ngReduxProvider) => {
	$ngReduxProvider.createStoreWith(
			rootReducer,
		[
			ReduxThunk,
		]
		);
}]).run(['$rootScope', (root) => {
	setTimeout(() =>
		root.$applyAsync(() => (root.loaded = true)),
		10
	);
}]);


import { LandingController } from './landing';
import landingTpl from './landing.tpl.jade';
app.component('landing', {
	template: landingTpl,
	controller: [LandingController]
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
