
module.exports = {
    prefix: '',
    purge: {
      enabled: false,
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        textColor: ['active'],
        borderWidth: ['hover', 'focus'],
        backgroundColor: ['active'],
      },
    },
    plugins: [
    ],
};
