# from config.psqlConnection import conn_pool
from config.mysqlConnection import conn_pool

class MachineModel:
    # def __init__(self):
    
    def get_list_machines(self, status):
        conn = conn_pool.get_connection()
        try:
            SQL_QR = "SELECT id, name, type_machine, status_machine, updated_at from machine_tb"
            params = ()
            
            if status:
                SQL_QR += " WHERE status_machine = %s"
                params = (status,)
            
            # fecha o cursor automaticamente
            with conn.cursor() as cur:
                cur.execute(SQL_QR, params)
                machines = cur.fetchall()
                
            result = []
            
            for m in machines:
                result.append({
                    "id": m[0],
                    "nome": m[1],
                    "tipo": m[2],
                    "status": m[3],
                    "ultima_alteração": m[4].replace(tzinfo=None).isoformat(timespec="seconds")
                })
            
            return result
        except Exception as e:
            print(f"Erro ao buscar máquinas: {e}")
            raise
        finally:
            conn.close()
         
    def insert_new_machine(self, data_machine):
        conn = conn_pool.get_connection()
        try:
            nome = data_machine["nome"]
            tipo = data_machine["tipo"]
            status = data_machine["status"]
            
            SQL_QR = """
                INSERT INTO machine_tb ( name, type_machine, status_machine) 
                VALUES (%s, %s, %s)"""
                
            # SQL_QR = """
            #     INSERT INTO machine_tb ( name, type_machine, status_machine, updated_at) 
            #     VALUES (%s, %s, %s, CURRENT_TIMESTAMP)"""
            
            params = (nome, tipo, status)
            
            with conn.cursor() as cur:
                cur.execute(SQL_QR, params)
                conn.commit()
                
        except Exception as e:
            print(f"Erro ao salvar dados: {e}")
            raise
        finally:
            conn.close()
            
    def update_machine_data(self, data_machine):
        conn = conn_pool.get_connection()
        
        try:
            status = data_machine["status"]
            id_machine = data_machine["id"]
            
            SQL_QR = """
                UPDATE machine_tb
                SET 
                    status_machine = %s
                WHERE id = %s"""
                
            
            params = (status, id_machine)
            
            with conn.cursor() as cur:
                cur.execute(SQL_QR, params)
                conn.commit()
                
        except Exception as e:
            print(f"Erro ao atualizar dados: {e}")
            raise
        finally:
            conn.close()
            