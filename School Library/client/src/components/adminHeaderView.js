import React, {Fragment} from 'react'

function AdminHeaderView() {
    return (
        <Fragment>
            <li className="has-sub"><a href="/admin/get/user/books"><span>Find user</span></a></li>
            <li className="has-sub"><a href="/book/create">Create New Book</a></li>
            <li className="has-sub"><a href="/admin/takenBooks">Taken books</a></li>
            <li className="has-sub"><a href="/admin/expiredBooks">Expired books</a></li>
            <li className="has-sub"><a href="/admin/notifyUser">Notify user</a></li>
            <li className="has-sub"><a href="/admin/users">Users</a></li>
        </Fragment>
    )
}

export default AdminHeaderView