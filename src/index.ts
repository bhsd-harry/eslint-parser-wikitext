import Parser from 'wikilint';
// @ts-expect-error JSON import
import {name, version} from '../package.json';
import type {AST} from 'eslint';
import type {Config, LintError} from 'wikilint';

export const meta = {name, version};

export const parseForESLint = (
	code: string,
	options?: {include?: boolean, config?: Config | string},
): {ast: AST.Program, services: {errors: LintError[]}} => {
	if (options?.config) {
		Parser.config = options.config;
	}
	const lines = code.split(/\r?\n/u);
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
			errors: Parser.parse(code, options?.include).lint(),
		},
	};
};
