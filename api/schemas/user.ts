const userSchemas = {
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
