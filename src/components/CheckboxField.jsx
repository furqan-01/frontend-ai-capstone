function CheckboxField({ id, label, name, checked, onChange }) {
  return (
    <div className="form-field form-field--checkbox">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default CheckboxField;
