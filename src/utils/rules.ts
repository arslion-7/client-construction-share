export const rules = {
  required: (message = 'Hokman doldurmaly') => ({
    required: true,
    message
  }),
  non_required: (message = '') => ({
    required: false,
    message
  })
  // reg_ex_number: (message = '') => ({
  //   pattern: new RegExp('^[0-9.]*$'),
  //   message: 'Format is wrong'
  // })
};
