'use strict';
const Parser = require('wikilint');

/**
 * @param {string} code
 * @param {{include?: boolean, config?: Parser.AttributeToken.ParserConfig}} options
 * @returns {{ast: import('eslint').AST.Program, services: {errors: Parser.AstText.LintError[]}}}
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
				start: {line: 1, column: 0},
				end: {line: lines.length, column: lines.at(-1).length},
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
