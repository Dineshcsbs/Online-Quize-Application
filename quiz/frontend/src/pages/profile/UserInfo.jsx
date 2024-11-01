import React from 'react';
import { useLocation } from 'react-router-dom';
import { USER_INFO } from '../../constant/globalData/UserData';
import { useUserInfoDataQuery } from '../../service/ProfileService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const UserInfo = () => {
    const location = useLocation();
    const userId = location.state?.id;
    const { data: useInfoData, isLoading } = useUserInfoDataQuery(userId);

    if (isLoading) return <div className="text-center mt-5"><h4>Loading...</h4></div>;

    const userInfo = useInfoData?.data;

    return (
        <div className="container mt-5 ">
            <div>
                
            <h2 className="text-center mb-4">User Information</h2>
            </div>
            <div className="table-responsive col-8 mx-auto">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Field</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo && Object.keys(userInfo).map((key, index) => (
                            <tr key={key}>
                                <td className="font-weight-bold">{USER_INFO[index]}</td>
                                <td>{userInfo[key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserInfo;
