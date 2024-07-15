import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'; // Import format function from date-fns
import style from '../admin/product/ProductTable.module.scss';
import { UserHelper } from '../../../../helpers/UserHelper';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedUserId, setExpandedUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await UserHelper.getAllUsers();
                if (Array.isArray(data)) {
                    setUsers(data);
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

        fetchData();
    }, []);

    const handleUserClick = (userId) => {
        setExpandedUserId(prevId => prevId === userId ? null : userId);
    };

    const handleEditUser = (userId) => {
        // Implement your edit logic here, e.g., navigate to edit page
        console.log(`Editing user with ID: ${userId}`);
    };

    const handleDeleteUser = (userId) => {
        // Implement your delete logic here
        console.log(`Deleting user with ID: ${userId}`);
        // Example of how to update users state after deletion (if not using API)
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    const renderCars = (cars) => (
        <table className={style['sub-categories-table']}>
            <thead>
            <tr>
                <th>Car ID</th>
                <th>Model</th>
                <th>Year</th>
            </tr>
            </thead>
            <tbody>
            {cars.map((car) => (
                <tr key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    const renderTableRows = React.useMemo(() => {
        if (!Array.isArray(users)) {
            console.error('Users data is not an array:', users);
            return null; // Or handle the error appropriately
        }

        return users.map((user) => (
            <React.Fragment key={user.id}>
                <tr
                    className={style['category-row']}
                    onClick={() => handleUserClick(user.id)}
                >
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{format(new Date(user.created_at), 'yyyy-MM-dd HH:mm:ss')}</td>
                    <td>{format(new Date(user.updated_at), 'yyyy-MM-dd HH:mm:ss')}</td>
                    <td>
                        <button onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </td>
                </tr>
                {expandedUserId === user.id && user.cars && (
                    <tr className={style['sub-categories-row']}>
                        <td colSpan="5">
                            {renderCars(user.cars)}
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ));
    }, [users, expandedUserId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            <table className={style['main-table']}>
                <thead>
                <tr>
                    <th>ID</th>
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
        </div>
    );
};

export default Users;
