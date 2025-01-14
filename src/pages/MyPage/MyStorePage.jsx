import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MypageLayout from '../../components/layout/MypageLayout';

import { RiSettings4Fill } from "react-icons/ri";

const MyStorePage = () => {
  const [stores, setStores] = useState([]); // 매장 목록 상태
  const [selectedStore, setSelectedStore] = useState(null);

  // 매장 목록을 가져오는 함수(로드 시 실행)
  const fetchStores = async () => {
    const dummyData = {
      stores: [
        {
          name: "파스쿠찌",
          category: "카페",
          address: "부산광역시 남구 부경로 123 1층",
          ownerName: "홍길동",
          contact: "010-1234-5678",
          email: "owner1@example.com",
          imageUrl: "https://search.pstatic.net/sunny/?src=http%3A%2F%2Ffile3.instiz.net%2Fdata%2Fcached_img%2Fupload%2F2021%2F07%2F09%2F12%2Feb8287345c0b95a83777c54065f13c04.jpg&type=sc960_832" // 예시 이미지 URL
        },
        {
          name: "BHC",
          category: "패스트푸드",
          address: "서울특별시 강남구 테헤란로 456",
          ownerName: "이순신",
          contact: "02-3456-7890",
          email: "owner2@example.com",
          imageUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MTZfMjg3%2FMDAxNjIzODA2NDc3NjY5.ooK9MfX81XTOznDbUiJCgeg5zl30JbOAJtypG0id_zMg.TR1JrvWOQQXvTWdNrYriizVaP0PovnTy2sIsoXfw-mgg.JPEG.congha%2Fbhc1.jpg&type=a340" // 예시 이미지 URL
        },
        {
          name: "할리스 커피",
          category: "카페",
          address: "인천광역시 연수구 송도동 123",
          ownerName: "김유신",
          contact: "032-987-6543",
          email: "owner3@example.com",
          imageUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160606_247%2Fppanppane_1465209346510ebnAl_PNG%2F%25C7%25D2%25B8%25AE%25BD%25BA_%25C4%25BF%25C7%25C7_%25B7%25CE%25B0%25ED_%25281%2529.png&type=sc960_832" // 예시 이미지 URL
        }
      ]
    };

    // 더미 데이터를 설정
    setStores(dummyData.stores);
    if (dummyData.stores.length > 0) {
      setSelectedStore(dummyData.stores[0]); // 첫 번째 매장으로 초기화
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // 매장 클릭 시 해당 매장 정보로 변경
  const handleStoreClick = (storeName) => {
    const store = stores.find(s => s.name === storeName);
    if (store) {
      console.log("Selected Store:", store); // 선택된 매장 확인
      setSelectedStore(store); // 상태 업데이트
    }
  };

  return (
    <MypageLayout>
      <Page>
        <Top>
          <Title>
            <div></div>
            <h2>나의 매장</h2>
          </Title>
          <AddButton>매장등록</AddButton>
        </Top>

        <Content>
          <StoreList>
            {stores.map((store) => (
              <StoreItem
                key={store.name}
                onClick={() => handleStoreClick(store.name)}
                isSelected={selectedStore && selectedStore.name === store.name} // 선택된 매장에 따라 스타일 적용
              >
                {store.name}
              </StoreItem>
            ))}
          </StoreList>
          <StoreDetails isFirstStore={selectedStore && stores.indexOf(selectedStore) === 0}>
            {selectedStore ? (
              <>
                <div className="top-section">
                  <section>
                  <StoreImg 
  src={selectedStore?.imageUrl || "https://via.placeholder.com/150"} 
  alt={selectedStore?.name || "Default Image"} 
/>
                    <StoreNameSection>
                      <h5>{selectedStore.category}</h5>
                      <h3>{selectedStore.name}</h3>
                    </StoreNameSection>
                  </section>
                  <SettingIcon />
                </div>
                <StoreInfo>
                  <div>
                    <span>주소</span>
                    <span>대표명</span>
                    <span>연락처</span>
                    <span>이메일</span>
                  </div>
                  <div>
                    <p>{selectedStore.address}</p>
                    <p>{selectedStore.ownerName}</p>
                    <p>{selectedStore.contact}</p>
                    <p>{selectedStore.email}</p>
                  </div>
                </StoreInfo>
              </>
            ) : (
              <p>매장 정보를 선택하세요.</p>
            )}
          </StoreDetails>
        </Content>
      </Page>
    </MypageLayout>
  );
};

export default MyStorePage;

const Page = styled.div`
  padding: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  gap: 12px;

  div {
    width: 5px;
    height: 35px;
    background-color: #6E3C3B;
  }

  h2 {
    margin: 0;
    font-size: 24px;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #6E3C3B;

  color: white;
  font-size: 16px;
  font-weight: 600;

  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #6E3C3B;
  }
`;

const Content = styled.div`
  display: flex;
`;

const StoreList = styled.div`
  width: 230px;
  height: 320px;
  overflow: auto;
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge에서 스크롤바 숨김 */
  }
`;

const StoreItem = styled.div`
  display: flex;
  align-items: center;

  width: auto;
  
  cursor: pointer;
  padding: 25px 35px;
  background-color: ${(props) => (props.isSelected ? "#FAF4F2" : "white")};
  color: ${(props) => (props.isSelected ? "#9C6B60" : "#BBBBBB")};
  font-size: 16px;
  font-weight: 700;
  border-radius: 20px 0px 0px 20px;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#e9ecef" : "#f1f1f1")};
  }
`;

const StoreDetails = styled.div`
  padding: 25px 35px 40px;
  flex-grow: 1;
  background-color: #FAF4F2;
  border-radius: ${(props) => (props.isFirstStore ? '0px 20px 20px 20px' : '20px')};

  .top-section {
    display: flex;
    justify-content: space-between;
  }

  section {
    display: flex;
    align-items: center;
    height: auto;
  }
`;

const StoreImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 25px;
  margin-right: 20px;
`;

const StoreNameSection = styled.div`
  flex-grow: 1;
  flex-direction: column;
`;

const SettingIcon = styled(RiSettings4Fill)`
  font-size: 24px;
  color: #5A5857;
  cursor: pointer;
`;

const StoreInfo = styled.div`
  display: flex;
  gap: 30px;

  margin-top: 30px;
  margin-left: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  span {
    color: #BFBFBF;
    font-size: 16px;
    font-weight: 700;
  }

  p {
    font-size: 16px;
    font-weight: 500;
  }
`;