import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignUp1 from './pages/SignUp1';
import KakaoId from './pages/KakaoId';
import Main from './pages/Main';
import RootLayout from './RootLayout';
import SignUp2 from './pages/SignUp2';
import SchoolCheck from './pages/SchoolCheck';
import Profile1 from './pages/Profile1';
import RequestMain from './pages/RequestMain';
import AcceptMain from './pages/AcceptMain';
import MatchingMain from './pages/MatchingMain';
import Profile2 from './pages/Profile2';
import Profile3 from './pages/Profile3';
import Filter from './pages/Filter';
import MessageMain from './pages/MessageMain';

function App() {
  const [profileData, setProfileData] = useState({});

  console.log('App :', profileData);

  return (
    <RootLayout>
      <Routes>
        <Route path='/Main' element={<Main />}/>
        <Route path='/' element={<SignUp1 />} />
        <Route path='/KakaoId' element={<KakaoId />}/>
        <Route path='/SignUp2' element={<SignUp2 />} />
        <Route path='/SchoolCheck' element={<SchoolCheck />} />
        <Route path='/Profile1' element={<Profile1 setProfileData={setProfileData}/>} />
        <Route path='/Profile2' element={<Profile2 setProfileData={setProfileData}/>} />
        <Route path='/Profile3' element={<Profile3 profileData={profileData}/>} />
        <Route path='/Filter' element={<Filter />} />


        <Route path='/RequestMain' element={<RequestMain />} />
        <Route path='/AcceptMain' element={<AcceptMain />} />
        <Route path='/MatchingMain' element={<MatchingMain />} />
        <Route path='/MessageMain' element={<MessageMain />} />
        
      </Routes>
    </RootLayout>
  );
}

export default App;
