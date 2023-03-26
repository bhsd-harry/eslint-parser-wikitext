declare global {
	interface ParserConfig {
		ext: string[];
		html: string[][];
		namespaces: Record<string, string>;
		nsid: Record<string, number>;
		parserFunction: [Record<string, string>, string[], string[], string[]];
		doubleUnderscore: string[][];
		protocol: string;
		img: Record<string, string>;
		variants: string[];
		excludes: string[];
	}

	interface LintError {
		message: string;
		severity: 'error'|'warning';
		startIndex: number;
		endIndex: number;
		startLine: number;
		startCol: number;
		endLine: number;
		endCol: number;
		excerpt: string;
	}

	class Token {
		lint(): LintError[];
	}

	interface Parser {
		/**
		 * 解析wikitext
		 * @param wikitext wikitext
		 * @param include 是否嵌入
		 * @param maxStage 最大解析层级
		 */
		parse(wikitext: string, include?: boolean, maxStage?: number, config?: ParserConfig): Token;
	}
}

export {};
