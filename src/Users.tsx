import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface UserDto {
    id: number
    username: string
    email?: string | null
    role: string
}

const Users = () => {
    const [users, setUsers] = useState<UserDto[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token')

        fetch('http://localhost:8080/admin/users', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized')
                return res.json()
            })
            .then(data => setUsers(data))
            .catch(err => console.error('Error:', err))
    }, [])

    return (
        <div style={{ padding: '1rem' }}>
            <h2>All Users</h2>
            <Link to="/admin/register" style={{ display: 'inline-block', marginBottom: '1rem', color: 'blue' }}>
                + Create New User
            </Link>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>ID</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Username</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Email</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u.id}>
                        <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.id}</td>
                        <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.username}</td>
                        <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.email || '—'}</td>
                        <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
