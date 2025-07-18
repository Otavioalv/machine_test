import { useState } from "react";
import { addMachine, type StatusType } from "../../services/machineService";
import { Loading } from "../Loading/Loading";

import type {  SetStateAction, Dispatch } from "react"

export const FormMachine = ({setReloadList} : {setReloadList:Dispatch<SetStateAction<boolean>>}) => {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState<StatusType>("ligada");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        const resMsg = await addMachine(nome, tipo, status);

        setNome("");
        setTipo("");
        setStatus("ligada");
        alert(resMsg);
        setReloadList(true);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading/>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-slate-800 rounded-md w-full max-w-md mx-auto">
                <h2 className="text-xl text-white font-bold">Adicionar máquina</h2>

                <input
                    className="p-2 py-4 rounded-sm outline-none border-l-7 border-pink-600 border-1 bg-slate-700"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <input
                    className="p-2 py-4 rounded-sm outline-none border-l-7 border-pink-600 border-1 bg-slate-700"
                    placeholder="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                />

                <div className="flex flex-col gap-2 text-white">
                <p>Status:</p>
                
                <label className="flex gap-2 items-center">
                    <input
                        type="radio"
                        name="status"
                        value="ligada"
                        checked={status === "ligada"}
                        onChange={() => setStatus("ligada")}
                    /> 
                    Ligada
                </label>

                <label className="flex gap-2 items-center">
                    <input
                        type="radio"
                        name="status"
                        value="desligada"
                        checked={status === "desligada"}
                        onChange={() => setStatus("desligada")}
                    /> 
                    Desligada
                </label>
                <label className="flex gap-2 items-center">
                    <input
                        type="radio"
                        name="status"
                        value="em alarme"
                        checked={status === "em alarme"}
                        onChange={() => setStatus("em alarme")}
                    /> 
                    Em Alarme
                </label>
                </div>

                <button
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded-sm hover:bg-green-700 transition-all cursor-pointer"
                >
                    ADICIONAR
                </button>
            </form>
        </>
    );
};
