import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentAlba from './CurrentAlba'; 

const CurrentAlbaHandler = () => {
  const [totalAlba, setTotalAlba] = useState(0);
  const [danpatAlba, setDanpatAlba] = useState(0);

  useEffect(() => {
    axios.get('/api/alba') // 추후에 api 변경
      .then(response => {
        setTotalAlba(response.data.totalAlba);
        setDanpatAlba(response.data.danpatAlba);
      })
      .catch(error => console.error('API 호출 오류:', error));
  }, []);

    return (
        <CurrentAlba totalAlba={totalAlba} danpatAlba={danpatAlba} />
    );
};

export default CurrentAlbaHandler;
