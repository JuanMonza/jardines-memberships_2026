-- Crear tabla de admins
CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'supervisor' CHECK (rol IN ('admin', 'supervisor')),
    codigo_2fa VARCHAR(6),
    codigo_2fa_expiry TIMESTAMP,
    codigo_2fa_verificado BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    ultimo_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT email_domain CHECK (email LIKE '%@jardinesdelrenacer.co' OR email LIKE '%@mivivemas.co')
);

-- Crear tabla de contratantes
CREATE TABLE IF NOT EXISTS contratantes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre_contratante VARCHAR(255) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    id_contrato VARCHAR(50) UNIQUE NOT NULL,
    id_persona VARCHAR(50) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    edad_actual INTEGER,
    fecha_nacimiento DATE,
    estado VARCHAR(50) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'suspendido', 'cancelado')),
    zona VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100),
    departamento VARCHAR(100),
    direccion TEXT,
    tipo_plan VARCHAR(100),
    fecha_afiliacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_pago TIMESTAMP,
    deuda DECIMAL(10, 2) DEFAULT 0,
    cargado_por UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_contratantes_cedula ON contratantes(cedula);
CREATE INDEX idx_contratantes_id_contrato ON contratantes(id_contrato);
CREATE INDEX idx_contratantes_estado ON contratantes(estado);
CREATE INDEX idx_contratantes_zona ON contratantes(zona);
CREATE INDEX idx_admins_email ON admins(email);

-- Crear tabla de logs de acceso (opcional, para auditoría)
CREATE TABLE IF NOT EXISTS logs_acceso (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID REFERENCES admins(id),
    tipo_accion VARCHAR(100),
    cedula_consultada VARCHAR(20),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
