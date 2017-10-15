import angular from 'angular';
import landingComponent from './landing';

export default angular.module('dfLanding', [])
	.component('dfLanding', landingComponent)
	.name;