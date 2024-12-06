import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
	theme: {
		extend: {
			fontFamily: {
				sans: ['Parkinsans', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'cerulean-blue': {
					'50': '#f2f4fc',
					'100': '#e2e7f7',
					'200': '#cbd4f2',
					'300': '#a8b9e8',
					'400': '#7e95dc',
					'500': '#5f74d2',
					'600': '#4a58c4',
					'700': '#4148b4',
					'800': '#3a3d93',
					'900': '#333775',
					'950': '#232448',
				},
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
