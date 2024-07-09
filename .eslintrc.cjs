/* eslint @stylistic/array-bracket-newline: [2, {minItems: 1}] */
'use strict';

const config = require('@bhsd/common/eslintrc.node.cjs');
const {rules, overrides} = config,
	[
		,
		ts,
	] = overrides;

for (const key in rules) {
	if (/^(?:promise|regexp|unicorn|jsdoc)\//u.test(key)) {
		delete rules[key];
	}
}

module.exports = {
	...config,
	plugins: [
		'@stylistic',
	],
	extends: [
		'eslint:recommended',
		'plugin:n/recommended-script',
		'plugin:eslint-comments/recommended',
	],
	overrides: [
		ts,
	],
};
