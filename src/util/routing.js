import { createRouter } from 'router5';
import browserPlugin from 'router5/plugins/browser';

/**
 * @typedef {Object} Router5Node
 * @prop {String} name
 * @prop {String} path
 * @prop {Router5Node[]} [children=[]]
 */

/**
 * @param {String} name - RouteNode name
 * @param {String} path
 * @param {Object} opts
 * @returns {Router5Node}
 */
export const route = (name, path, opts = {}) => ({ path, name, ...opts });

// Define some routes to test
const routes = [
	route('root', '/'),
];

export const router = createRouter(routes, {
	defaultRoute: 'root',
}).usePlugin(browserPlugin({
	useHash: true,
	hashPrefix: '!',
}));
