module.exports = {
  important: true,
  purge: {
    content: ['./src/**/*.tsx']
  },
  theme: {
    extend: {
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