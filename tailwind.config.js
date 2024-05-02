module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
			'sm': '640px',
			'md': '1000px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    minWidth: {
      '1/2': '50%',
      '1/3': '33%',
      '1/4': '25%',
      '1/5': '20%',
      '1/6': '16.666%',
    },
    extend: { 
      backgroundImage:{
        "graph":"url('./img/bg-network.webp')",
        "globe":"url('./img/globe-graph.png')",
        "skills":"url('./img/skills-graph.png')",
        "users":"url('./img/users-graph.png')",
      },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'spacing': 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      width: ['responsive', 'hover', 'focus', 'group-hover'],
      scale:['responsive','hover','group-hover'],
      display: ['group-hover'],
    },
  },
  plugins: [],
}
