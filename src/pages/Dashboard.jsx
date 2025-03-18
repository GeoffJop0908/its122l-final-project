import React from 'react';
import SimpleCard from '../components/SimpleCard';
// import useRefreshToken from '../hooks/useRefreshToken';

export default function Dashboard() {
  // const refresh = useRefreshToken();

  return (
    <SimpleCard>
      Welcome User!
      <button className="btn">See User</button>
    </SimpleCard>
  );
}
