export class ReplController {
	constructor($ngRedux) {
		this.unregister = $ngRedux.connect(state => ({
			// state object
		}), {
			// actions
		})(this);
	}

	$onDestroy() {
		this.unregister();
	}
}
