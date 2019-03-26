import styled from 'styled-components';

const Wrapper = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
  
  
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => {
    if (!props.disabled) {
      if (props.btnType === 'danger') {
        return '#944317';
      } if (props.btnType === 'success') {
        return '#5c9210';
      }
      return 'white';
    }
    return '#ccc';
  }
};
`;

export default Wrapper;
