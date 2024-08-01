import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {format} from 'date-fns';
import {UserHelper} from '../../../helpers/UserHelper';
import CreateUserModal from '../modals/CreateUserModal';
import defaultImage from '../../../../public/images/profile-image.png';
import Table from '../../components/components/table/Table'; // Ensure this path is correct
import DeleteIcon from '../../../../public/images/icon/delete.svg';
import EditIcon from '../../../../public/images/icon/edit.svg';


const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleSaveUser = useCallback((newUser) => {
        setNewUser(true);
        setUsers(prevUsers => [...prevUsers, newUser]);
        setShowModal(false);
    }, []);

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
        } catch (error) {
            console.error('Invalid date:', dateString);
            return 'Invalid date';
        }
    };

    const columns = [
        {key: 'id', label: 'ID'},
        {
            key: 'avatar',
            label: 'Avatar',
            render: user => <img  className="img-fluid rounded-circle"  src={user.avatar ? user.avatar : defaultImage} alt={`${user.name}'s avatar`}
                                 style={{width: 50, height: 50}}/>
        },
        {key: 'name', label: 'Name'},
        {key: 'created_at', label: 'Created At', render: user => formatDate(user.created_at)},
        {key: 'updated_at', label: 'Updated At', render: user => formatDate(user.updated_at)},
    ];

    const renderRowActions = user => (
        <div className="d-flex justify-content-between ">
            <button className="btn p-0 " onClick={() => handleEditUser(user.id)}>
                <img src={DeleteIcon} alt="delete"/>
            </button>
            <button className="btn p-0" onClick={() => handleDeleteUser(user.id)}>
                <img src={EditIcon} alt="edit"/>
            </button>
        </div>
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <>
            <button
                style={{right: '13%', bottom: '657px'}}
                type="button"
                className="btn btn-success mb-1 float-end"
                onClick={() => setShowModal(true)}
            >
                Add User
            </button>

            <CreateUserModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSaveUser}
            />

            <Table
                columns={columns}
                data={users}
                renderRowActions={renderRowActions}
            />
        </>
    );
};

export default Users;
