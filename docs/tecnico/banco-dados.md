# Banco de Dados

## Modelagem do Banco de Dados

O Gestão DriverPro utiliza PostgreSQL como banco de dados principal, com uma estrutura otimizada para performance e escalabilidade.

## Estrutura das Tabelas

### users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### vehicles
```sql
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plate VARCHAR(10) NOT NULL,
    brand VARCHAR(50),
    model VARCHAR(50),
    year INTEGER
);
```

### transactions
```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### goals
```sql
CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    target_amount DECIMAL(10,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    achieved BOOLEAN DEFAULT FALSE
);
```

## Índices e Performance

### Índices Principais
- users_email_idx
- transactions_user_id_date_idx
- goals_user_id_dates_idx

## Backup e Recuperação

### Estratégia de Backup
- Backup completo diário
- Backup incremental a cada 6 horas
- Retenção de 30 dias

### Recuperação
- RTO (Recovery Time Objective): 1 hora
- RPO (Recovery Point Objective): 6 horas