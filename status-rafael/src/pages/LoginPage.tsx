import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import { Lock } from "lucide-react";

import { Header } from "../components/Header";
import { authService } from "../services/auth.service.js";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (authService.login(email, password)) {
      navigate("/admin");
    } else {
      setError("Email o contraseña incorrectos");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="surface-card p-10 border-2 border-blue-200 shadow-xl shadow-blue-900/10">
            <div className="text-center mb-8">
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-600/50">
                <Lock size={32} />
              </div>
              <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent">Acceso administrativo</h2>
              <p className="mt-3 text-sm text-gray-600">Ingresa para revisar el estado de servicios y eventos hospitalarios en tiempo real.</p>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-3xl mb-6 text-sm font-medium shadow-md">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300/30 disabled:opacity-50"
                  placeholder="admin@sanrafael.gov.co"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300/30 disabled:opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 transition shadow-lg shadow-blue-600/40 hover:shadow-blue-600/60 disabled:shadow-none"
              >
                {isLoading ? "⏳ Iniciando..." : "✓ Iniciar sesión"}
              </button>
            </form>

            <div className="mt-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-sm text-gray-700 shadow-md">
              <p className="font-bold text-blue-900 mb-3">🔑 Credenciales de demostración</p>
              <p className="font-mono text-xs text-gray-600 bg-white rounded-lg px-3 py-2 mb-2">usuario: admin@sanrafael.gov.co</p>
              <p className="font-mono text-xs text-gray-600 bg-white rounded-lg px-3 py-2">clave: SanRafael2026*</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
