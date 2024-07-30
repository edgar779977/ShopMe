import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {format} from 'date-fns';
import {UserHelper} from '../../../helpers/UserHelper';
import CreateUserModal from '../modals/CreateUserModal';
import defaultImage from '../../../../public/images/profile-image.png';
import Table from '../../components/components/table/Table'; // Ensure this path is correct

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
            render: user => <img src={user.avatar ? user.avatar : defaultImage} alt={`${user.name}'s avatar`}
                                 style={{width: 50, height: 50, borderRadius: '25px'}}/>
        },
        {key: 'name', label: 'Name'},
        {key: 'created_at', label: 'Created At', render: user => formatDate(user.created_at)},
        {key: 'updated_at', label: 'Updated At', render: user => formatDate(user.updated_at)},
    ];

    const renderRowActions = user => (
        <div>
            <button style={{border: "none", backgroundColor: 'white'}} onClick={() => handleEditUser(user.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24"
                     viewBox="0 0 32 32" width="24">
                    <g fill="green" >
                    <path d="m2 26h28v2h-28z"/>
                    <path
                        d="m25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15v6.4h6.4zm-5-5 3.6 3.6-3 3-3.6-3.6zm-14.4 18v-3.6l10-10 3.6 3.6-10 10z"/>
                    <path d="m0 0h32v32h-32z" fill="none"/>
                    </g>
                </svg>
            </button>
            <button style={{border: "none", backgroundColor: 'white'}} onClick={() => handleDeleteUser(user.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <g fill="red">
                        <path
                            d="m9.5 0c.27614237 0 .5.22385763.5.5 0 .27614238-.22385763.5-.5.5-.55228475 0-1 .44771525-1 1 0 .27614237-.22385763.5-.5.5s-.5-.22385763-.5-.5c0-1.1045695.8954305-2 2-2z"/>
                        <path
                            d="m16.5 2c0 .27614237-.2238576.5-.5.5s-.5-.22385763-.5-.5c0-.55228475-.4477153-1-1-1-.2761424 0-.5-.22385762-.5-.5 0-.27614237.2238576-.5.5-.5 1.1045695 0 2 .8954305 2 2z"/>
                        <path
                            d="m4 20c0-.2761424.22385763-.5.5-.5s.5.2238576.5.5c0 .5522847.44771525 1 1 1 .27614237 0 .5.2238576.5.5s-.22385763.5-.5.5c-1.1045695 0-2-.8954305-2-2z"/>
                        <path
                            d="m18 22c-.2761424 0-.5-.2238576-.5-.5s.2238576-.5.5-.5c.5522847 0 1-.4477153 1-1 0-.2761424.2238576-.5.5-.5s.5.2238576.5.5c0 1.1045695-.8954305 2-2 2z"/>
                        <path
                            d="m2.5 5c-.27614237 0-.5-.22385763-.5-.5s.22385763-.5.5-.5h19.0217289c.2761423 0 .5.22385763.5.5s-.2238577.5-.5.5z"/>
                        <path
                            d="m9.5 1c-.27614237 0-.5-.22385762-.5-.5 0-.27614237.22385763-.5.5-.5h5c.2761424 0 .5.22385763.5.5 0 .27614238-.2238576.5-.5.5z"/>
                        <path
                            d="m6 22c-.27614237 0-.5-.2238576-.5-.5s.22385763-.5.5-.5h12c.2761424 0 .5.2238576.5.5s-.2238576.5-.5.5z"/>
                        <path
                            d="m7.5 2c0-.27614237.22385763-.5.5-.5s.5.22385763.5.5v2.5c0 .27614237-.22385763.5-.5.5s-.5-.22385763-.5-.5z"/>
                        <path
                            d="m4 5c0-.27614237.22385763-.5.5-.5s.5.22385763.5.5v15c0 .2761424-.22385763.5-.5.5s-.5-.2238576-.5-.5z"/>
                        <path
                            d="m7.5 8c0-.27614237.22385763-.5.5-.5s.5.22385763.5.5v10c0 .2761424-.22385763.5-.5.5s-.5-.2238576-.5-.5z"/>
                        <path
                            d="m11.5 8c0-.27614237.2238576-.5.5-.5s.5.22385763.5.5v10c0 .2761424-.2238576.5-.5.5s-.5-.2238576-.5-.5z"/>
                        <path
                            d="m15.5 8c0-.27614237.2238576-.5.5-.5s.5.22385763.5.5v10c0 .2761424-.2238576.5-.5.5s-.5-.2238576-.5-.5z"/>
                        <path
                            d="m19 5c0-.27614237.2238576-.5.5-.5s.5.22385763.5.5v15c0 .2761424-.2238576.5-.5.5s-.5-.2238576-.5-.5z"/>
                        <path
                            d="m15.5 2c0-.27614237.2238576-.5.5-.5s.5.22385763.5.5v2.5c0 .27614237-.2238576.5-.5.5s-.5-.22385763-.5-.5z"/>
                    </g>
                </svg>
            </button>
        </div>
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <>
            <button
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
