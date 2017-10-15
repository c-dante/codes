import './app.scss';
import angular from 'angular';

// Import some stuff
import dfLanding from './landing';

// Declare our application
const APP_MODULE = 'my-app';

angular.module(APP_MODULE, [dfLanding])
	.run([() => {
		console.debug('angular.run', 'Bootstrap runtime modules like redux or a router');
	}]);

// When we have the document, bootstrap our application
angular.element(document).ready(() => {
	angular.bootstrap(document, [APP_MODULE]);
});
