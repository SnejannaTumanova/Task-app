module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			typescript: true,
			node: true,
		},
	},
	plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier', // отключает конфликтующие правила
	],
	rules: {
		'react/react-in-jsx-scope': 'off', // не нужен в Vite/CRA
		'react/prop-types': 'off',

		// Импорты по красоте
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				alphabetize: { order: 'asc', caseInsensitive: true },
			},
		],

		// TS правила
		'@typescript-eslint/no-unused-vars': ['warn'],
		'@typescript-eslint/no-explicit-any': 'off',

		// Хуки
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};
