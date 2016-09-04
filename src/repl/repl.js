export class ReplController {
	constructor($ngRedux) {
		this.unregister = $ngRedux.connect(state => ({
			// state object
			...state,
		}), {
			// actions
		})(this);
	}

	$onDestroy() {
		this.unregister();
	}
}
