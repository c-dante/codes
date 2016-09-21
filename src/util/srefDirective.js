import { actions } from 'redux-router5';

export function srefDirective($ngRedux, $parse) {
	return {
		restrict: 'A',
		scope: {
			sref: '<',
		},
		link(scope, elt) {
			console.debug(elt);

			scope.$on('$changes', (...args) => {
				console.debug(args);
			});

			scope.$on('$destroy', () => {
			});
		},
	};
}

