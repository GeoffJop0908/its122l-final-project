import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { cn } from '../../lib/utils';
import { MdEdit, MdShield, MdPerson } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';
import { FiPlusCircle } from 'react-icons/fi';
import { IoMdCloseCircle } from 'react-icons/io';
import { AnimatePresence } from 'motion/react';
import Error from '../../components/Error';
import Success from '../../components/Success';
import useAlertStore from '../../store/useAlertStore';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';

export default function Users() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listUsers } = useAuth();
  const messages = useAlertStore((state) => state.messages);

  const fetchUsers = async () => {
    const users = await listUsers();
    setMembers(users.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getBadges = (roles, handleRemoveRole) => {
    if (!roles || roles.length === 0) {
      return <Badge role="User" />;
    }

    return (
      <div className="inline-flex gap-2 items-center">
        <Badge role="User" />
        {roles.map((role, index) => (
          <Badge
            key={index}
            role={role.charAt(0).toUpperCase() + role.slice(1)}
            onRemove={handleRemoveRole}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="pt-10 p-30 bg-stone-200">
      <div className="text-stone-950 pb-10">
        <div className="text-4xl">Users</div>
        <div className="text-lg">View All Users</div>
      </div>
      <div className="bg-jungle-green-800 shadow-md rounded-lg p-6">
        <div className="text-2xl pt-4 mb-4">GCF Members</div>
        {/* daisyui table */}
        <div
          className="overflow-x-auto rounded-box border border-base-content/5 max-h-[50vh]"
          data-lenis-prevent
        >
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {loading ? (
                <Loading />
              ) : members.length > 0 ? (
                members.map((member, i) => (
                  <tr key={i}>
                    <th>{members.length - i - 1}</th>
                    <EditableCell
                      initialValue={member.email}
                      userId={member.$id}
                      fetchUsers={fetchUsers}
                      type="email"
                    />
                    <EditableCell
                      initialValue={member.name}
                      userId={member.$id}
                      fetchUsers={fetchUsers}
                      type="name"
                    />
                    <EditableCell
                      initialValue={member.phone}
                      userId={member.$id}
                      fetchUsers={fetchUsers}
                      type="phone"
                    />
                    <Roles
                      getBadges={getBadges}
                      roles={member.labels}
                      userId={member.$id}
                      fetchUsers={fetchUsers}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    <span className="italic text-slate-300">
                      No items in the database.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed bottom-5 z-100 flex flex-col gap-3 left-1/2 transform -translate-x-1/2">
        <AnimatePresence>
          {messages.map((message, index) => {
            if (message.type === 'error') {
              return <Error key={index} message={message.message} />;
            } else if (message.type === 'success') {
              return <Success message={message.message} />;
            }
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <tr colSpan="5">
      <td colSpan="5">
        <div className="flex items-center justify-center">
          <AiOutlineLoading className="animate-spin size-10" />
        </div>
      </td>
    </tr>
  );
}

function Roles({ getBadges, roles, userId, fetchUsers }) {
  const allRoles = ['admin', 'editor'];
  const addMessage = useAlertStore((state) => state.addMessage);

  const unassignedRoles = allRoles.filter((role) => !roles.includes(role));
  const { updateUserLabels } = useAuth();

  const handleClick = (labels) => {
    updateUserLabels(userId, labels).then((updatedUser) => {
      if (updatedUser) {
        fetchUsers();
        addMessage('Updated user role.', 'success');
      } else {
        addMessage('Failed to update user labels.', 'error');
      }
    });
  };

  const handleRemoveRole = (roleToRemove) => {
    const updatedRoles = roles.filter(
      (role) => role !== roleToRemove.toLowerCase()
    );

    updateUserLabels(userId, updatedRoles).then((updatedUser) => {
      if (updatedUser) {
        fetchUsers();
        addMessage(`Removed ${roleToRemove} role.`, 'success');
      } else {
        addMessage('Failed to remove user role.', 'error');
      }
    });
  };

  const { deleteUser } = useAuth();

  const handleDelete = async (userId) => {
    try {
      const result = await deleteUser(userId);
      if (result?.success) {
        fetchUsers();
        addMessage('User deleted successfully', 'success');
      }
    } catch (err) {
      addMessage(err, 'error');
    }
  };

  return (
    <td className="group inline-flex items-center gap-1 w-full">
      {getBadges(roles, handleRemoveRole)}
      <div className="dropdown dropdown-left">
        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-1 rounded-full cursor-pointer">
          <FiPlusCircle className="size-5" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-jungle-green-950 rounded-box z-1 w-52 p-2 shadow-sm flex flex-row gap-2"
        >
          {unassignedRoles.length == 0 ? (
            <li className="italic text-slate-300">No more roles to add.</li>
          ) : (
            unassignedRoles.map((role) => (
              <li key={role} onClick={() => handleClick([...roles, role])}>
                <Badge role={role.charAt(0).toUpperCase() + role.slice(1)} />
              </li>
            ))
          )}
        </ul>
      </div>
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-red-400"
        onClick={() => handleDelete(userId)}
      >
        <RiDeleteBin5Line className="size-5" />
      </button>
    </td>
  );
}

function Badge({ key, role, onRemove }) {
  return (
    <div
      className={cn('badge badge-outline border-white relative group/badge', {
        'border-amber-300 text-amber-300': role === 'Admin',
        'border-jungle-green-300 text-jungle-green-300': role === 'Editor',
      })}
      key={key}
    >
      {role === 'Editor' ? (
        <MdEdit />
      ) : role === 'Admin' ? (
        <MdShield />
      ) : (
        <MdPerson />
      )}
      {role}
      {role !== 'User' && (
        <div
          className="absolute -top-2 -right-2 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 cursor-pointer"
          onClick={() => onRemove(role)}
        >
          <IoMdCloseCircle className="size-4" />
        </div>
      )}
    </div>
  );
}

function EditableCell({ initialValue, userId, type, fetchUsers }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const addMessage = useAlertStore((state) => state.addMessage);
  const { updateUserName, updateUserPhone, updateUserEmail } = useAuth();

  const handleSave = async (newValue) => {
    try {
      let result;
      switch (type) {
        case 'name':
          result = await updateUserName(userId, newValue);
          break;
        case 'phone':
          result = await updateUserPhone(userId, newValue);
          break;
        case 'email':
          result = await updateUserEmail(userId, newValue);
          break;
        default:
          return;
      }

      if (result) {
        setValue(newValue);
        addMessage(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } updated successfully`,
          'success'
        );
        fetchUsers();
      } else {
        setValue(initialValue);
        addMessage(`Failed to update ${type}`, 'error');
      }
    } catch (error) {
      setValue(initialValue);
      addMessage(`Failed to update ${type}`, 'error');
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setValue(initialValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave(value);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  return (
    <td className="relative group cursor-pointer w-1/4">
      {isEditing ? (
        <input
          type="text"
          className="w-full p-1 border rounded focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div
          className="flex items-center justify-between w-full"
          onClick={() => setIsEditing(true)}
        >
          <span>{value || 'N/A'}</span>
          <AiOutlineEdit className="size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      )}
    </td>
  );
}
