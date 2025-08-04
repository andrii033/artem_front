import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'
import Users from './Users'
import Register from './Register'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
