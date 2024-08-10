import React, { useEffect, useMemo } from 'react';
import CommonTable from '../Common/CommonTable';
import useApi from '../../hooks/useApi';

const Users = () => {
    const { data, loading, callApi } = useApi();
    useEffect(() => {
        (async () =>
            await callApi({
                url: '/api/user/list',
                method: 'GET'
            })
        )()
    }, [])

    const columns = [
        { Header: 'First Name', accessor: 'first_name' },
        { Header: 'Last Name', accessor: 'last_name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Created At', accessor: 'created_at' },
    ];

    const userList = useMemo(() => {
        return data?.users || []
    }, [data])

    if (loading) return <div>Loading...</div>

    return (
        <CommonTable
            data={userList}
            columns={columns}
            searchKeys={["first_name", "last_name", "email"]}
        />
    );
};

export default Users;
