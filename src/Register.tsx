import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('USER')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        try {
            const res = await fetch('http://localhost:8080/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ username, password,email, role })
            })

            if (!res.ok) {
                throw new Error('Registration failed')
            }

            alert('User registered successfully!')
            navigate('/admin/users') // redirect after successful registration
        } catch (err) {
            setError('Registration failed. Check your data or access rights.')
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
            <h2>Register New User</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: 10, width: '100%' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: 10, width: '100%' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: 10, width: '100%' }}
                    />
                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    style={{ display: 'block', marginBottom: 10, width: '100%' }}
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <button type="submit" style={{ width: '100%' }}>Register</button>
            </form>
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </div>
    )
}

export default Register
