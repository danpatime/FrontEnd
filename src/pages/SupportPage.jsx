import React,{useState} from "react";
import styled from "styled-components";
import Dropdown from "../components/common/DropDown";

const SupportPage=()=>{
  const [DDOpen1,setDDOpen1]=useState(false);
  const [DDOpen2,setDDOpen2]=useState(false);
  const [inqType1, setInqType1] = useState("선택해주세요");
  const [inqType2, setInqType2] = useState("선택해주세요");
  const [inqTitle, setInqTitle] = useState("");
  const [inqReason, setInqReason] = useState("");

  const options1=['회원정보','개인회원','기업회원','신고','제안/건의','기타']; 
  const options2 = {
    '회원정보': ['개인정보 수정', '회사명/사업자등록번호 변경','아이디/비밀번호 찾기','회원가입/탈퇴','휴대전화 인증'],
    '개인회원': ['체결 현황','이력서 수정/관리', '리뷰 관리','채팅'],
    '기업회원': ['체결 현황', '관심 알바 관리', '리뷰 관리', '채팅','매장 관리'],
    '신고': ['이력서 허위 기재','허위 공고','체결·근무 후 거래 미이행'],
    '제안/건의': ['불편사항 개선 요청', '건의사항'],
    '기타': ['서비스 오류','기타']
  };

  const handleInq1Toggle = () => {
    setDDOpen1(!DDOpen1);
    setInqType2('선택해주세요');
    setDDOpen2(false);
  };

  const handleInq2Toggle = () => {
    if (inqType1 !== '선택해주세요') {
      setDDOpen2(!DDOpen2);
    }
  };

  const handleInq1Select = (option) => {
    setInqType1(option);
    setInqType2('선택해주세요');
    setDDOpen2(false);
  };

  const handleInq2Select = (option) => {
    setInqType2(option);
  };

  // 문의 등록
  const handleSendInq = () => {
    if (inqType1 === "선택해주세요" || inqType2 === "선택해주세요" || !inqTitle || !inqReason) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    alert(`카테고리: ${inqType1}-${inqType2}\n제목: ${inqTitle}\n내용: ${inqReason}\n문의가 접수되었습니다.`);

    // 초기화
    setInqType1("선택해주세요");
    setInqType2("선택해주세요");
    setInqTitle("");
    setInqReason("");
    setDDOpen1(false);
    setDDOpen2(false);
  };

  return (
    <Container>
      <h1>문의 하기</h1>
      <SupportArea>
        <SupportText>
          <li>
            모든 문의는 3일 이내 답변을 드릴 수 있도록 노력하고 있습니다.<br />
          </li>
          <li>
            문의하신 내용의 답변이 완료되면 &apos;나의 문의 내역&apos;에서 답변 내용을 확인하실 수 있습니다.
          </li>
        </SupportText>
        <FormArea>
          <DropDownGroup>
          <FormLabel>문의 유형</FormLabel>
          <Dropdown
            label={inqType1}
            options={options1}
            isActive={DDOpen1}
            onToggle={handleInq1Toggle}
            onSelect={handleInq1Select}
            selectedOption={inqType1}
          />
          <Dropdown
            label={inqType2}
            options={options2[inqType1] || []}
            isActive={DDOpen2}
            onToggle={handleInq2Toggle}
            onSelect={handleInq2Select}
            selectedOption={inqType2}
          />
          </DropDownGroup>
          <FormLabel>제목</FormLabel>
          <InputForm
            type="text"
            placeholder="문의 제목을 입력하세요"
            value={inqTitle}
            onChange={(e) => setInqTitle(e.target.value)}
          />
          <FormLabel>문의 내용</FormLabel>
          <TextArea
            type="text"
            placeholder="문의 내용을 입력하세요"
            value={inqReason}
            onChange={(e) => setInqReason(e.target.value)}
          />
        </FormArea>
        <CenterWrapper>
          <ConfirmButton onClick={handleSendInq}>등록</ConfirmButton>
        </CenterWrapper>
      </SupportArea>
    </Container>
  );
};

export default SupportPage;

const Container = styled.div`
  padding: 50px 100px;
  margin: 0 auto;
  width: 100%;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SupportText = styled.div`
  font-size: 16px;
  color: grey;
  letter-spacing: 1px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 30px;
`;

const SupportArea = styled.div`
  margin-top: 20px;
  padding-bottom:40px;
  background: white;
  display: flex;
  flex-direction: column;

  & > ${SupportText} {
    border-bottom: 2px solid black;
    width: 90%;
    padding-bottom: 30px;
  }
`;

const FormLabel=styled.label`
  font-size:20px;
`;

const DropDownGroup=styled.div`
  display:flex;
  flex-direction:row;
  gap:20px;
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
  margin-left:50px;
`;

const InputForm = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 90%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 90%;
  height: 350px;
  resize:none;
`;

const ConfirmButton = styled.button`
  background-color: #5c3a32;
  font-size: 15px;
  width: 30%;
  margin-top:10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #f7b32b;
  }
`;
