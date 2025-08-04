import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('role',data.role)

            console.log(
                `User ${username} logged in successfully!`,
            )

            setError('')

            if (data.role === 'ADMIN') {
                navigate('/admin/users')
            } else if (data.role === 'USER') {
                navigate('/user') // или другой путь для обычных пользователей
            } else {
                navigate('/') // на всякий случай
            }

        } catch (err) {
            setError('Invalid username or password')
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
                />
                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    Login
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </div>
    )
}

export default Login
