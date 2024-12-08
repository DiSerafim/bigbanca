module.exports = {
    // ... outras configurações
  
    resolve: {
      extensions: ['.js', '.mjs'],
    },
  
    module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  };
  