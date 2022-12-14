module.exports = {
  content: [
    './src/views/pages/*.{html,ejs}',
    './src/views/partials/*.{html,ejs}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF8008',
        'secondary-orange': '#FFC837',
        'light-grey': '#BCBCBC',
        'super-light-grey': '#828282',
        main: '#0D0B17',
        'paragraph-color': '#E2E2E2',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('flowbite/plugin'),
  ],
};
