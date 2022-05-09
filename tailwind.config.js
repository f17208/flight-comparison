module.exports = {
  important: true,
  purge: {
    content: ['./src/**/*.tsx']
  },
  theme: {
    extend: {
      maxHeight: {
        'three-quarters': '75vh',
      },
      colors: {
        primary: '#46EBC8',
        secondary: '#FF0E96',
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