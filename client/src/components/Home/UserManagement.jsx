import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../Common/CommonTable";
import useApi from "../../hooks/useApi";
import withAdminAccess from "../../hoc/withAdminAccess";
import EditUserPopup from "./EditUserPopup";
import useToastHook from "../Common/Toast";
import AppContext from "../../context/AppContext";

const UserManagement = withAdminAccess(() => {
    const toast = useToastHook()
    const { loggedInUser } = React.useContext(AppContext);
    const { data, loading, callApi, refetch } = useApi();
    const [isEditOpen, setEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleClose = () => {
        setEditOpen(false);
        setSelectedUser(null);
    };

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

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditOpen(true);
    };

    const handleDelete = async (user) => {
        if (user.id == loggedInUser.id) {
            toast("You are currently logged in as this user, so deletion is not permitted.", "error")
            return
        }
        await callApi({
            url: `/api/user/update/${user.id}`,
            method: 'DELETE'
        })
        toast("User Deleted Successfull!")
    };

    const userList = useMemo(() => {
        return data?.users || []
    }, [data])

    if (loading) return <div>Loading...</div>

    return (
        <>
            <CommonTable
                data={userList}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchKeys={["first_name", "last_name", "email"]}
            />
            {selectedUser && (
                <EditUserPopup
                    isOpen={isEditOpen}
                    onClose={handleClose}
                    user={selectedUser}
                    refetch={refetch}
                />
            )}
        </>
    )
});

export default UserManagement;
