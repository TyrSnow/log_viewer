const sessionSchemas = {
  login: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          required: true,
        },
        password: {
          type: 'string',
          required: true,
        },
        remember: {
          type: 'boolean',
        },
      },
    },
  },
};

export default sessionSchemas;
