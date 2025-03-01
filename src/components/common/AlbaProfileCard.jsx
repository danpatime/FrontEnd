import React, { useState } from "react";
import styled from "styled-components";
import {ReactComponent as Bookmark} from "../../assets/icons/bookmark.svg"
import defaultProfileImage from "../../assets/images/default-profile.jpg"
import PropTypes from 'prop-types';

// AlbaProfileCard
const AlbaProfileCard = ({
  employeedId, //추가됨
  name = "",
  age = 0,
  sex = "", //gender
  starPoint = 0, //rating
  workCount =0, //danpatTime
  danpatExperience = 0, // 이거 일단 보류...
  externalCareerList = [], //jobExperience
  flavoredCategoryList = [], //hopes
  flavoredDistrictList = [], //location
  profileImage = defaultProfileImage,
  isBookmarked = false, 
  onToggleBookmark,     
}) => {

const renderStars = (starPoint) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const isFull = i < Math.floor(starPoint);
    const isHalf = i < starPoint && i >= Math.floor(starPoint);

    stars.push(
      <Star
        key={i}
        isFull={isFull}
        isHalf={isHalf}
      >
        ★
      </Star>
    );
  }

  return (
    <RatingSection>
      <StarContainer>{stars}</StarContainer>
      <RatingText>{starPoint} / 5</RatingText>
    </RatingSection>
  );
};

  return (
    <Card>
      <Profile>
        <ProfileImg src={profileImage} alt={`${name}님의 프로필`} />
        <Info>
          <Name>{name}</Name>
          {sex} {age}세
        </Info>
        <RatingSection>{renderStars(starPoint)}</RatingSection>
      </Profile>

      <Body>
        {/*단팥경력 & 외부경력*/}
        
          {workCount > 0 && (
            <DanpatlerTag>
              단팥 경력 {workCount}회
            </DanpatlerTag>
        )}

        <Experience>
            <CardLabel>경력</CardLabel>
            {[...danpatExperience, ...externalCareerList].map((job, index) => (
            <JobTag
                key={index}
                className={danpatExperience.includes(job) ? 'danpat' : 'other'}
              >
              {job}
              </JobTag>
            ))}
        </Experience>
        
        {/*희망업종*/}
      {flavoredCategoryList.length > 0 && (
        <Hope>
          <CardLabel>희망</CardLabel>
            {flavoredCategoryList.map((category, index) => (<HopeTag key={index}>{category}</HopeTag>))}
        </Hope>)}
        
      {/*지역*/}
      <Location>
          <CardLabel>지역</CardLabel>
          {flavoredDistrictList.map((district, index) => (
            <LocationTag key={index}>
              {district.sido} {district.sigungu} {district.dong}
            </LocationTag>
          ))}
      </Location>
      </Body>

      {/* 북마크 버튼 */}
      <BookmarkButton
        isBookmarked={isBookmarked}
        onClick={()=>onToggleBookmark(employeedId)}
      >
        <Bookmark />
      </BookmarkButton>
    </Card>
  );
};

//AlbaProfileList
const AlbaProfileList = ({ profiles ,toggleBookmark}) => {
  const [filterByDanpat, setFilterByDanpat] = useState(false);
  const [sortOption, setSortOption] = useState("none");

  const toggleDantpatler = () => {
    setFilterByDanpat(((prev) => !prev));
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

const processedProfiles = [...profiles]
    // 단팥러 필터 (단팥러만 보기)
    .filter((profile) => (filterByDanpat ? profile.isDanpat : true))
    // 평점 높은 순 정렬 
    .sort((a, b) => {
      if (sortOption === "desc") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <AppWrapper>

      <FilterSection>

        {/* 단팥러 필터 버튼 */}
        <DanpatlerButton
          active={filterByDanpat}
          onClick={toggleDantpatler}>
          <Checkbox
            type="checkbox"
            checked={filterByDanpat}
            onChange={toggleDantpatler}
          />
          단팥러만 보기
        </DanpatlerButton>

        {/* 평점 정렬 버튼 */}
        <SortSelect value={sortOption} onChange={handleSortChange}>
          <option value="none">기본순</option>
          <option value="desc">평점 높은순</option>
        </SortSelect>

      </FilterSection>

      
      {processedProfiles.map((profile) => (
        <AlbaProfileCard
          key={profile.employeedId}
          employeedId={profile.employeedId}
    name={profile.name}
    age={profile.age}
    sex={profile.sex}
    starPoint={profile.starPoint}
    workCount={profile.workCount}
    danpatExperience={profile.danpatExperience}
    externalCareerList={profile.externalCareerList}
    flavoredCategoryList={profile.flavoredCategoryList}
    flavoredDistrictList={profile.flavoredDistrictList}
    isBookmarked={profile.isBookmarked}
    onToggleBookmark={toggleBookmark}
        />
      ))}
    </AppWrapper>
  );
};

AlbaProfileCard.propTypes = {
  employeedId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  sex: PropTypes.string.isRequired,
  starPoint: PropTypes.number,
  workCount: PropTypes.number,
  danpatExperience: PropTypes.number,
  externalCareerList: PropTypes.array,
  flavoredCategoryList: PropTypes.array,
  flavoredDistrictList: PropTypes.array,
  profileImage: PropTypes.string,
  isBookmarked: PropTypes.bool,
  onToggleBookmark: PropTypes.func.isRequired,
};
AlbaProfileList.propTypes = {
  profiles: PropTypes.array.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
};



const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 40px 15px 40px;
  &:hover{
    border-color: var(--primary-color);
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;


const ProfileImg = styled.img`
  width: 64px;
  height: 64px; 
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const Info = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
margin-bottom: 10px;
width: 180px;
  font-size: 1rem;
  color: #777;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    fill: ${({ isBookmarked }) => (isBookmarked ? "var(--secondary-color)" : "var(--gray_light)")};

  }
&:focus{
  outline: none;
}
  &:hover {
    background: none; 
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  width: 65%;
  height: 120px;
  position: relative;
  top: 2px;
  margin-left: 20px;
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
  justify-content: center;
  align-items: center;
`;

const CardLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
  font-size: 0.9rem;
`;
const DanpatlerTag = styled.span`
  background: var(--primary-color-light);
  color: #fff;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 12px;
  width: fit-content;
  margin-bottom: 13px;
`;

const Experience = styled.div`
  margin-bottom: 13px;
`;
const JobTag = styled.span`
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right:8px;

  &.danpat {
    border: 1.5px solid var(--primary-color);  
    color: var(--primary-color);
  }

  &.other {
    border: 1.5px solid #848484;
    color: #848484;
  }
`;

const Hope = styled.div`
  margin: 4px 0px 13px 0px;
  gap: 3px;
`;

const HopeTag = styled.span`
border: solid 0.5px var(--gray_light);
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: 4px;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap:2px;
`;

const Star = styled.span`
  display: flex; 
  justify-content: center; 
  align-items: center;
  width: 24px; 
  height: 24px; 
  font-size: 24px; 
  background: ${({ isFull, isHalf }) => 
    isHalf
      ? "linear-gradient(to right, var(--secondary-color) 50%, var(--gray_light) 50%)" 
      : isFull
      ? "var(--secondary-color)" 
      : "lightgray"}; 
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom:2px;
`;

const RatingText = styled.span`
  font-size: 16px;
  color: #333;
  padding: 2px;
  font-weight: 500;
`;
const Location = styled.div`
  font-size: 0.9em; 
  color: #555;
`;
const LocationTag = styled.span`
  font-size: 0.9rem; 
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 4px;
`;
const DanpatlerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: var(--primary-color-light);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    background-color: var(--primary-color-light);
  }
`;
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--primary-color-dark);

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;
const SortSelect = styled.select`
  color: black;
  border: solid 0.3px var(--gray_light);
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    background-color: white;
  }
`;

const FilterSection = styled.div`
  position: relative;
  right: 50px;
  justify-content: right;
  display: flex;
  gap: 10px;
`;
const AppWrapper = styled.div`
 position: relative;
 display: flex;
 flex-direction: column;
 top: 50px;
`;

export { AlbaProfileCard, AlbaProfileList };
