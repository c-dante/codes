import './main.scss';

import angular from 'angular';
import ngRedux from 'ng-redux';
import ReduxThunk from 'redux-thunk';

import { rootReducer } from './root';

const app = angular.module('dante-codes', [ngRedux])
	.config(['$ngReduxProvider', ($ngReduxProvider) => {
		$ngReduxProvider.createStoreWith(
			rootReducer,
			[
				ReduxThunk,
			]
		);
	}]);

import landingTpl from './landing.tpl.jade';
app.component('landing', {
	template: landingTpl,
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
