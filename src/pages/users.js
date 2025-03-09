import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const getLevelName = (level) => {
        switch (level) {
            case 1: return 'Admin';
            case 2: return 'Takmir';
            case 3: return 'Jamaah';
            default: return 'Tidak Diketahui';
        }
    };

    return (
        <div>
            <h2>Daftar Users</h2>
            <table border="1" width="50%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id_user}>
                            <td>{user.id_user}</td>
                            <td>{user.nama}</td>
                            <td>{user.email}</td>
                            <td>{getLevelName(user.level)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
