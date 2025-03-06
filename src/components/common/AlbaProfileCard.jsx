import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import defaultProfileImage from '../../assets/images/default-profile.jpg';

const AlbaProfileCard = ({
  name = '',
  age = 0,
  gender = '',
  rating = 0,
  danpatTime = 0,
  danpatExperience = 0,
  jobExperience = [],
  hopes = [],
  location = [],
  profileImage = defaultProfileImage,
  isBookmarked = false,
  onToggleBookmark,
  direction = '',
}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFull = i < Math.floor(rating);
      const isHalf = i < rating && i >= Math.floor(rating);

      stars.push(
        <Star key={i} isFull={isFull} isHalf={isHalf}>
          ★
        </Star>,
      );
    }

    return (
      <RatingSection>
        <StarContainer>{stars}</StarContainer>
        <RatingText>{rating} / 5</RatingText>
      </RatingSection>
    );
  };

  return (
    <Card direction={direction}>
      <Profile>
        <ProfileImg
          src={profileImage || defaultProfileImage}
          alt={`${name}님의 프로필`}
        />
        <Info>
          <Name>{name}</Name>
          {gender} {age}세
        </Info>
        <RatingSection>{renderStars(rating)}</RatingSection>
      </Profile>

      <Body>
        {danpatTime > 0 && (
          <DanpatlerTag>단팥 경력 {danpatTime}회</DanpatlerTag>
        )}

        <Experience>
          <CardLabel>경력</CardLabel>
          {[...danpatExperience, ...jobExperience].map((job, index) => (
            <JobTag
              key={index}
              className={danpatExperience.includes(job) ? 'danpat' : 'other'}
            >
              {job}
            </JobTag>
          ))}
        </Experience>

        {hopes.length > 0 && (
          <Hope>
            <CardLabel>희망</CardLabel>
            {hopes.map((hope, index) => (
              <HopeTag key={index}>{hope}</HopeTag>
            ))}
          </Hope>
        )}

        <Location>
          <CardLabel>지역</CardLabel>
          {location.map((loc, index) => (
            <LocationTag key={index}>{loc}</LocationTag>
          ))}
        </Location>
      </Body>

      <BookmarkButton isBookmarked={isBookmarked} onClick={onToggleBookmark}>
        <Bookmark />
      </BookmarkButton>
    </Card>
  );
};

const AlbaProfileList = ({ profiles, toggleBookmark }) => {
  const [filterByDanpat, setFilterByDanpat] = useState(false);
  const [sortOption, setSortOption] = useState('none');

  const toggleDantpatler = () => {
    setFilterByDanpat((prev) => !prev);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const processedProfiles = [...profiles]
    .filter((profile) => (filterByDanpat ? profile.isDanpat : true))
    .sort((a, b) => {
      if (sortOption === 'desc') {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <AppWrapper>
      <FilterSection>
        <DanpatlerButton active={filterByDanpat} onClick={toggleDantpatler}>
          <Checkbox
            type="checkbox"
            checked={filterByDanpat}
            onChange={toggleDantpatler}
          />
          단팥러만 보기
        </DanpatlerButton>

        <SortSelect value={sortOption} onChange={handleSortChange}>
          <option value="none">기본순</option>
          <option value="desc">평점 높은순</option>
        </SortSelect>
      </FilterSection>

      <CardContainer>
        {processedProfiles.map((profile, index) => (
          <AlbaProfileCard
            key={index}
            name={profile.name}
            age={profile.age}
            gender={profile.gender}
            rating={profile.rating}
            danpatTime={profile.danpatTime}
            danpatExperience={profile.danpatExperience}
            jobExperience={profile.jobExperience}
            hopes={profile.hopes}
            location={profile.location}
            isBookmarked={profile.isBookmarked}
            onToggleBookmark={() => toggleBookmark(index)}
          />
        ))}
      </CardContainer>
    </AppWrapper>
  );
};

const Card = styled.div`
  flex: 1;
  display: flex;
  gap: ${({ direction = 'row' }) => (direction === 'column' ? '10px' : '40px')};
  flex-direction: ${({ direction }) =>
    direction === 'column' ? 'column' : 'row'};
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: ${({ direction = 'row' }) =>
    direction === 'column' ? '15px' : '20px'};
  &:hover {
    border-color: var(--primary-color);
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  width: 100%;
  box-sizing: border-box;
  flex: 2;
`;

const ProfileImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: ${({ direction }) =>
    direction === 'column' ? '0.8rem' : '1.2rem'};
  color: #333;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
  width: 180px;
  font-size: ${({ direction }) => (direction === 'column' ? '0.6rem' : '1rem')};
  color: #777;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    fill: ${({ isBookmarked }) =>
      isBookmarked ? 'var(--secondary-color)' : 'var(--gray_light)'};
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background: none;
  }
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: 8px;

  &.danpat {
    border: 1.2px solid var(--primary-color);
    color: var(--primary-color);
  }

  &.other {
    border: 1.2px solid #848484;
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
  white-space: nowrap; /* Prevents wrapping */
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
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
      ? 'linear-gradient(to right, var(--secondary-color) 50%, var(--gray_light) 50%)'
      : isFull
        ? 'var(--secondary-color)'
        : 'lightgray'};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2px;
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
  white-space: nowrap; /* Prevents wrapping */
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
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  outline: none;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
  padding-left: 20px;
  align-items: center;
`;

const AppWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  margin-top: 20px;
`;

export { AlbaProfileCard, AlbaProfileList };
