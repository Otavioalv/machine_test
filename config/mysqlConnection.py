from mysql.connector import pooling, Error, connect


def create_database_and_tables():
    try:
        # conexão sem database para criar o banco se não existir
        with connect(
            host="mysql",
            user="root",
            password="123456",
        ) as conn:
            conn.autocommit = True
            with conn.cursor() as cursor:
                cursor.execute("CREATE DATABASE IF NOT EXISTS flsk_machine_db")
                cursor.execute("USE flsk_machine_db")

                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS machine_tb (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name TEXT NOT NULL,
                        type_machine TEXT NOT NULL,
                        status_machine ENUM('ligada', 'desligada', 'em alarme') NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                """)

                cursor.execute("SELECT COUNT(*) FROM machine_tb")
                count = cursor.fetchone()[0]

                if count == 0:
                    cursor.execute("""
                        INSERT INTO machine_tb (name, type_machine, status_machine) VALUES
                        ('Máquina A', 'compressor', 'ligada'),
                        ('Máquina B', 'motor', 'desligada'),
                        ('Máquina C', 'esteira', 'em alarme'),
                        ('Máquina D', 'compressor', 'ligada'),
                        ('Máquina E', 'motor', 'desligada')
                    """)
                    print("Dados iniciais inseridos.")
                else:
                    print("Dados já existem, pulando inserção.")
    except Error as e:
        print(f"Erro ao criar banco/tabela/dados: {e}")

# Executa a criação inicial antes de criar o pool
create_database_and_tables()


try: 
    conn_pool = pooling.MySQLConnectionPool(
        pool_reset_session=True,
        user="root",
        port= 3306,
        host= "mysql",
        database= "flsk_machine_db",
        password= "123456"
    )
    
    if not conn_pool:
        raise Error("Conexão com o banco de dados não foi inicializado corretamente")
    
    
    print("Conexão criada com sucesso")
except Error as e:
    print("Erro ao conectar ao bando de dados: ", e)
    conn_pool = None