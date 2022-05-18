module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
	},
	extends: ["eslint:recommended"],
	rules: {
		quotes: ["warn", "double"],
	},
};
