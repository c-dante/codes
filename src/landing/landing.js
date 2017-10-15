export class LandingComponent {
	constructor(){
		this.twitter = '@see.dante';
		this.email = 'c.dante.federici@gmail.com';
		this.github = 'c-dante';
		this.keybase = 'cdante';

		this.greeting = (l => l[Math.floor(Math.random()*l.length)])([
			`hey`,
			`you look nice today`,
			`did you go outside yet`,
			`1123581347112...`,
			`¯\\_(ツ)_/¯`,
			`change one thing`,
		]);
	}
}

import template from './landing.tpl.pug';
export default {
	template,
	controller: [LandingComponent],
	controllerAs: '$ctrl',
};
