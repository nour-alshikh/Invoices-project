import UsersTable from "../components/tables/UsersTable"
import BasicBreadcrumbs from "../components/mui/BasicBreadcrumbs"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import WithGuard from "../utils/WithGuard";




const Users = () => {
    const [users, setUsers] = useState([])

    const { token } = useSelector((state) => state.user)
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        await axios.get(`http://127.0.0.1:8000/api/users`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({ data }) => {
            setUsers(data.users)
        })
    }
    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Users" page="Users List" />
            <div className="p-5">
                <UsersTable users={users}
                />
            </div>
        </div>
    )
}

export default WithGuard(Users)