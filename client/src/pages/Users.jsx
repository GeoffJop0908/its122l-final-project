import React, { useState, useEffect } from 'react';
import SimpleCard from '../components/SimpleCard';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        const usersArray = Object.values(response.data);

        console.log(usersArray);
        setUsers(usersArray);
      } catch (err) {
        if (err.name === 'CanceledError') return;
        if (err?.response?.status === 403 || err?.response?.status === 401) {
          navigate('/login', { state: { from: location }, replace: true });
        }
        console.error(err);
      }
    };

    getUsers();

    return () => {
      //   isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  return (
    <SimpleCard>
      <h1>Users</h1>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </SimpleCard>
  );
}
