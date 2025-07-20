import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/') // если токена нет — редирект на логин
        }
    }, [navigate])

    return (
        <div style={{ maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
            <h2>Welcome to the Admin Panel</h2>
            <p>You are successfully logged in 🎉</p>
        </div>
    )
}

export default Admin
