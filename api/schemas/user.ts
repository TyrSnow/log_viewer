const userSchemas = {
  regist: {
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
      },
    },
  },
  name_can_be_used: {
    query: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          required: true,
        }
      }
    }
  }
};

export default userSchemas;
