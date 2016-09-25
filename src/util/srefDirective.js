import { actions } from 'redux-router5';

export function srefDirective($ngRedux) {
	return {
		restrict: 'A',
		scope: {
			sref: '@',
		},
		link(scope, elt, attrs) {
			const a = elt[0];

			function click() {
				$ngRedux.dispatch(actions.navigateTo(attrs.sref));
			}
			a.addEventListener('click', click);

			scope.$on('$destroy', () => {
				a.removeEventListener('click', click);
			});
		},
	};
}

