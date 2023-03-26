'use strict';
const {AST} = require('eslint');
const /** @type {Parser} */ Parser = require('wikiparser-node');

/**
 * @param {string} code
 * @param {{include?: boolean, config?: ParserConfig}} options
 * @returns {{ast: AST.Program, services: {errors: LintError[]}}}
 */
const parseForESLint = (code, options) => {
	if (options?.config) {
		Parser.config = options.config;
	}
	const root = Parser.parse(code, options?.include),
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
