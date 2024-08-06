import React, {useEffect, useState} from "react";

import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import PeopleKakao from "../components/PeopleKakao";
import rice from '../images/rice.png';
import '../styles/AcceptMain.css';

function MatchingMain() {
    const [peopleData, setPeopleData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        //fetch('http://54.80.162.117:8080/matches', {
        fetch('http://54.80.162.117:8080/matches', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("peopleData : ", data);
                setPeopleData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const token = localStorage.getItem('accessToken');
    //
    //         fetch('http://54.80.162.117:8080/matches', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log("peopleData : ", data);
    //                 setPeopleData(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching data:', error);
    //             });
    //     }, 1000);
    //
    //     return () => clearInterval(interval);
    // }, []);



    return (
        <div className="acceptMain">
            <Logo/>
            <div className="accept_count">
                <img src={rice} className="rice_image"/>
                매칭 현황
            </div>
            <div>
                {peopleData && peopleData?.map((person, index) => {
                        if (person.buyerInfo != null) {
                            {
                                return (
                                <PeopleKakao
                                    key={index}
                                    matchId={person.matchId}
                                    name={person.buyerInfo.name}
                                    profileIcon={person.buyerInfo.profileIcon}
                                    memberId={person.buyerInfo.memberId}
                                    kakaoId={person.buyerInfo.kakaoId}
                                    universityName={person.buyerInfo.universityName}
                                    major={person.buyerInfo.major}
                                    grade={person.buyerInfo.grade}
                                    classOf={person.buyerInfo.classOf}
                                    age={person.buyerInfo.age}
                                    brief={person.buyerInfo.brief}
                                    keywords={person.buyerInfo.keywords}
                                />
                                )
                            }
                        } else {
                            return (
                            <PeopleKakao
                                key={index}
                                matchId={person.matchId}
                                name={person.takerInfo.name}
                                profileIcon={person.takerInfo.profileIcon}
                                memberId={person.takerInfo.memberId}
                                kakaoId={person.takerInfo.kakaoId}
                                universityName={person.takerInfo.universityName}
                                major={person.takerInfo.major}
                                grade={person.takerInfo.grade}
                                classOf={person.takerInfo.classOf}
                                age={person.takerInfo.age}
                                brief={person.takerInfo.brief}
                                keywords={person.takerInfo.keywords}
                            />)
                        }
                    }
                )}
            </div>

            <BottomNav/>
        </div>
    );
}

export default MatchingMain;