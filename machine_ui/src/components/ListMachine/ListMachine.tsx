import { useEffect, useState} from "react";
import { listMachines, updateMachine, type machineType, type StatusType } from "../../services/machineService"
import { Loading } from "../Loading/Loading";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

export const ListMachine = ({reloadList}: {reloadList: boolean}) => {
    const [machineList, setMachineList] = useState<machineType[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);

    const fetchListMachines = async() => {
        setIsLoading(true);
        const response = await listMachines();
        setMachineList(response);
    }

    const fetchStatusChange = async (id: number, status: StatusType) => {
        setIsLoading(true);
        setMachineList(prev =>
            prev.map(m => m.id === id ? { ...m, status } : m)
        );
        const resMsg: string = await updateMachine(id, status);

        alert(resMsg)
        setIsLoading(false);
    };


    const handleEditMachine = async(id: number) => {
        setEditId(editId === id ? null : id);
    }

    useEffect(() => {
        fetchListMachines();
        setIsLoading(false);
    }, [reloadList]);

    return (
        <div className="flex flex-col gap-4 z-10">
            {isLoading && <Loading/>}

            <h1 className="text-center text-2xl font-bold">Lista de Máquinas</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
                {machineList.map((m, i) => (
                <div
                    key={i}
                    className="bg-slate-700 border-l-4 border-pink-600 rounded-sm p-4 flex flex-col gap-1"
                >   
                    <button 
                        onClick={() => handleEditMachine(m.id)}
                        className="flex gap-1 items-center w-fit bg-blue-600 px-2 py-1 rounded-sm hover:bg-blue-700 cursor-pointer transition-all">
                        {editId === m.id ? (
                            <>
                                <p>CLOSE</p>
                                <IoMdCloseCircleOutline />
                            </>
                            ) : (
                            <>
                                <p>EDIT</p>
                                <MdModeEdit />
                            </>
                        )}    
                    </button>

                    {editId === m.id ? (
                        <div>
                            <p className="font-bold mb-2">Edite o status de: {m.nome}</p>

                            <div className="flex flex-col gap-2">
                                {["ligada", "desligada", "em alarme"].map((status) => (
                                    <label key={status} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={`status-${m.id}`}
                                            value={status}
                                            checked={m.status === status}
                                            onChange={(e) => fetchStatusChange(m.id, e.target.value as StatusType)}
                                        />
                                        
                                        <span className="capitalize text-white">{status}</span>
                                        
                                        <div className={`w-3 h-3 rounded-full ${status === "ligada" ? "bg-green-500" : status === "desligada" ? "bg-red-600" : "bg-yellow-300"}`}></div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <p>ID: {m.id}</p>
                            <p>NOME: {m.nome}</p>
                            
                            <div className="flex items-center gap-2">
                                <p>STATUS: {m.status} </p>
                                <div className={`w-3 h-3 rounded-full ${m.status === "ligada" ? "bg-green-500" : m.status === "desligada" ? "bg-red-600" : "bg-yellow-300"}`}></div>
                            </div>
                            <p>TIPO: {m.tipo}</p>
                            <p>{m.ultima_alteracao}</p>
                        </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    )
}