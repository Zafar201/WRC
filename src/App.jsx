
import { useEffect, useState } from 'react';
import './App.css'

import axios from 'axios';
import WindSpeedAnalysisChart from './component/WindSpeedAnalysisChart ';


function App() {
  const [data, setData] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
     await axios.get('http://103.189.172.40:8012/api/data-analysis/wind-speed/').then((res)=>{
        console.log(res.data,'ress')
        setData(res.data)
      })
     
    }
    fetchData()
  },[])


  return (
    <>
      {/* <CubeRuleChart/> */}
      {/* <KPIChart/> */}
      {data && (
        <WindSpeedAnalysisChart data={data}/>
      )}
      {/* <VerificationChart/> */}
    </>
  
  );
}
export default App
