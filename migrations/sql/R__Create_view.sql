DROP TABLE IF EXISTS expense_details_view;

CREATE OR REPLACE VIEW expense_details_view
AS
SELECT ed.id,
       ed.file_record_id,
       rf.file_num AS record_file_name,
       cn.record_client_name,
       ed.status,
       ed.expense_value,
       ed.expenses_id
FROM expenses_detail ed
         INNER JOIN record_file rf ON ed.file_record_id = rf.id
         INNER JOIN(SELECT rfd.file_record_id,
                           CONCAT(cl.name, ' ', IFNULL(cl.last_name, '')) record_client_name
                 FROM record_file_details rfd
                     INNER JOIN clients cl ON rfd.entity_id = cl.id AND rfd.entity_type = 1) cn
             ON ed.file_record_id = cn.file_record_id;

DROP TABLE IF EXISTS clients_view;

CREATE OR REPLACE VIEW clients_view
AS
SELECT
    cl.id, sc.name as client_type, cl.name, (IF(cl.client_type = 2, IFNULL(cl.last_name, ''), '')) as last_name,
    cl.nit, IFNULL(cl.acronym, '') as acronym, cl.status,
    CONCAT(UPPER(us1.username), ' ', cl.created_at) as created,
    IF(cl.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', cl.updated_at)) as modified
FROM clients cl
  LEFT JOIN users us1 ON cl.created_by = us1.id
  LEFT JOIN users us2 ON cl.updated_by = us2.id
  LEFT JOIN shared_catalog sc ON cl.client_type = sc.id AND sc.type = 1 AND sc.status = 'ACTIVO';

DROP TABLE IF EXISTS  employees_view;

CREATE OR REPLACE VIEW employees_view
AS
SELECT em.id, CONCAT(em.name, ' ', em.last_name) as name, IFNULL(em.nit, '') as nit, IFNULL(em.igss, '') as igss, em.status,
  CONCAT(UPPER(us1.username), ' ', em.created_at) as created,
  CASE WHEN em.updated_by IS NULL THEN '' ELSE CONCAT(UPPER(us2.username), ' ', em.updated_at) END as modified
FROM employees em
  LEFT JOIN users us1 ON em.created_by = us1.id
  LEFT JOIN users us2 ON em.updated_by = us2.id;

DROP TABLE IF EXISTS  record_file_view;

CREATE OR REPLACE VIEW record_file_view
AS
SELECT rec.id, sc.name as type, rec.file_num, rec.status, DATE_FORMAT(rec.opening_date, "%d/%m/%Y") as opening_date,
  CONCAT(UPPER(us1.username), ' ', rec.created_at) as created,
  IF(rec.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', rec.updated_at)) as modified,
  cl.client_name, rec.subject
FROM record_file rec
  INNER JOIN record_type sc ON rec.type = sc.id
  INNER JOIN users us1 ON rec.created_by = us1.id
  LEFT JOIN users us2 ON rec.updated_by = us2.id
  LEFT JOIN (SELECT rfd.file_record_id, CAST(GROUP_CONCAT(RTRIM(CONCAT(cl.name, ' ', IFNULL(cl.last_name, '')))) AS CHAR(255)) as client_name
            FROM record_file_details rfd
                     INNER JOIN clients cl ON rfd.entity_id = cl.id AND rfd.entity_type = 1 group by rfd.file_record_id) cl
    ON rec.id = cl.file_record_id;

DROP TABLE IF EXISTS  activities_view;

CREATE OR REPLACE VIEW activities_view
AS
SELECT act.id, act.name, act.status,
  CONCAT(UPPER(us1.username), ' ', act.created_at) as created,
  CASE WHEN act.updated_by IS NULL THEN '' ELSE CONCAT(UPPER(us2.username), ' ', act.updated_at) END as modified
FROM activities act
  LEFT JOIN users us1 ON act.created_by = us1.id
  LEFT JOIN users us2 ON act.updated_by = us2.id;

DROP TABLE IF EXISTS  institutions_view;

CREATE OR REPLACE VIEW institutions_view
AS
SELECT ins.id, ins.name, ins.status, ins.short_name,
  CONCAT(UPPER(us1.username), ' ', ins.created_at) as created,
  CASE WHEN ins.updated_by IS NULL THEN '' ELSE CONCAT(UPPER(us2.username), ' ', ins.updated_at) END as modified
FROM institutions ins
  LEFT JOIN users us1 ON ins.created_by = us1.id
  LEFT JOIN users us2 ON ins.updated_by = us2.id;

DROP TABLE IF EXISTS  concepts_view;

CREATE OR REPLACE VIEW concepts_view
AS
SELECT con.id, con.code, con.name, con.status, con.type,
       CONCAT(UPPER(us1.username), ' ', con.created_at) as created,
       IF(con.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', con.updated_at)) as modified
FROM concepts con
         LEFT JOIN users us1 ON con.created_by = us1.id
         LEFT JOIN users us2 ON con.updated_by = us2.id;

DROP TABLE IF EXISTS  providers_view;

CREATE OR REPLACE VIEW providers_view
AS
SELECT pro.id, pro.code, pro.name, pro.status,
       CONCAT(UPPER(us1.username), ' ', pro.created_at) as created,
       IF(pro.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', pro.updated_at)) as modified
FROM providers pro
         LEFT JOIN users us1 ON pro.created_by = us1.id
         LEFT JOIN users us2 ON pro.updated_by = us2.id;

DROP TABLE IF EXISTS  file_manager_view;

CREATE OR REPLACE VIEW file_manager_view
AS
SELECT fmg.id, fmg.file_name, fmg.file_type, fmg.file_size, fmg.status,
  UPPER(us1.username) as file_owner, DATE_FORMAT(fmg.created_at, "%M %e, %Y") as modified,
  fmg.entity_id, fmg.entity_type
FROM file_manager fmg
  LEFT JOIN users us1 ON fmg.created_by = us1.id;

DROP TABLE IF EXISTS  case_activity_view;

CREATE OR REPLACE VIEW case_activity_view
AS
SELECT ca.id, ca.activity_name, ins.name as institution_name, ca.comment,
  ca.assign_date, 
  ca.activity_time, ca.status, ca.file_record_id, CONCAT(emp.name, ' ', emp.last_name) as employee_name, ca.employee_id,
  CONCAT(UPPER(us1.username), ' ', ca.created_at) as created,
  CASE WHEN ca.updated_by IS NULL THEN '' ELSE CONCAT(UPPER(us2.username), ' ', ca.updated_at) END as modified,
  rf.file_num, rf.priority, ca.proctor_agenda_id, ca.activity_cost, ca.currency_type, ca.activity_id, ca.institution_id,
  ca.check_number, ca.check_amount, emp.position, ca.activity_start_date, ca.activity_end_date, ca.case_activity_type
FROM case_activity ca
  LEFT JOIN institutions ins ON ca.institution_id = ins.id
  LEFT JOIN users us1 ON ca.created_by = us1.id
  LEFT JOIN users us2 ON ca.updated_by = us2.id
  LEFT JOIN employees emp ON ca.employee_id = emp.id
  LEFT JOIN record_file rf ON ca.file_record_id = rf.id;

DROP TABLE IF EXISTS status_history_view;

CREATE OR REPLACE VIEW status_history_view
AS
SELECT sh.id, sh.entity_id, sh.entity_type, sh.comment, sh.prev_status, sh.next_status,
  CONCAT(UPPER(us1.username), ' ', sh.created_at) as created
FROM status_history sh
  LEFT JOIN users us1 ON sh.created_by = us1.id;

DROP TABLE IF EXISTS  proctor_agenda_view;

CREATE OR REPLACE VIEW proctor_agenda_view
AS
SELECT pa.id, pa.comment, 
  pa.assign_date, 
  pa.status, CONCAT(emp.name, ' ', emp.last_name) as employee_name, pa.employee_id,
  CONCAT(UPPER(us1.username), ' ', pa.created_at) as created,
  CASE WHEN pa.updated_by IS NULL THEN '' ELSE CONCAT(UPPER(us2.username), ' ', pa.updated_at) END as modified,
  pa.proctor_agenda_cost_local, pa.proctor_agenda_cost_outer, 
  pa.agenda_return_amount_local, pa.agenda_return_amount_outer 
FROM proctor_agenda pa
  LEFT JOIN users us1 ON pa.created_by = us1.id
  LEFT JOIN users us2 ON pa.updated_by = us2.id
  LEFT JOIN employees emp ON pa.employee_id = emp.id;

DROP FUNCTION IF EXISTS getClientsName;
CREATE FUNCTION getClientsName (file_record_id BIGINT)
  RETURNS VARCHAR(100) DETERMINISTIC
     RETURN (SELECT GROUP_CONCAT(RTRIM(CONCAT(cl.name, ' ', IFNULL(cl.last_name, ''))))
		FROM record_file_details rfd
		INNER JOIN clients cl ON rfd.entity_id = cl.id AND rfd.entity_type = 1
		WHERE rfd.file_record_id = file_record_id);

DROP TABLE IF EXISTS  proctor_agenda_detail_view;

CREATE OR REPLACE VIEW proctor_agenda_detail_view
AS
SELECT ca.id, ca.activity_name, ins.name as institution_name, ca.assign_date,
  CONCAT(emp.name, ' ', emp.last_name) as employee_name, ca.employee_id,
  rf.file_num, rf.priority, ca.proctor_agenda_id,
  pad.status, pad.id as proctor_detail_id, pad.activity_cost, pad.currency_type, 
  ca.comment, getClientsName(rf.id) as client_name,
  ca.check_number, ca.check_amount
FROM case_activity ca
  LEFT JOIN institutions ins ON ca.institution_id = ins.id
  LEFT JOIN employees emp ON ca.employee_id = emp.id
  LEFT JOIN record_file rf ON ca.file_record_id = rf.id
  LEFT JOIN proctor_agenda_detail pad ON ca.id = pad.case_activity_id 
	AND ca.proctor_agenda_id = pad.proctor_agenda_id;

DROP TABLE IF EXISTS  stamp_duty_view;

CREATE OR REPLACE VIEW stamp_duty_view
AS
SELECT sd.id, sc1.name as stamp_type_name, sc2.name as designation_type_name, sd.year, sd.total_stamp_number
FROM stamp_duty sd
  LEFT JOIN shared_catalog sc1 ON sd.stamp_type = sc1.id AND sc1.type = 5 AND sc1.status = 'ACTIVO'
  LEFT JOIN shared_catalog sc2 ON sd.designation_type = sc2.id AND sc2.type = 6 AND sc2.status = 'ACTIVO';

DROP TABLE IF EXISTS  stamp_inventory_view;

CREATE OR REPLACE VIEW stamp_inventory_view
AS
SELECT inv.id, sc.name as inventory_type_name, DATE_FORMAT(inv.request_date, "%d/%m/%Y") as request_date, inv.request_date as request_date_original,
  CONCAT(emp.name, ' ', emp.last_name) as requester_name, rf.file_num, inv.total,
  CONCAT(UPPER(us1.username), ' ', inv.created_at) as created, inv.inventory_type, inv.status, rf.id as file_record_id,
  inv.request_type, inv.requester_id, inv.reference, inv.receipt_number
FROM stamp_inventory inv
  LEFT JOIN shared_catalog sc ON inv.request_type = sc.id
  LEFT JOIN employees emp ON inv.requester_id = emp.id
  LEFT JOIN record_file rf ON inv.file_record_id = rf.id
  LEFT JOIN users us1 ON inv.created_by = us1.id;

DROP TABLE IF EXISTS  product_view;

CREATE OR REPLACE VIEW product_view
AS
SELECT prod.id, prod.product_code, prod.product_name, prod.unit_value, prod.min_quantity, prod.product_existence, prod.product_inv_type, prod.status
FROM products prod;

DROP TABLE IF EXISTS product_detail_view;

CREATE OR REPLACE VIEW product_detail_view
AS
SELECT pd.id, pd.product_id, pp.property_name, pp.property_column_name, pp.id as product_property, pd.property_value, pp.status, pp.product_type
FROM product_property pp
	LEFT JOIN products_detail pd ON pp.id = pd.product_property;

DROP TABLE IF EXISTS stamp_inv_detail_view;

CREATE OR REPLACE VIEW stamp_inv_detail_view
AS
SELECT det.id, det.inventory_id, det.product_id, prd.product_code, prd.product_name, prd.unit_value, 
	prd.product_existence, prd.min_quantity, det.quantity_request, prd.status
FROM stamp_inventory_detail det
	LEFT JOIN products prd ON det.product_id = prd.id;

DROP TABLE IF EXISTS product_mov_view;

CREATE OR REPLACE VIEW product_mov_view
AS
SELECT si.id, DATE_FORMAT(si.request_date, "%Y-%M-%d") as request_date, CONCAT(emp.name, ' ', emp.last_name) as requester_name, 
rf.file_num, pm.action, pm.quantity, pm.product_id
FROM stamp_inventory si 
	LEFT JOIN stamp_inventory_detail sid ON si.id = sid.inventory_id
	LEFT JOIN product_movement pm ON sid.product_id = pm.product_id AND sid.inventory_id = pm.inventory_id
  LEFT JOIN employees emp ON si.requester_id = emp.id
	LEFT JOIN record_file rf ON si.file_record_id = rf.id;

DROP TABLE IF EXISTS stamp_report_view;

CREATE OR REPLACE VIEW stamp_report_view
AS
SELECT inv.id, inv.request_date, inv.reference,
  CONCAT(emp.name, ' ', emp.last_name) as requester_name, rf.file_num, inv.total, inv.status, 
  rf.id as file_record_id, inv.request_type, getClientsName(rf.id) as client_name
FROM stamp_inventory inv
  LEFT JOIN employees emp ON inv.requester_id = emp.id
  INNER JOIN record_file rf ON inv.file_record_id = rf.id;

DROP TABLE IF EXISTS expenses_view;

CREATE OR REPLACE VIEW expenses_view
AS
SELECT
    exp.id, exp.exchange_rate, exp.expenses_currency, DATE_FORMAT(exp.expenses_date, "%Y/%M/%d") as expenses_date,
    exp.expenses_num, exp.expenses_total, exp.expenses_type, exp.status,
    CONCAT(p.code, ' - ', p.name) as provider_name,
    CONCAT(c.code, ' - ', c.name) as concept_name,
    CONCAT(UPPER(us1.username), ' ', exp.created_at) as created,
    IF(exp.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', exp.updated_at)) as modified
FROM expenses exp
         INNER JOIN providers p on exp.provider_id = p.id
         INNER JOIN concepts c on exp.concept_id = c.id
         LEFT JOIN users us1 ON exp.created_by = us1.id
         LEFT JOIN users us2 ON exp.updated_by = us2.id;

DROP TABLE IF EXISTS receipt_settlement_view;

CREATE OR REPLACE VIEW receipt_settlement_view
AS
SELECT rs.id, TRIM(CONCAT(cl.name, ' ', (IF(cl.client_type = 2, IFNULL(cl.last_name, ''), '')))) as client_name,
       rs.status, rs.receipt_total, rs.type,
       CONCAT(UPPER(us1.username), ' ', rs.created_at) as created,
       IF(rs.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', rs.updated_at)) as modified
FROM receipt_settlement rs
    INNER JOIN clients cl ON rs.client_id = cl.id
    LEFT JOIN users us1 ON rs.created_by = us1.id
    LEFT JOIN users us2 ON rs.updated_by = us2.id;

DROP TABLE IF EXISTS fees_receipt_settlement_view;

CREATE OR REPLACE VIEW fees_receipt_settlement_view
AS
SELECT ca.id, rf.file_num, ca.comment as description, e.id as employee_id, CONCAT(e.name, ' ', e.last_name) as employee_name,
       ca.activity_name, ca.activity_time, rfd.entity_id
FROM case_activity ca
         INNER JOIN record_file_details rfd on ca.file_record_id = rfd.file_record_id AND rfd.entity_type = 1
         INNER JOIN record_file rf on ca.file_record_id = rf.id
         INNER JOIN employees e on ca.employee_id = e.id AND e.status = 'ACTIVO'
WHERE ca.case_activity_type = 'HONORARIOS' AND rf.status = 'AUTORIZADO';

DROP TABLE IF EXISTS activities_receipt_settlement_view;

CREATE OR REPLACE VIEW activities_receipt_settlement_view
AS
SELECT asd.id, rf.file_num, ca.comment as description, CONCAT(e.name, ' ', e.last_name) as employee_name,
       ca.activity_name, i.name as institution_name, c.short_name as currency, c.exchange_value,
       asd.cost_detail as total, rfd.entity_id
FROM activity_settlement ase
         INNER JOIN activity_settlement_detail asd on ase.id = asd.activity_settlement_id
         INNER JOIN case_activity ca on asd.case_activity_id = ca.id
         INNER JOIN record_file_details rfd on ca.file_record_id = rfd.file_record_id AND rfd.entity_type = 1
         INNER JOIN record_file rf on ca.file_record_id = rf.id
         INNER JOIN employees e on ca.employee_id = e.id AND e.status = 'ACTIVO'
         INNER JOIN institutions i on ca.institution_id = i.id AND i.status = 'ACTIVO'
         LEFT JOIN currencies c on ase.invoice_currency = c.id AND c.status = 'ACTIVO'
WHERE ca.case_activity_type = 'PROCURACION' AND rf.status = 'AUTORIZADO'
  AND ca.status = 'FINALIZADO';

DROP TABLE IF EXISTS stamps_receipt_settlement_view;

CREATE OR REPLACE VIEW stamps_receipt_settlement_view
AS
SELECT
    rf.id, rf.file_num, 'Asignación de timbres a expediente' as description,
    'QTZ' as currency, ('1.00' + 0.0) as exchange_value, si.total, rfd.entity_id
FROM (
         SELECT file_record_id, SUM(total * (IF(request_type = 22, 1, -1))) as total
         FROM stamp_inventory WHERE request_type IN (22, 23) AND file_record_id <> -1 AND status = 'AUTORIZADO'
         GROUP BY file_record_id) si
         INNER JOIN record_file_details rfd on si.file_record_id = rfd.file_record_id AND rfd.entity_type = 1
         INNER JOIN record_file rf on si.file_record_id = rf.id
WHERE rf.status = 'AUTORIZADO';

DROP TABLE IF EXISTS expenses_receipt_settlement_view;

CREATE OR REPLACE VIEW expenses_receipt_settlement_view
AS
SELECT ed.id, rf.file_num, ex.expenses_num, CONCAT(p.code, ' - ', p.name) as provider_name, CONCAT(c.code , ' - ', c.name) as concept_name,
       cu.short_name as currency_name, cu.exchange_value, ed.expense_value as total, rfd.entity_id
FROM expenses ex
         INNER JOIN expenses_detail ed on ex.id = ed.expenses_id AND ed.status = 'ACTIVO'
         INNER JOIN record_file_details rfd on ed.file_record_id = rfd.file_record_id AND rfd.entity_type = 1
         INNER JOIN record_file rf on rfd.file_record_id = rf.id
         INNER JOIN providers p on ex.provider_id = p.id AND p.status = 'ACTIVO'
         INNER JOIN concepts c on ex.concept_id = c.id AND c.status = 'ACTIVO'
         LEFT JOIN currencies cu on ex.expenses_currency = cu.id AND cu.status = 'ACTIVO'
WHERE ex.status = 'ACTIVO' AND rf.status = 'AUTORIZADO';

DROP TABLE IF EXISTS receipt_view;

CREATE OR REPLACE VIEW receipt_view
AS
SELECT r.id, r.serial_number, TRIM(CONCAT(c.name, ' ', (IF(c.client_type = 2, IFNULL(c.last_name, ''), '')))) as client_name,
       c.nit, r.status, r.receipt_date, r.receipt_total, r.receipt_total_discount,
       CONCAT(UPPER(us1.username), ' ', r.created_at) as created,
       IF(r.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', r.updated_at)) as modified, cur.short_name as currency_name
FROM receipts r
     INNER JOIN clients c ON r.client_id = c.id AND c.status = 'ACTIVO'
     INNER JOIN currencies cur ON r.currency_id = cur.id
     LEFT JOIN users us1 ON r.created_by = us1.id
     LEFT JOIN users us2 ON r.updated_by = us2.id;

DROP TABLE IF EXISTS addresses_view;

CREATE OR REPLACE VIEW addresses_view
AS
SELECT adr.id, adr.entity_id, adr.entity_type, adr.address, adr.zone,
       CONCAT(UPPER(mun.name), ', ', UPPER(dep.name)) as municipality
FROM addresses adr
    INNER JOIN municipalities mun ON adr.municipality_id = mun.id
    INNER JOIN departments dep ON mun.department_id = dep.id
WHERE adr.status = 'ACTIVO';

DROP TABLE IF EXISTS invoice_series_view;

CREATE OR REPLACE VIEW invoice_series_view
AS
SELECT inv.id, inv.series_name, inv.series_value, inv.status,
       CONCAT(UPPER(us1.username), ' ', inv.created_at) as created,
       IF(inv.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', inv.updated_at)) as modified
FROM invoice_series inv
         LEFT JOIN users us1 ON inv.created_by = us1.id
         LEFT JOIN users us2 ON inv.updated_by = us2.id;

DROP TABLE IF EXISTS record_file_search_view;

CREATE OR REPLACE VIEW record_file_search_view
AS
SELECT id, file_num, getClientsName(id) as client_name, opening_date, status
FROM record_file;

DROP TABLE IF EXISTS receipts_report;

CREATE OR REPLACE VIEW receipts_report
AS
SELECT r.id, IF(c.client_type = 2, CONCAT(c.name, ' ', c.last_name), c.name) as client_name, r.serial_number, r.status,
       DATE_FORMAT(r.receipt_date, "%d/%m/%Y") as receipt_date, r.receipt_date as receipt_search_date,
       r.receipt_total, r.receipt_total - r.receipt_iva as receipt_total_no_iva,
       ROUND(IF(r.receipt_total>=33600,(r.receipt_total/1.12-30000)*0.07+(1500),IF(r.receipt_total/1.12>=2499.1,r.receipt_total/1.12*0.05,0)), 2) as receipt_retention,
       ROUND(IF(r.receipt_total<2799,r.receipt_total/1.12*0.05,0), 2) as receipt_no_retention, r.invoice_series_id, i.series_value,
       r.exchange_rate, cur.short_name as currency_name
FROM receipts r
     INNER JOIN clients c ON r.client_id = c.id
     INNER JOIN invoice_series i ON r.invoice_series_id = i.id
     INNER JOIN currencies cur ON r.currency_id = cur.id;
