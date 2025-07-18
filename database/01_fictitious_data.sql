USE flsk_machine_db;

CREATE TABLE machine_tb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    type_machine TEXT NOT NULL,
    status_machine ENUM('ligada', 'desligada', 'em alarme') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO machine_tb (name, type_machine, status_machine) VALUES
    ('Maquina A', 'compressor', 'ligada'),
    ('Maquina B', 'motor', 'desligada'),
    ('Maquina C', 'esteira', 'em alarme'),
    ('Maquina D', 'compressor', 'ligada'),
    ('Maquina E', 'motor', 'desligada');
