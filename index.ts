import Parser = require('wikilint');
import type {AST} from 'eslint';
import type {Config, LintError} from 'wikilint';

const parseForESLint = (
	code: string,
	options?: {include?: boolean, config?: Config},
): {ast: AST.Program, services: {errors: LintError[]}} => {
	if (options?.config) {
		Parser.config = options.config;
	}
	const root = Parser.parse(code, options?.include),
		lines = code.split('\n');
	return {
		ast: {
			type: 'Program',
			sourceType: 'module',
			body: [],
			loc: {
				start: {line: 1, column: 0},
				end: {line: lines.length, column: lines.at(-1)!.length},
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
