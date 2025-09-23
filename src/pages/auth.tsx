import { useState, useEffect } from "react";
import type { ChangeEvent } from "react"; 
import axios from "axios";

interface CadastroState {
  sNomeUsuario: string;
  sEmail: string;
  sSenha: string;
  nCodigoEmpresa: number;
}

interface LoginState {
  sNomeUsuario: string;
  sSenha: string;
  nCodigoEmpresa: number;
}

interface CboEmpresaState {
  nome_fantasia: string;
  razao_social: string;
  codigo: number;
}

export default function Auth() {
  const [tabAtual, setTabAtual] = useState<"login" | "cadastro">("login");

  const [registerForm, setRegisterForm] = useState<CadastroState>({
    sNomeUsuario: "",
    sEmail: "",
    sSenha: "",
    nCodigoEmpresa: 0,
  });

  const [loginForm, setLoginForm] = useState<LoginState>({
    sNomeUsuario: "",
    sSenha: "",
    nCodigoEmpresa: 0,
  });

  const [cboEmpresaValues, setCboEmpresaValues] = useState<CboEmpresaState[]>([]);

  function trocarTab() {
    setTabAtual((prev) => (prev === "login" ? "cadastro" : "login"));
  }

  async function loadComboEmpresa() {
    try {
      const response = await axios.get<CboEmpresaState[]>(
        `${import.meta.env.VITE_DEFAULT_API_LINK}/loginsignup/combo/empresas`
      );

      // garante que sempre é array
      if (Array.isArray(response.data)) {
        setCboEmpresaValues(response.data);
      } else {
        setCboEmpresaValues([]);
        console.error("Resposta inesperada para combo empresas:", response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar empresas:", error);
      setCboEmpresaValues([]); // evita erro no .map()
    }
  }

  function btnLogarClick() {
    axios
      .post(`${import.meta.env.VITE_DEFAULT_API_LINK}/loginsignup/login`, loginForm)
      .then((response) => {
        localStorage.setItem("jwtToken", response.data.token);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
        alert("Login falhou: " + (error.response?.data?.message || "Erro desconhecido"));
      });
  }

  function btnCadastroClick() {
    axios
      .post(
        `${import.meta.env.VITE_DEFAULT_API_LINK}/loginsignup/cadastrar`,
        registerForm
      )
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  // lifecycle
  useEffect(() => {
    loadComboEmpresa();
    setTabAtual("login");
  }, []);

  // handlers
  const handleRegisterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: name === "nCodigoEmpresa" ? Number(value) : value,
    }));
  };

  const handleLoginChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: name === "nCodigoEmpresa" ? Number(value) : value,
    }));
  };

  return (
    <main>
      <div className="min-h-screen bg-slate-100 py-2 sm:py-4 md:py-6 lg:py-8">
        <div className="flex justify-center pt-5">
          <h1 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800">
            Bem vindo ao CMMS
          </h1>
        </div>

        {/* Wrapper */}
        <div className="mx-4 sm:mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mt-8 mb-6">
          {/* Toggle Login/Cadastro */}
          <div className="flex bg-slate-200 border border-gray-300 rounded-t-lg shadow-lg">
            <button
              onClick={trocarTab}
              className={`flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-100 first:rounded-tl-lg last:rounded-tr-lg ${
                tabAtual === "login"
                  ? "bg-indigo-300 outline-indigo-600 outline-2"
                  : "border-b"
              }`}
            >
              Login
            </button>
            <button
              onClick={trocarTab}
              className={`flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-100 first:rounded-tl-lg last:rounded-tr-lg ${
                tabAtual === "cadastro"
                  ? "bg-indigo-300 outline-indigo-600 outline-2"
                  : "border-b"
              }`}
            >
              Cadastro
            </button>
          </div>

          {/* Cadastro */}
          {tabAtual === "cadastro" && (
            <div className="bg-slate-200 border border-t-0 border-gray-300 shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Usuário
                </label>
                <input
                  type="text"
                  name="sNomeUsuario"
                  value={registerForm.sNomeUsuario}
                  onChange={handleRegisterChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="sEmail"
                  value={registerForm.sEmail}
                  onChange={handleRegisterChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Empresa
                </label>
                <select
                  name="nCodigoEmpresa"
                  value={registerForm.nCodigoEmpresa}
                  onChange={handleRegisterChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50"
                >
                  <option value={0}>Selecione uma empresa</option>
                  {Array.isArray(cboEmpresaValues) &&
                    cboEmpresaValues.map((empresa) => (
                      <option key={empresa.codigo} value={empresa.codigo}>
                        {empresa.nome_fantasia}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  name="sSenha"
                  value={registerForm.sSenha}
                  onChange={handleRegisterChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50"
                />
              </div>
            </div>
          )}

          {/* Login */}
          {tabAtual === "login" && (
            <div className="bg-slate-200 border border-t-0 border-gray-300 shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Usuário
                </label>
                <input
                  type="text"
                  name="sNomeUsuario"
                  value={loginForm.sNomeUsuario}
                  onChange={handleLoginChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Empresa
                </label>
                <select
                  name="nCodigoEmpresa"
                  value={loginForm.nCodigoEmpresa}
                  onChange={handleLoginChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50"
                >
                  <option value={0}>Selecione uma empresa</option>
                  {Array.isArray(cboEmpresaValues) &&
                    cboEmpresaValues.map((empresa) => (
                      <option key={empresa.codigo} value={empresa.codigo}>
                        {empresa.nome_fantasia}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  name="sSenha"
                  value={loginForm.sSenha}
                  onChange={handleLoginChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50"
                />
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex bg-slate-200 border border-gray-300 rounded-b-lg shadow-lg">
            {tabAtual === "cadastro" && (
              <button
                type="button"
                onClick={btnCadastroClick}
                className="flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-300 hover:outline-indigo-600 hover:outline-2"
              >
                Cadastrar novo Usuário
              </button>
            )}
            {tabAtual === "login" && (
              <button
                type="button"
                onClick={btnLogarClick}
                className="flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-300 hover:outline-indigo-600 hover:outline-2"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
