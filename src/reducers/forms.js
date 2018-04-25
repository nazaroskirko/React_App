import { createForms } from 'react-redux-form';

export default createForms({
  forwardingNumber: {
    number: '',
  },
  call: {
    number: '',
    notes: 'Note',
  },
  login: {
    auth: {
      email: '',
      password: '',
    },
  },
  signup: {
    user: {
      firstName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      companyAttributes: {
        name: '',
        url: '',
      },
    },
  },
  salesRep: {
    user: {
      firstName: '',
      email: '',
      forwardingNumberAttributes: {
        number: '',
      },
    },
  },
  passwordReset: {
    email: '',
    id: '',
    user: {
      password: '',
      passwordConfirmation: '',
    },
  },
  resetPassword: {
    email: '',
  },
});
