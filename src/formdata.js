export const formFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username',
      validation: {
        required: true,
      },
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Enter your age',
      validation: {
        required: true,
        isNumeric: true,
        min: 0, // restrict minimum value to 0
        
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      validation: {
        required: true,
        isEmail: true,
      },
    },
  ];
  