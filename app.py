from flask import Flask, jsonify, request
from flask_cors import CORS
from controller.controlers import MachineControler

app = Flask(__name__)
CORS(app, origins=["*"])

# Rota para testar se a api subiu
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"})


# Lista maquinas
@app.route("/maquinas", methods=["GET"])
def list_machines_rt():
    status = request.args.get("status")
    machine_controler = MachineControler()
    result = machine_controler.list_machines(status)
    return result
    
# Adiciona maquina
@app.route("/maquinas", methods=["POST"])
def set_new_machine_rt():
    json_data_user = request.get_json()
    machine_controler = MachineControler()
    result = machine_controler.create_new_machine(json_data_user)    
    return result

# Atualiza status da maquina
@app.route("/maquinas/<int:id_machine>", methods=["PUT"])
def update_machine_rt(id_machine):
    json_data_user = request.get_json()
    machine_controler = MachineControler()
    result = machine_controler.update_machine(id_machine, json_data_user)
    return result
    

if __name__ == "__main__":
   app.run(host="0.0.0.0", debug=True)
