import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MypageLayout from "../../../components/layout/MypageLayout";
import { IoMdSettings } from "react-icons/io";

const MyStorePage = () => {
  const navigate = useNavigate();
  const storeData = [
    {
      id: 1,
      name: "BHC",
      image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDhfMTAw%2FMDAxNzA5OTA4ODc0OTUw.96xNUYTAMJGFIB2ihvdgtWmiwYaGgDrbBaO8kdc44xog.NCF8ntPp1xDdaqud9NLXuoMtxmQehVN5Rw8DgrBua8Ug.PNG%2FBHC.png&type=sc960_832", // 이미지 URL
      address: "부산광역시 남구 부경로 123 1층",
      owner: "김치킨",
      contact: "010-1234-5678",
      email: "hello@naver.com",
    },
    {
      id: 2,
      name: "맥도날드",
      image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMTNfMjE2%2FMDAxNzM0MDQ5NDAxNzg0.Yk2qqTdXGk_UIdyc3ewKfXMXYJYxbqZgV5xfPIMillYg.X5lYnQ9t77bXgt1Ac3KK3pVF-6GxpC9cKars4bnwzaYg.JPEG%2FIMG_4214.JPG&type=sc960_832", // 이미지 URL
      address: "부산광역시 중구 맥도날드로 45",
      owner: "박버거",
      contact: "010-9876-5432",
      email: "burger@fastfood.com",
    },
    {
      id: 3,
      name: "스타벅스",
      image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMDVfMjg2%2FMDAxNjc3OTkwMDM2MzU5.cmpe_4-YqNkPW23U7UNgxHZEw_yZBzz8fIrIOLFEFmAg.Egv2A4g8dbouMAt3SxR12TUUVNM3bquAB5dJSBS3WYIg.PNG.gisuggy%2F20230305_131920.jpg&type=sc960_832", // 이미지 URL
      address: "부산광역시 해운대구 스타벅스로 89",
      owner: "이카페",
      contact: "010-5678-1234",
      email: "coffee@starbucks.com",
    },
  ];
  
  const handleNavigation = (mode) => {
    navigate("/mypage/mystore-form", { state: { modeType: mode } });
  };

  return (
    <MypageLayout>
      <Page>
        <Title>
          나의 매장
          <button onClick={() => handleNavigation("register")}>매장등록</button>
        </Title>

        <StoreList>
          {storeData.map((store) => (
            <StoreItem key={store.id}>
              <img src={store.image} alt="가게 이미지" />

              <div>
                <div className="store-name">
                  {store.name}
                  <div className="edit-button" onClick={() => handleNavigation("edit")}>
                    <IoMdSettings />
                    매장 정보 수정
                  </div>
                </div>

                <div className="store-info">
                  <div>
                    <span>주소</span>
                    <p>{store.address}</p>
                  </div>
                  <div>
                    <span>대표명</span>
                    <p>{store.owner}</p>
                  </div>
                  <div>
                    <span>연락처</span>
                    <p>{store.contact}</p>
                  </div>
                  <div>
                    <span>이메일</span>
                    <p>{store.email}</p>
                  </div>
                </div>
              </div>
            </StoreItem>
          ))}
        </StoreList>
      </Page>
    </MypageLayout>
  );
};

export default MyStorePage;


const Page = styled.div`
  padding: 20px 30px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 1000px;
  max-width: 1400px;
  min-height: 750px;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;

  button {
    width: 105px;
    height: 42px;
    border-radius: 8px;
    background-color: #6E3C3B;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
  }
`

const StoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`

const StoreItem = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  padding: 25px 22px 50px;
  border: 1px solid #E4E4E4;
  border-radius: 20px;

  > div {
    width: 100%;
  }

  img {
    min-width: 125px;
    max-width: 125px;
    height: 125px;
    background-size: cover;
    border-radius: 40px;
    object-fit: cover; 
    object-position: center;
    background-color: #AAEAAA;
  }

  .store-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .edit-button {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 500;
    color: #999999;
    cursor: pointer;
  }

  .store-info {
    display: flex;
    flex-direction: column;
    gap: 14px;

    div {
      display: flex;
      gap: 25px;
    }

    span {
      min-width: 45px;
      font-size: 16px;
      font-weight: 600;
      color: #BFBFBF;
    }

    p {
      font-size: 16px;
      color: #000000;
    }
  }
`