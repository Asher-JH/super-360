module.exports = {
  content: [
    './src/views/pages/*.{html,ejs}',
    './src/views/partials/*.{html,ejs}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF8008',
        'secondary-orange': '#FFC837',
        'light-grey': '#BCBCBC',
      },
    },
  },
  plugins: [],
};
