// Styles
import "./inputFile.scss";

const InputFile = ({ id, label, inputStyle, required, onChange, inputFileRef }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    onChange(file);
  };

  return (
    <div className="input__wrapper">
      <label className="input__label" htmlFor={id} >{label}</label>
      <input className={`input input-file${inputStyle || ""}`} id={id} required={required} name={id} type="file" onChange={handleChange} ref={inputFileRef} />
    </div>
  );
}

export default InputFile;