import machineApi from "./machineApi";

export type StatusType = "ligada" | "desligada" | "em alarme";

export type machineType = {
    id: number, 
    nome: string, 
    status: StatusType,
    tipo: string
}

export type machineResponseType = {
    list_machines: machineType[],
    message: string
}

// Listar maquinas
export const listMachines = async (): Promise<machineType[]> => {
    try {
        const res = (await machineApi.get("/maquinas")).data as machineResponseType;

        return res.list_machines;
    } catch (e) {
        console.log("Erro ao listar >>> ", e);
        return []
    }
}

// Adiciona maquina
export const addMachine = async (nome: string, tipo: string, status: string) => {
    try {
        const setM = {
            nome: nome, 
            tipo: tipo, 
            status: status
        }

        await machineApi.post("/maquinas", setM);

        return "Maquina adiocionada com sucesso"
    } catch (e) {
        console.log("Erro ao adicionar maquina >>> ", e);
        return "Erro ao adicionar maquina"
    }
}

// Atualizar maquina
export const updateMachine = async (id: number, status: StatusType):Promise<string> => {
    try {
        await machineApi.put(`/maquinas/${id}`, {status: status});

        return `Maquina ${id} atualizada para STATUS: ${status}`
    } catch(e) {
        console.log("Erro ao atualizar >>> ", e)
        return "Erro ao atualizar"
    }
}