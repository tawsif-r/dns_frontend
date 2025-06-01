import { useState } from "react"
import apiClient from "../api/axiosInstance"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useNavigate } from "react-router-dom"

function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            // Only include email in payload for registration
            const payload = method === "login" 
                ? { username, password }
                : { username, email, password };

            const res = await apiClient.post(route, payload)
            console.log(`Payload: ${res.data}`)
            
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="border-2 border-gray-700 rounded-lg p-8 m-4 max-w-md w-full bg-gray-800">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">{name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white font-semibold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>

                    {/* Conditionally render email field only for registration */}
                    {method === "register" && (
                        <div className="mb-4">
                            <label className="block text-white font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-white font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button 
                        className="w-full p-3 bg-gray-600 text-white font-semibold rounded-md border-2 border-gray-500 hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : name}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form;