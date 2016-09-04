import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/tern/tern';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/match-highlighter';

const themes = [
	'3024-day',
	'3024-night',
	'abcdef',
	'ambiance-mobile',
	'ambiance',
	'base16-dark',
	'base16-light',
	'bespin',
	'blackboard',
	'cobalt',
	'colorforth',
	'dracula',
	'eclipse',
	'elegant',
	'erlang-dark',
	'hopscotch',
	'icecoder',
	'isotope',
	'lesser-dark',
	'liquibyte',
	'material',
	'mbo',
	'mdn-like',
	'midnight',
	'monokai',
	'neat',
	'neo',
	'night',
	'panda-syntax',
	'paraiso-dark',
	'paraiso-light',
	'pastel-on-dark',
	'railscasts',
	'rubyblue',
	'seti',
	'solarized',
	'the-matrix',
	'tomorrow-night-bright',
	'tomorrow-night-eighties',
	'ttcn',
	'twilight',
	'vibrant-ink',
	'xq-dark',
	'xq-light',
	'yeti',
	'zenburn',
];

class EditorCtrl {
	constructor($ngRedux) {
		this.themes = themes;
		console.debug(this.statePath);
		this.unregister = $ngRedux.connect((state) => ({
			// @todo: unroll state path?
			...(state[this.statePath] || {}),
		}), {
			// ...actions
		})(this);
	}

	init(cm) {
		this.onInit({
			controller: this,
			cm,
		});
	}

	$onChanges(changes) {
		console.debug('changes', changes);
	}
}

import editorTpl from './editor.tpl.jade';
export function EditorDirective() {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			statePath: '<',
			onInit: '&',
		},
		template: editorTpl,
		controller: ['$ngRedux', EditorCtrl],
		controllerAs: '$ctrl',
		link(scope, elt) {
			const textarea = elt[0].querySelector('textarea');

			const server = new CodeMirror.TernServer({
				defs: [],
			});

			CodeMirror.fromTextArea(textarea, {
				lineNumbers: true,
				extraKeys: {
					'Ctrl-Space': cm => server.complete(cm),
					'Ctrl-I': cm => server.showType(cm),
					'Ctrl-O': cm => server.showDocs(cm),
					'Alt-.': cm => server.jumpToDef(cm),
					'Alt-,': cm => server.jumpBack(cm),
					'Ctrl-Q': cm => server.rename(cm),
					'Ctrl-.': cm => server.selectName(cm),
				},
				mode: {
					name: 'javascript',
				},
			});
		},
	};
}

