
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],

	darkMode: 'class',
	variants: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				'primary-light': '#F7F8FC',
				'secondary-light': '#FFFFFF',
				'ternary-light': '#f6f7f8',
				'primary-dark': '#03192f',
				'secondary-dark': '#102D44',
				'ternary-dark': '#1E3851',
				'github-icon-color': '#f5f5f5',
				transparent: 'transparent',
				current: 'currentColor',
				black: '#000',
				white: '#fff',
				gray: {
					100: '#f7fafc',
					200: '#edf2f7',
					300: '#e2e8f0',
					400: '#cbd5e0',
					500: '#a0aec0',
					600: '#718096',
					700: '#4a5568',
					800: '#2d3748',
					900: '#0e1827',
					1000: '#1b2937'
				},
				red: {
					100: '#fff5f5',
					200: '#fed7d7',
					300: '#feb2b2',
					400: '#fc8181',
					500: '#f56565',
					600: '#e53e3e',
					700: '#c53030',
					800: '#9b2c2c',
					900: '#742a2a'
				},
				orange: {
					100: '#fffaf0',
					200: '#feebc8',
					300: '#fbd38d',
					400: '#f6ad55',
					500: '#ed8936',
					600: '#dd6b20',
					700: '#c05621',
					800: '#9c4221',
					900: '#7b341e'
				},
				yellow: {
					100: '#fffff0',
					200: '#fefcbf',
					300: '#faf089',
					400: '#f6e05e',
					500: '#ecc94b',
					600: '#d69e2e',
					700: '#b7791f',
					800: '#975a16',
					900: '#744210'
				},
				green: {
					100: '#f0fff4',
					200: '#c6f6d5',
					300: '#9ae6b4',
					400: '#68d391',
					500: '#48bb78',
					600: '#38a169',
					700: '#2f855a',
					800: '#276749',
					900: '#22543d'
				},
				indigo: {
					100: '#ebf4ff',
					200: '#c3dafe',
					300: '#a3bffa',
					400: '#7f9cf5',
					500: '#667eea',
					600: '#5a67d8',
					700: '#4c51bf',
					800: '#434190',
					900: '#3c366b'
				}
			},
			container: {
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '5rem',
					xl: '6rem',
					'2xl': '8rem',
				},
			},
			// fontFamily: {
			// 	sans: ['Nunito', ...defaultTheme.fontFamily.sans],
			// },
		},
	},
	plugins: ['@tailwindcss/forms'],
};
