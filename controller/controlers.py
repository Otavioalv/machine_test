from model.models import MachineModel
from flask import jsonify

class MachineControler:
    def __init__(self):
        self.machine_model = MachineModel()

    def list_machines(self, status):
        try:
            if status and status not in ["ligada", "desligada", "em alarme"]:
                return jsonify({
                    "list_machines": [],
                    "message": "Utilize credenciais do stautus valida: (ligada, desligada, em alarme)"
                }), 400
            
            list_machines = self.machine_model.get_list_machines(status)
            
            return jsonify({
                "list_machines": list_machines,
                "message": "Maquina(s) listada(s) com sucesso"
            }), 200
        except Exception as e:
            print(e)
            
            return jsonify({
                "list_machines": [],
                "message": "Erro interno no servidor"
            }), 500
            
            
    def create_new_machine(self, data_machine):
        try:
            
            if not all(data_machine.get(k) for k in ["nome", "tipo", "status"]):
                return jsonify({
                    "message": "Dados incompletos ou invalidos"
                }), 400
            
            
            if data_machine["status"] not in ["ligada", "desligada", "em alarme"]:
                return jsonify({
                    "message": "Utilize credenciais do stautus valida: (ligada, desligada, em alarme)"
                }), 400
            
            
            self.machine_model.insert_new_machine(data_machine)
            
            return jsonify({
                "message": "Maquina adicionada com sucesso"
            }), 200
        except Exception as e:
            print(e)
            
            return jsonify({
                "message": "Erro interno no servidor"
            }), 500
        
    
    def update_machine(self, id_machine, data_machine):
        try:
            if not id_machine:
                return jsonify({
                    "message": "Insira um identificador para atualizar a maquina"
                }), 400
                
            
            if data_machine["status"] not in ["ligada", "desligada", "em alarme"]:
                return jsonify({
                    "message": "Utilize credenciais do stautus valida: (ligada, desligada, em alarme)"
                }), 400
                
            data_machine["id"] = id_machine
            
            
            self.machine_model.update_machine_data(data_machine)
            
            return jsonify({
                "message": "Maquina atualizada com sucesso"
            }), 200
        except Exception as e:
            print(e)
            
            return jsonify({
                "message": "Erro interno no servidor"
            }), 500