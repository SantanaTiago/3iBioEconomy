import React, { useState, useEffect } from "react";
import { Field, useFormikContext } from "formik";


const AddNewForm = props => {
  const items = props.data;

  // derived data, calculated once, no updates
  // assuming constant props - for changing useEffect, like in levelOptions
  const [countryOptions] = useState(
    Array.from(new Set(items.map(item => item.country)))
  );
  const [levelOptions, setLevelOptions] = useState([]);

  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    isValid // will work with validation schema or validate fn defined
  } = useFormikContext();

  const myHandleChange = e => {
    const selectedCountry = e.target.value;

    // debugger;
    // explore _useFormikContext properties
    // or FormikContext in react dev tools

    console.log("myHandle selectedCountry", selectedCountry);
    handleChange(e); // update country

    // available levels for selected country
    const levels = items.filter(item => item.country === selectedCountry);
    if (levels.length > 0) {
      // update level to first value
      setFieldValue("level", levels[0].level);
      console.log("myHandle level", levels[0].level);
    }
  };

  // current values from Formik
  const { country, level } = values;

  //  calculated ususally on every render
  //
  // const countryOptions = Array.from(new Set(items.map(item => item.country)));
  // const levelOptions = items.filter(item => item.country === country);
  //
  //  converted into hooks (useState and useEffect)
  //
  useEffect(() => {
    // filtered array of objects, can be array of numbers
    setLevelOptions(items.filter(item => item.country === country));
  }, [items, country]); // recalculated on country [or items] change

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="country"
          value={country}
          as="select"
          onChange={myHandleChange} // customized handler
        >
          {!country && (
            <option key="empty" value="">
              Select Country - disappearing empty option
            </option>
          )}
          {countryOptions.map((country, index) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </Field>
        {country && (
          <>
            <Field
              name="level"
              as="select"
              onChange={handleChange} // original handler
            >
              {levelOptions.map((item, index) => (
                <option key={item.level} value={item.level}>
                  {item.level}
                </option>
              ))}
            </Field>
          </>
        )}
      </form>
      <>
        <h1>values</h1>
        {country && country}
        <br />
        {level && level}
      </>
    </div>
  );
};

export default AddNewForm;