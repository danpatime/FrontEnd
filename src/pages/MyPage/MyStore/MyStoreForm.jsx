import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { jobCategories } from "../../../assets/data/jobCategories";

import MypageLayout from "../../../components/layout/MypageLayout"
import { IoIosArrowBack } from "react-icons/io";
import request from "../../../api/request.ts";
// import DefaultProfile from "../../../assets/images/default-profile.jpg";
// import EditIcon from "../../../assets/icons/ic_edit.png";


const MyStoreForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.modeType || 'register';
  const businessId = location.state?.modeType === "edit" ? location.state.businessId : null;
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await request.get(`/api/v1/business?businessId=${businessId}`);
        const data = response;

        setStoreData(data);
      } catch (error) {
        console.error('가게 정보 조회에 실패했습니다.', error);
      }
    };
  
    fetchStoreData();
  }, []);


  // const [storeImage, setStoreImage] = useState(mode === "edit" ? dummyData.storeImage : DefaultProfile);
  const [businessName, setBusinessName] = useState(mode === "edit" ? storeData?.businessName : '');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState(null);
  const [representationName, setRepresentationName] = useState(mode === "edit" ? storeData?.owner?.name : '');
  const [email, setEmail] = useState(mode === "edit" ? storeData?.email : '');
  const [phoneNumber, setPhoneNumber] = useState(mode === "edit" ? storeData?.phoneNumber : '');
  const [zipcode, setZipcode] = useState(mode === "edit" ? storeData?.location?.zipcode : '');
  const [address, setAddress] = useState(mode === "edit" ? storeData?.location?.address : '');
  const [detailAddress, setDetailAddress] = useState(mode === "edit" ? storeData?.location?.detailAddress : '');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [businessOpenDate, setBusinessOpenDate] = useState(null);

  useEffect(() => {
    if (storeData) {
      setBusinessName(storeData?.businessName || '');
      setRepresentationName(storeData?.owner?.name || '');
      setEmail(storeData?.email || '');
      setPhoneNumber(storeData?.phoneNumber || '');
      setZipcode(storeData?.location?.zipcode || '');
      setAddress(storeData?.location?.address || '');
      setDetailAddress(storeData?.location?.detailAddress || '');
    }
  }, [storeData]);


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileExtension = file.name.split(".").pop().toLowerCase();
  //     const allowedExtensions = ["png", "jpg", "jpeg"];

  //     if (!allowedExtensions.includes(fileExtension)) {
  //       alert("PNG 또는 JPG 파일만 업로드 가능합니다.");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setStoreImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handlePhoneNumberChange = (e) => {
    // 숫자만 필터링
    let value = e.target.value.replace(/[^0-9]/g, '');

    // 000-0000-0000 형식으로 변환
    if (value.length <= 3) {
      // 3자리 이하일 경우 그냥 그대로 두기
    } else if (value.length <= 7) {
      value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    } else {
      value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
    }

    setPhoneNumber(value); // 새로운 전화번호 값을 상태에 업데이트
  };


  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setAddress(data.address);
        setZipcode(data.zonecode); 
      },
    }).open();
  };

  const handleValidation = async () => {
    // 4개의 값이 비어있는지 확인
    if (!businessRegistrationNumber || !businessName || !representationName || !businessOpenDate) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await request.post('/api/v1/account/validation/business-number', {
        businessRegistrationNumber,
        businessName,
        representationName,
        businessOpenDate
      });
      
      
      alert('인증 되었습니다.');
    } catch (error) {
      console.error('인증 요청에 실패했습니다.', error);
      alert('인증 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleCategoryChange = (event) => {
    const selected = jobCategories.find(cat => cat.id === parseInt(event.target.value));
    setSelectedCategory(selected);
    setSelectedSubCategory(null); // 하위 카테고리 초기화
  };

  const handleSubmit = async () => {
    const payload = {
      subCategoryIds: selectedSubCategory ? [selectedSubCategory] : []
    };

    const submitData = {
      businessName,
      businessRegistrationNumber,
      businessOpenDate,
      location: {
        zipcode,
        address,
        detailAddress,
      },
      subCategoryIds: payload.subCategoryIds,
      representationName,
      email,
      phoneNumber,
    }

    try {
      if (mode === 'register') {
        await request.post("/api/v1/business", submitData);
        alert("매장 정보가 등록되었습니다.");
      } else if (mode === 'edit') {
        await request.put("/api/v1/business", submitData);
        alert("매장 정보가 수정되었습니다.");
      }
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <MypageLayout>
      <Page>
        <Title>
          <IoIosArrowBack size={26} onClick={goBack}/>
          {mode === "edit" ? "매장정보 수정" : "매장 등록"}
        </Title>

        {/* <StoreImgUpload>
          <img id="upload" src={storeImage} alt="매장 사진" />
          <label htmlFor="file-upload">
            <img id="edit" src={EditIcon} alt="이미지 등록" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleFileChange}
          />
        </StoreImgUpload> */}

        <Section>
          <h3>매장정보</h3>
          <StoreInfo>
            <div className="storeinfo-items">
              <label>상호명</label>
              <input type="text" value={businessName} readOnly={mode==="edit"} onChange={(e) => setBusinessName(e.target.value)} />
            </div>

            <div className='storeinfo-items item-grid'>
              <div className="button-grid">
                <label>주소</label>
                <div className='button-input'>
                  <input type="text" value={address} readOnly placeholder='주소를 입력하세요' />
                  <button type="button" onClick={handleAddressSearch}>주소찾기</button>
                </div>
              </div>
              {address && (
                <div className="button-grid">
                  <div></div>
                  <input
                    type="text"
                    value={detailAddress}
                    onChange={handleDetailAddressChange}
                    placeholder="상세주소를 입력해주세요"
                  />
                </div>
              )}
            </div>
          
            <div className='storeinfo-items'>
              <label>사업자등록번호</label>
              <div className='button-input'>
                <input type="text" value={businessRegistrationNumber} onChange={(e) => setBusinessRegistrationNumber(e.target.value)} />
                <button onClick={handleValidation}>인증</button>
              </div>
            </div>

            <div className="storeinfo-items">
              <label>사업시작일</label>
              <input type="date" value={businessOpenDate} onChange={(e) => setBusinessOpenDate(e.target.value)}/>
            </div>

            <div className="storeinfo-items">
              <label>직종 카테고리</label>
              <SelectContainer>
                {/* 1차 직종 */}
                <Select onChange={handleCategoryChange}>
                  <option value="">1차 직종</option>
                  {jobCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </Select>
        
                {/* 2차 직종 */}
                <Select 
                  onChange={(e) => setSelectedSubCategory(Number(e.target.value))} 
                  disabled={!selectedCategory} // 1차 직종 선택 전에는 비활성화
                  >
                  <option value="">2차 직종</option>
                  {selectedCategory?.subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </Select>
              </SelectContainer>
            </div>
          </StoreInfo>
        </Section>

        <Section>
          <h3>사장님 정보</h3>
          <OwnerInfo>
            <div className='ownerinfo-items'>
              <label>이름</label>
              <input type="text" value={representationName} onChange={(e) => setRepresentationName(e.target.value)} />
            </div>
            <div className='ownerinfo-items'>
              <label>연락처</label>
              <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} maxLength="13" placeholder="000-0000-0000"/>
            </div>

            <div className='ownerinfo-items'>
              <label>이메일</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* {mode === "register" || isEditingEmail ?  (
              <div className="ownerinfo-items item-grid">
                <div className="button-grid">
                  <label>이메일</label>
                  <div className="button-input">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="이메일을 입력하세요"
                    />
                    <button>인증번호</button>
                  </div>
                </div>
                <div className="button-grid">
                  <div></div>
                  <div className="button-input">
                    <input
                      type="text"
                      placeholder="인증번호를 입력하세요"
                    />
                    <button>확인</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ownerinfo-items">
                <label>이메일</label>
                <div className="button-input">
                  <input
                    type="email"
                    value={email}
                    readOnly={mode === "edit"}
                    onChange={handleEmailChange}
                  />
                  <button onClick={enableEmailEdit}>변경하기</button>
                </div>
              </div>
            )} */}
          </OwnerInfo>
        </Section>
        <ButtonContainer>
          {mode === "edit" ? (
            <div>
              <button id="edit" onClick={handleSubmit}>수정</button>
              {/* <button id="delete" onClick={handleDelete}>삭제</button> */}
            </div>
          ) : (
            <button onClick={handleSubmit}>완료</button>
          )}
        </ButtonContainer>
      </Page>
    </MypageLayout>
  );
}

export default MyStoreForm;

const Page = styled.div`
  padding: 20px 30px 30px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 1000px;
  max-width: 1400px;

  button {
    cursor: pointer;
  }
`

const Title = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;

  svg {
    cursor: pointer;
  }
`

// const StoreImgUpload = styled.div`
//   position: relative;
//   width: 160px;
//   height: 160px;
//   margin: 20px 10px;

//   #upload {
//     width: 160px;
//     height: 160px;
//     border-radius: 50px;
//     object-fit: cover; 
//     object-position: center;
//   }

//   #edit {
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     width: 40px;
//     cursor: pointer;
//   }

//   input[type="file"] {
//     display: none;
//   }
// `

const Section = styled.div`
  margin: 40px 0 80px;
  padding-left: 20px;
  font-size: 16px;

  h3 {
    margin-bottom: 8px;
    font-size: 17px;
    color: #000000;

    span {
      font-size: 14px;
      font-weight: 500;
      margin-left: 5px;
      color: #6D6D6D;
    }
  }
`

const OwnerInfo = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    border: 1px solid #E9E9E9;
    border-radius: 10px;
    padding:  12px 15px;
    font-size: 15px;
    outline: none;
    width: 520px;
  }

  label {
    display: inline-block;
  }

  .storeinfo-items, .ownerinfo-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    widht: 100%;
  }

  .item-grid {
    flex-direction: column;
    gap: 7px;
  }

  .button-grid {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button-input {
    display: flex;
    gap: 10px;
    input {width: 400px;}

    button {
      width: 110px;
      border-radius: 10px;
      background-color: #E9E9E9;
      font-size: 14px;
      color: #000000;
    }
  }

  .phone-number {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const StoreInfo = styled(OwnerInfo)``; // OwnerInfo 스타일과 동일

const ButtonContainer = styled.div`
  padding-left: 20px;

  div {
    display: flex;
    gap: 10px;
  }

  button {
    width: 100px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #ffffff;
    background-color: #7B4B42;
    border-radius: 10px;
    outline: none;
  }

  #edit, #delete {
    width: 70px;
    background-color: unset;
    border: 1px solid #767676;
    color: #000000;

    &:hover {
      background-color: #7B4B42;
      color: #ffffff;
    }
  }
`

const SelectContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  width: 520px;
`

const Select = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px 10px;
  width: 100%;
  height: 42px;
  outline: none;
`;