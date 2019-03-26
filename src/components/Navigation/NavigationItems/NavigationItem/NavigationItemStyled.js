import styled from 'styled-components';

const Wrapper = styled.li`
  box-sizing: border-box;
  margin: 0;
  display: flex;
  height: 100%;
  width: auto;
  align-items: center;
  
  a {
    color: white;
    text-decoration: none;
    height: 100%;
    padding: 16px 10px;
    box-sizing: border-box;
    display: block;
    
    :hover,
    :active {
      background-color:#8f5c2c;
      border-bottom: 4px solid #40a4c8;
    }
  }
  
  .active {
    background-color:#8f5c2c;
    border-bottom: 4px solid #40a4c8;
    color: white;
  }
`;

export default Wrapper;
