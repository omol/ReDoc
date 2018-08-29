import styled from '../src/styled-components';

/* ====== Styled components ====== */

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin: 0 15px;
  align-items: center;
`;

export const CorsCheckbox = styled.div`
  margin-left: 10px;
  white-space: nowrap;

  label {
    font-size: 13px;
  }

  @media screen and (max-width: 550px) {
    display: none;
  }
`;
export const PickerWrap = styled.div`
  display: block;
  position: relative;
`;
export const ColorPicker = styled.img`
  height: 20px;
  width: 20px;
  display: block;
  margin-left: 15px;

`;
export const Heading = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid #cccccc;
  z-index: 10;
  padding: 5px;

  display: flex;
  align-items: center;
  font-family: 'Lato';
`;

export const Logo = styled.img`
  height: 40px;
  width: 124px;
  display: inline-block;
  margin-right: 15px;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;
export const FontsDropWrap = styled.div`
  padding: 10px;
`;
export const ColorDropWrap = styled.div`
    display: block;
    position: absolute;
    width: 150px;
    top: 30px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 0 0 2px 2px;
`;
export const DropLabel = styled.div`
    display: block;
    background-color: #f4f4f4;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const DropForm = styled.form`
    padding: 10px;
`;
export const InputStyle = styled.input`
    padding: 0;
    outline: none;
    width: 50px;
    height: 25px;
    margin: 0px 15px 0px 0px;
`;
export const InputSubmit = styled.input`
    outline: none;
`;
