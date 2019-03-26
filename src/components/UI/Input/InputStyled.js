const inputElementStyle = {
  outline: 'none',
  border: '1px solid #ccc',
  backgroundColor: 'white',
  font: 'inherit',
  padding: '6px 10px',
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '20px',
  ':focus': {
    outline: 'none',
    backgroundColor: '#ccc',
  },
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
};

const labelStyle = {
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '8px',
};

export {
  inputElementStyle, inputStyle, labelStyle,
};
