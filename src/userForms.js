import React, { useState } from 'react';
import { fromEvent } from 'rxjs';
import { from, forkJoin } from 'rxjs';
import { map, filter, debounceTime, toArray } from 'rxjs/operators';
import { formFields } from './formdata';
import './userForms.css';

function UserForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });debounceTime(500)

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation using RxJS
    const formFields$ = from(formFields);
    const formValues$ = from(Object.values(formData));
    const validation$ = formFields$.pipe(
      map((field) => {
        const value = formData[field.name];
        const rules = field.validation;
        const errors = [];

        if (rules.required && !value) {
          errors.push(`${field.label} is required`);
        }

        if (rules.isNumeric && isNaN(parseInt(value))) {
          errors.push(`${field.label} must be a number`);
        }

        if (rules.isEmail && !/\S+@\S+\.\S+/.test(value)) {
          errors.push(`${field.label} is invalid`);
        }

        return errors;
      }),
      filter((errors) => errors.length > 0),
      debounceTime(200)
    );

    forkJoin(validation$.pipe(toArray())).subscribe((validationErrors) => {
      const errorObj = {};
      validationErrors.forEach((fieldErrors, index) => {
        const fieldName = formFields[index].name;
        if (fieldErrors.length > 0) {
          errorObj[fieldName] = fieldErrors.join(' ');
        }
      });
      setErrors(errorObj);
      if (Object.keys(errorObj).length === 0) {
        console.log('Form submitted:', formData);
        setFormData({});
        setErrors({});
      }
    });
  };
  
// .fieldName{
//   font-size: 25px;
//   margin-right: 10px;
// }

// .errorBox{
//   font-size: 15px;
// }

{/* <form className='mainForm' onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.name}>
          <label className='fieldName' htmlFor={field.name}>{field.label}:</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
          />
          
           {errors[field.name] && <span className='errorBox'>{errors[field.name]}</span>}
          
        </div>
      ))}
      <button type="submit">Submit</button>
    </form> */}

  return (
    <form className='mainForm' onSubmit={handleSubmit}>
      <div>Hello from user form </div>
      {formFields.map((field) => (
        <div key={field.name} className='fieldContainer'>
          <label className='fieldName' htmlFor={field.name}>{field.label}:</label>
          <div className='inputContainer'>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
            />
             <span className='errorBox'>{errors[field.name]}</span>
          </div>
        </div>
        
      ))}
      <button type="submit">Submit</button>
    </form>

  )
}

export default UserForm;



// import React, { useState } from 'react';
// import { fromEvent } from 'rxjs';
// import { from } from 'rxjs';
// import { map, filter, debounceTime } from 'rxjs/operators';
// import { formFields } from './formdata';

// function UserForm() {
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Perform form validation using RxJS
//     const formFields$ = from(formFields);
//     const formValues$ = from(Object.values(formData));
//     const validation$ = formFields$.pipe(
//       map((field) => {
//         const value = formData[field.name];
//         const rules = field.validation;
//         const errors = [];

//         if (rules.required && !value) {
//           errors.push(`${field.label} is required`);
//         }

//         if (rules.isNumeric && isNaN(parseInt(value))) {
//           errors.push(`${field.label} must be a number`);
//         }

//         if (rules.isEmail && !/\S+@\S+\.\S+/.test(value)) {
//           errors.push(`${field.label} is invalid`);
//         }

//         return errors;
//       }),
//       filter((errors) => errors.length > 0),
//       debounceTime(200)
//     );

//     validation$.subscribe((errors) => {
//       const errorObj = {};
//       formFields.forEach((field, index) => {
//         if (errors[index]) {
//           errorObj[field.name] = errors[index];
//         }
//       });
//       setErrors(errorObj);
//     });

//     // Submit the form if there are no validation errors
//     validation$.last().subscribe(() => {
//       console.log('Form submitted:', formData);
//       setFormData({});
//       setErrors({});
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {formFields.map((field) => (
//         <div key={field.name}>
//           <label htmlFor={field.name}>{field.label}:</label>
//           <input
//             type={field.type}
//             id={field.name}
//             name={field.name}
//             placeholder={field.placeholder}
//             value={formData[field.name] || ''}
//             onChange={handleInputChange}
//         />
//         {errors[field.name] && <span>{errors[field.name]}</span>}
//         </div>
//     ))}
//     <button type="submit">Submit</button>
//     </form>
//     );
// }
// export default UserForm;
