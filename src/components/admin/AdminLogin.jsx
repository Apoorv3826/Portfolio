import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", {
                username,
                password,
            });

            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin/dashboard");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#050810] text-white flex items-center justify-center px-6">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h1 className="text-xl flex justify-center font-bold uppercase tracking-[0.1em] text-[#6c63ff] mb-4">
                    Admin
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-2 py-2">
                        <input
                            type="text"
                            className="border rounded border-slate-400 focus:border-slate-300 focus:outline-none w-3/4 px-2 py-1 my-2"
                            placeholder="Enter admin username"
                            value={username}
                            onChange={(e) => SetUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            className="border rounded border-slate-400 focus:border-slate-300 focus:outline-none w-3/4 px-2 py-1 my-2"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="bg-[#6c63ff] py-1 px-4 rounded-md font-semibold mt-2 hover:bg-[#5b52ff] transition-colors cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
