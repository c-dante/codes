import './main.scss';

const loading = document.querySelector('.content-loading');
loading.classList.add('hidden');

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
