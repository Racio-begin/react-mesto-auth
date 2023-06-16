// Кастомный хук для контроля всех инпутов в любых формах
// todo: заставить его работать...

import { useState } from "react";

function useForm(inputValues={}) {
	
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const {value, name} = e.target;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};

};

export default useForm