import React from 'react';
import SimpleCard from '../components/SimpleCard';
import { getUserDetails } from '../api/axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
// import useRefreshToken from '../hooks/useRefreshToken';

export default function Dashboard() {
  // const refresh = useRefreshToken();

  return (
    <SimpleCard>
      Welcome User!
      <button
        className="btn"
        onClick={() => console.log(jwtDecode(Cookies.get('')))}
      >
        See User
      </button>
    </SimpleCard>
  );
}
