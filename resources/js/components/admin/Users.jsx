import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns'; // Import format function from date-fns
import style from './product/ProductTable.module.scss';
import { UserHelper } from '../../../helpers/UserHelper';
import CreateUserModal from '../modals/CreateUserModal';
import defaultImage from '../../../../public/images/profile-image.png';

// Path to default avatar image
const DEFAULT_AVATAR_URL = '/images/default-avatar.png';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false); // State for managing modal visibility

    useEffect(() => {
        fetchData();
    }, [newUser]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await UserHelper.getAllUsers();
            if (Array.isArray(data.users)) {
                setUsers(data.users);
            } else {
                throw new Error('Data received is not an array.');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUserClick = useCallback((userId) => {
        setExpandedUserId(prevId => prevId === userId ? null : userId);
    }, []);

    const handleEditUser = useCallback((userId) => {
        // Implement your edit logic here, e.g., navigate to edit page
        console.log(`Editing user with ID: ${userId}`);
    }, []);

    const handleDeleteUser = useCallback(async (userId) => {
        try {
            await UserHelper.deleteUsers(userId);
            console.log('Deleted user ID:', userId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (err) {
            console.error('Error deleting user:', err);
            setError(err);
        }
    }, []);

    const handleSaveUser = useCallback((newUser) => {
        setNewUser(true);
        setUsers(prevUsers => [...prevUsers, newUser]);
        setShowModal(false); // Close modal after save
    }, []);

    const renderTableRows = useMemo(() => {
        if (!Array.isArray(users)) {
            console.error('Users data is not an array:', users);
            return null;
        }

        return users.map((user, index) => {
            const createdAt = new Date(user.created_at);
            const updatedAt = new Date(user.updated_at);

            const formattedCreatedAt = isNaN(createdAt.getTime()) ? 'Invalid Date' : format(createdAt, 'yyyy-MM-dd HH:mm:ss');
            const formattedUpdatedAt = isNaN(updatedAt.getTime()) ? 'Invalid Date' : format(updatedAt, 'yyyy-MM-dd HH:mm:ss');

            // Use default avatar if user.avatar is not available
            const avatarSrc = user.avatar ? user.avatar : DEFAULT_AVATAR_URL;

            return (
                <tr
                    className={`${style['category-row']} ${expandedUserId === user.id ? style['expanded-row'] : ''}`}
                    onClick={() => handleUserClick(user.id)}
                    key={index}
                >
                    <td>{user.id}</td>
                    <td>
                        <img src={avatarSrc} alt={`${user.name}'s avatar`} className={style['avatar']} />
                    </td>
                    <td>{user.name}</td>
                    <td>{formattedCreatedAt}</td>
                    <td>{formattedUpdatedAt}</td>
                    <td className={style['action-buttons']}>
                        <div className={style['button-container']}>
                            <button className="btn btn-primary" onClick={() => handleEditUser(user.id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </div>
                    </td>
                </tr>
            );
        });
    }, [users, expandedUserId, handleUserClick, handleEditUser, handleDeleteUser]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <>
            <button
                type="button"
                className="btn btn-success mb-1 float-end"
                onClick={() => setShowModal(true)} // Show modal when clicked
            >
                Add User
            </button>

            <CreateUserModal
                show={showModal} // Pass showModal state
                handleClose={() => setShowModal(false)} // Handler to close modal
                handleSave={handleSaveUser} // Handler to save user
            />

            <table className={style['main-table']}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {renderTableRows}
                </tbody>
            </table>
        </>
    );
};

export default Users;
