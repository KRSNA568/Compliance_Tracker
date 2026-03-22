CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  country TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS compliance_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(trim(title)) > 0 AND char_length(title) <= 150),
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Tax Filing', 'GST Return', 'ROC Filing', 'Audit', 'Other')),
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_compliance_tasks_client_id ON compliance_tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_compliance_tasks_due_date ON compliance_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_clients_company_name ON clients(company_name);
