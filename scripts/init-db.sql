-- Database initialization script for AI Multimodal Medical Assistant
-- This script sets up the initial database schema and extensions

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'clinician', 'triage', 'reader');
CREATE TYPE encounter_status AS ENUM ('scheduled', 'in-progress', 'completed', 'cancelled');
CREATE TYPE patient_status AS ENUM ('active', 'inactive', 'deceased', 'transferred');
CREATE TYPE priority_level AS ENUM ('low', 'normal', 'high', 'urgent', 'critical');

-- Create audit log table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'reader',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create patients table
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mrn VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    status patient_status DEFAULT 'active',
    contact_info JSONB,
    address JSONB,
    emergency_contact JSONB,
    insurance_info JSONB,
    medical_history JSONB,
    allergies JSONB,
    medications JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create encounters table
CREATE TABLE encounters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    provider_id UUID REFERENCES users(id),
    encounter_type VARCHAR(50) NOT NULL,
    status encounter_status DEFAULT 'scheduled',
    scheduled_date TIMESTAMP WITH TIME ZONE,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    chief_complaint TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medical documents table
CREATE TABLE medical_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    encounter_id UUID REFERENCES encounters(id),
    document_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    file_path VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create observations table (vitals, labs, etc.)
CREATE TABLE observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    encounter_id UUID REFERENCES encounters(id),
    observation_type VARCHAR(50) NOT NULL,
    code VARCHAR(50),
    value_numeric DECIMAL(10,2),
    value_string TEXT,
    value_boolean BOOLEAN,
    unit VARCHAR(20),
    reference_range JSONB,
    status VARCHAR(20),
    effective_date TIMESTAMP WITH TIME ZONE,
    issued_date TIMESTAMP WITH TIME ZONE,
    performer_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medications table
CREATE TABLE medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    encounter_id UUID REFERENCES encounters(id),
    medication_name VARCHAR(255) NOT NULL,
    rxnorm_code VARCHAR(50),
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    route VARCHAR(50),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20),
    prescribed_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create imaging studies table
CREATE TABLE imaging_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    encounter_id UUID REFERENCES encounters(id),
    study_type VARCHAR(100) NOT NULL,
    modality VARCHAR(20),
    body_part VARCHAR(100),
    study_date DATE,
    report_status VARCHAR(20),
    report_text TEXT,
    dicom_series JSONB,
    storage_path VARCHAR(500),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AI analysis table
CREATE TABLE ai_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    encounter_id UUID REFERENCES encounters(id),
    analysis_type VARCHAR(50) NOT NULL,
    model_name VARCHAR(100),
    input_data JSONB,
    output_data JSONB,
    confidence_score DECIMAL(3,2),
    status VARCHAR(20),
    processing_time_ms INTEGER,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consent records table
CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    consent_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    granted_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    scope JSONB,
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_patients_mrn ON patients(mrn);
CREATE INDEX idx_patients_name ON patients(last_name, first_name);
CREATE INDEX idx_encounters_patient_id ON encounters(patient_id);
CREATE INDEX idx_encounters_provider_id ON encounters(provider_id);
CREATE INDEX idx_encounters_status ON encounters(status);
CREATE INDEX idx_encounters_date ON encounters(scheduled_date);
CREATE INDEX idx_observations_patient_id ON observations(patient_id);
CREATE INDEX idx_observations_type ON observations(observation_type);
CREATE INDEX idx_medications_patient_id ON medications(patient_id);
CREATE INDEX idx_imaging_patient_id ON imaging_studies(patient_id);
CREATE INDEX idx_ai_analyses_patient_id ON ai_analyses(patient_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create full-text search indexes
CREATE INDEX idx_patients_search ON patients USING gin(to_tsvector('english', first_name || ' ' || last_name));
CREATE INDEX idx_encounters_search ON encounters USING gin(to_tsvector('english', chief_complaint || ' ' || diagnosis || ' ' || notes));
CREATE INDEX idx_medical_documents_search ON medical_documents USING gin(to_tsvector('english', title || ' ' || content));

-- Create vector indexes for AI embeddings
CREATE INDEX idx_medical_documents_embedding ON medical_documents USING ivfflat (metadata->>'embedding' vector_cosine_ops) WITH (lists = 100);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_encounters_updated_at BEFORE UPDATE ON encounters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_imaging_studies_updated_at BEFORE UPDATE ON imaging_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consent_records_updated_at BEFORE UPDATE ON consent_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123 - change in production!)
INSERT INTO users (email, hashed_password, first_name, last_name, role) 
VALUES ('admin@medical-assistant.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i', 'Admin', 'User', 'admin');

-- Create views for common queries
CREATE VIEW patient_summary AS
SELECT 
    p.id,
    p.mrn,
    p.first_name,
    p.last_name,
    p.date_of_birth,
    p.gender,
    p.status,
    COUNT(e.id) as encounter_count,
    MAX(e.scheduled_date) as last_encounter_date
FROM patients p
LEFT JOIN encounters e ON p.id = e.patient_id
GROUP BY p.id, p.mrn, p.first_name, p.last_name, p.date_of_birth, p.gender, p.status;

-- Grant permissions (adjust as needed for your security requirements)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
