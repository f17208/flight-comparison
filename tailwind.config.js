module.exports = {
  important: true,
  purge: {
    content: ['./src/**/*.tsx']
  },
  theme: {
    extend: {
      maxHeight: {
        '3/4-vh': '75vh',
      },
      colors: {
        primary: '#46EBC8',
        secondary: '#FF0E96',
        neutral: '#021627',
      },
    }
  },
  variants: {

  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};