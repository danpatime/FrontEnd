import { useState } from "react";
import styled from "styled-components";
import { hangjungdong } from "../../assets/data/hangjungdong";
import Modal from "../common/Modal";

function WorkLocation({onClose}) {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const { sido, sigugun, dong } = hangjungdong;

  const [val1Text, setVal1Text] = useState("전체");
  const [val2Text, setVal2Text] = useState("전체");
  const [val3Text, setVal3Text] = useState("전체");

  const handleSidoChange = (e) => {
    setVal1(e.target.value);
    setVal1Text(e.target.options[e.target.selectedIndex].text || "전체");
    setVal2(""); // Reset lower levels
    setVal2Text("전체");
    setVal3Text("전체");
  };

  const handleSigugunChange = (e) => {
    setVal2(e.target.value);
    setVal2Text(e.target.options[e.target.selectedIndex].text || "전체");
    setVal3Text("전체");
  };

  const handleDongChange = (e) => {
    setVal3Text(e.target.options[e.target.selectedIndex].text || "전체");
  };

  const handleAdd = () => {
    let newLocationText = "";
    let locationData = { sido: val1Text, sigugun: val2Text, dong: val3Text };

    if (val1Text === "전체") {
      newLocationText = "전체";
      locationData = { sido: "전체", sigugun: "", dong: "" };
    } else if (val2Text === "전체") {
      newLocationText = `${val1Text} 전체`;
      locationData = { sido: val1Text, sigugun: "", dong: "" };
    } else if (val3Text === "전체") {
      newLocationText = `${val2Text} 전체`;
      locationData = { sido: val1Text, sigugun: val2Text, dong: "" };
    } else {
      newLocationText = val3Text;
    }

    onClose(newLocationText, locationData);
  };

  return (
    <>
      <Modal onClose={() => onClose(null)} title="희망근무지" width="530px">
        <SelectContainer>
          <Select onChange={handleSidoChange}>
            <option value="">전체</option>
            {sido.map((el) => (
              <option key={el.sido} value={el.sido}>
                {el.codeNm}
              </option>
            ))}
          </Select>

          <Select onChange={handleSigugunChange}>
            <option value="">전체</option>
            {sigugun
              .filter((el) => el.sido === val1)
              .map((el) => (
                <option key={el.sigugun} value={el.sigugun}>
                  {el.codeNm}
                </option>
              ))}
          </Select>

          <Select onChange={handleDongChange}>
            <option value="">전체</option>
            {dong
              .filter((el) => el.sido === val1 && el.sigugun === val2)
              .map((el) => (
                <option key={el.dong} value={el.dong}>
                  {el.codeNm}
                </option>
              ))}

            {dong
              .filter((el) => el.sido === val1 && el.sigugun === val2)
              .map((el) => (
                <option key={el.dong} value={el.dong}>
                  {el.codeNm}
                </option>
              ))}
          </Select>
        </SelectContainer>

        <ButtonContainer><button onClick={handleAdd}>추가</button></ButtonContainer>
      </Modal>
    </>
  );
}

export default WorkLocation;

const SelectContainer = styled.div`
  display: flex;
  gap: 15px;
`

const Select = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px 10px;
  width: 130px;
  height: 42px;
  outline: none;
`;

const ButtonContainer = styled.div`
  width: 420px;
  display: flex;
  justify-content: end;
  margin-top: 30px;

  button {
    background-color: #7B4B42;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
`;