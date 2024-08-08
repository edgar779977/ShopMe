import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import CreateUserModal from '../../modals/CreateUserModal';
import defaultImage from '../../../../../public/images/profile-image.png';
import Table from '../../components/table/Table';
import DeleteIcon from '../../../../../public/images/icon/delete.svg';
import EditIcon from '../../../../../public/images/icon/edit.svg';
import Pagination from '../../components/Pagination/Pagination';
import style from './Users.module.scss';
import debounce from 'lodash.debounce';
import { UserHelper } from '../../../../helpers/UserHelper';
import { ClipLoader } from 'react-spinners';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await UserHelper.getAllUsers(search, page);
            setUsers(data.data);
            setTotalPages(data.last_page);
        } catch (error) {
            setError('Error fetching users.');
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, [search, page]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearchChange = useCallback(
        debounce((e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page when search changes
        }, 300),
        []
    );

    const handleSaveUser = useCallback((newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
        setShowModal(false);
    }, []);

    const handleEditUser = useCallback((userId) => {
        console.log(`Editing user with ID: ${userId}`);
    }, []);

    const handleDeleteUser = useCallback((userId) => {
        console.log(`Deleting user with ID: ${userId}`);
    }, []);

    const formatDate = useCallback((dateString) => {
        try {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
        } catch {
            return 'Invalid date';
        }
    }, []);

    const columns = useMemo(() => [
        { key: 'id', label: 'ID' },
        {
            key: 'avatar',
            label: 'Avatar',
            render: user => (
                <img
                    src={user.avatar || defaultImage}
                    alt={`${user.name}'s avatar`}
                    className={style.avatar}
                />
            ),
        },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'created_at', label: 'Created At', render: user => formatDate(user.created_at) },
        { key: 'updated_at', label: 'Updated At', render: user => formatDate(user.updated_at) },
    ], [formatDate]);

    const renderRowActions = useCallback(user => (
        <div className={style.actions}>
            <button
                onClick={() => handleEditUser(user.id)}
                aria-label={`Edit ${user.name}`}
                className={style.actionButton}
            >
                <img src={EditIcon} alt="Edit" />
            </button>
            <button
                onClick={() => handleDeleteUser(user.id)}
                aria-label={`Delete ${user.name}`}
                className={style.actionButton}
            >
                <img src={DeleteIcon} alt="Delete" />
            </button>
        </div>
    ), [handleEditUser, handleDeleteUser]);

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <input
                    type="text"
                    placeholder="Search users"
                    onChange={handleSearchChange}
                    className="form-control w-25"
                />
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                >
                    Add User
                </button>
            </div>

            <CreateUserModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSaveUser}
            />

            {error && <div className={style.error}>{error}</div>}
            {loading ? (
                <div className={style.spinnerContainer}>
                    <ClipLoader size={50} color="#007bff" /> {/* Adjust size and color */}
                </div>
            ) : (
                <>
                    <Table
                        columns={columns}
                        data={users}
                        renderRowActions={renderRowActions}
                    />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </>
    );
};

export default Users;
