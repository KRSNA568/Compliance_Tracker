INSERT INTO clients (id, company_name, country, entity_type)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Mehta Textiles Pvt Ltd', 'India', 'Private Limited Company'),
  ('22222222-2222-2222-2222-222222222222', 'Arora & Sons LLP', 'India', 'Limited Liability Partnership'),
  ('33333333-3333-3333-3333-333333333333', 'Kapoor Pharma Pvt Ltd', 'India', 'Private Limited Company'),
  ('44444444-4444-4444-4444-444444444444', 'Nair Logistics Ltd', 'India', 'Public Limited Company'),
  ('55555555-5555-5555-5555-555555555555', 'Bansal Consulting', 'India', 'Sole Proprietorship')
ON CONFLICT (id) DO NOTHING;

INSERT INTO compliance_tasks (id, client_id, title, category, due_date, status, priority, description)
VALUES
  ('aaaaaaaa-0001-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Q3 GST Return Filing', 'GST Return', '2026-01-10', 'Pending', 'High', 'Quarterly GST return filing for Q3.'),
  ('aaaaaaaa-0002-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'TDS Payment — February', 'Tax Filing', '2026-01-31', 'Pending', 'High', 'Monthly TDS payment compliance.'),
  ('aaaaaaaa-0003-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Annual ROC Filing FY25', 'ROC Filing', '2026-04-30', 'In Progress', 'Medium', 'Annual ROC filing activity for FY25.'),
  ('aaaaaaaa-0004-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'PT Compliance Check', 'Other', '2026-05-15', 'Pending', 'Low', 'Professional tax compliance review.'),

  ('bbbbbbbb-0005-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'Q3 Advance Tax Payment', 'Tax Filing', '2025-12-15', 'Pending', 'High', 'Advance tax installment for Q3.'),
  ('bbbbbbbb-0006-0000-0000-000000000006', '22222222-2222-2222-2222-222222222222', 'LLP Annual Return Form 11', 'ROC Filing', '2026-05-30', 'Pending', 'Medium', 'Mandatory LLP return filing.'),
  ('bbbbbbbb-0007-0000-0000-000000000007', '22222222-2222-2222-2222-222222222222', 'GST Reconciliation GSTR-2B', 'GST Return', '2026-04-20', 'In Progress', 'High', 'Reconciliation against GSTR-2B data.'),
  ('bbbbbbbb-0008-0000-0000-000000000008', '22222222-2222-2222-2222-222222222222', 'Statutory Audit Completion', 'Audit', '2026-06-30', 'Pending', 'Medium', 'Close statutory audit requirements.'),

  ('cccccccc-0009-0000-0000-000000000009', '33333333-3333-3333-3333-333333333333', 'GSTR-9 Annual Return', 'GST Return', '2025-12-31', 'Pending', 'High', 'Annual GST return submission.'),
  ('cccccccc-0010-0000-0000-000000000010', '33333333-3333-3333-3333-333333333333', 'Form MGT-7 — Annual Return', 'ROC Filing', '2026-01-28', 'Pending', 'High', 'Annual return filing under Companies Act.'),
  ('cccccccc-0011-0000-0000-000000000011', '33333333-3333-3333-3333-333333333333', 'Drug Licence Renewal', 'Other', '2026-06-01', 'Pending', 'Medium', 'Renewal submission and documentation.'),
  ('cccccccc-0012-0000-0000-000000000012', '33333333-3333-3333-3333-333333333333', 'Transfer Pricing Study', 'Audit', '2026-07-31', 'Pending', 'Low', 'Prepare transfer pricing support study.'),

  ('dddddddd-0013-0000-0000-000000000013', '44444444-4444-4444-4444-444444444444', 'Q3 TDS Return — Form 26Q', 'Tax Filing', '2026-01-31', 'In Progress', 'High', 'Quarterly TDS return in Form 26Q.'),
  ('dddddddd-0014-0000-0000-000000000014', '44444444-4444-4444-4444-444444444444', 'ESIC Monthly Contribution', 'Tax Filing', '2026-03-21', 'Pending', 'Medium', 'Monthly ESIC compliance payment.'),
  ('dddddddd-0015-0000-0000-000000000015', '44444444-4444-4444-4444-444444444444', 'GST Input Tax Credit Audit', 'GST Return', '2026-04-15', 'Pending', 'High', 'Internal ITC audit and checks.'),
  ('dddddddd-0016-0000-0000-000000000016', '44444444-4444-4444-4444-444444444444', 'Board Resolution — Dividend', 'ROC Filing', '2026-05-01', 'Pending', 'Low', 'Board resolution documentation and filing.'),

  ('eeeeeeee-0017-0000-0000-000000000017', '55555555-5555-5555-5555-555555555555', 'ITR-3 Income Tax Return', 'Tax Filing', '2025-12-31', 'Pending', 'High', 'ITR-3 return preparation and filing.'),
  ('eeeeeeee-0018-0000-0000-000000000018', '55555555-5555-5555-5555-555555555555', 'GST Registration Renewal', 'GST Return', '2026-04-01', 'Pending', 'Medium', 'GST registration validity renewal.'),
  ('eeeeeeee-0019-0000-0000-000000000019', '55555555-5555-5555-5555-555555555555', 'Shop & Est. Licence Renewal', 'Other', '2026-05-31', 'In Progress', 'Low', 'Local shop and establishment renewal.'),
  ('eeeeeeee-0020-0000-0000-000000000020', '55555555-5555-5555-5555-555555555555', 'MSME Udyam Registration', 'Other', '2026-06-15', 'Pending', 'Low', 'Udyam registration update task.')
ON CONFLICT (id) DO NOTHING;
