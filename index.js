'use strict';
const /** @type {Parser} */ Parser = require('wikiparser-node');

const parseForESLint = (code, options) => {
	const root = Parser.parse(code, options?.include, undefined, options?.config),
		lines = code.split('\n');
	return {
		ast: {
			type: 'Program',
			body: [],
			loc: {
				source: code,
				start: {line: 0, column: 0},
				end: {line: lines.length - 1, column: lines.at(-1).length},
			},
			range: [0, code.length],
			tokens: [],
			comments: [],
		},
		services: {
			errors: root.lint(),
		},
	};
};

module.exports = {parseForESLint};
