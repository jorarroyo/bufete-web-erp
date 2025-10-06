DROP FUNCTION IF EXISTS getClientsName;
CREATE FUNCTION getClientsName (file_record_id BIGINT)
    RETURNS VARCHAR(100) DETERMINISTIC
    RETURN (SELECT GROUP_CONCAT(RTRIM(CONCAT(cl.name, ' ', IFNULL(cl.last_name, ''))))
            FROM record_file_details rfd
                     INNER JOIN clients cl ON rfd.entity_id = cl.id AND rfd.entity_type = 1
            WHERE rfd.file_record_id = file_record_id);

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
             ON ed.file_record_id = cn.file_record_id
ORDER BY ed.id ASC;

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
  getClientsName(rec.id) as client_name, rec.subject
FROM record_file rec
  LEFT JOIN record_type sc ON rec.type = sc.id
  LEFT JOIN users us1 ON rec.created_by = us1.id
  LEFT JOIN users us2 ON rec.updated_by = us2.id;

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
FROM bufete_app.product_property pp
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
    exp.id, exp.exchange_rate, exp.expenses_currency, exp.expenses_date,
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
    'QTZ' as currency, 1.00 as exchange_value, si.total, rfd.entity_id
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
       IF(r.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', r.updated_at)) as modified, cur.short_name as currency_name,
       IFNULL(invs.series_name, '') as series_name
FROM receipts r
         INNER JOIN clients c ON r.client_id = c.id AND c.status = 'ACTIVO'
         INNER JOIN currencies cur ON r.currency_id = cur.id
         LEFT JOIN users us1 ON r.created_by = us1.id
         LEFT JOIN users us2 ON r.updated_by = us2.id
         LEFT JOIN invoice_series invs ON r.invoice_series_id = invs.id
UNION
SELECT r.id, r.serial_number, TRIM(otc.name) as client_name,
       otc.nit, r.status, r.receipt_date, r.receipt_total, r.receipt_total_discount,
       CONCAT(UPPER(us1.username), ' ', r.created_at) as created,
       IF(r.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', r.updated_at)) as modified,
       cur.short_name as currency_name, IFNULL(invs.series_name, '') as series_name
FROM receipts r
         INNER JOIN one_time_client otc on r.id = otc.receipt_id
         INNER JOIN currencies cur ON r.currency_id = cur.id
         LEFT JOIN users us1 ON r.created_by = us1.id
         LEFT JOIN users us2 ON r.updated_by = us2.id
         LEFT JOIN invoice_series invs ON r.invoice_series_id = invs.id;

DROP TABLE IF EXISTS addresses_view;

CREATE OR REPLACE VIEW addresses_view
AS
SELECT adr.id, adr.entity_id, adr.entity_type, adr.address, adr.zone,
       CONCAT(UPPER(mun.name), ', ', UPPER(dep.name)) as municipality
FROM addresses adr
    LEFT JOIN municipalities mun ON adr.municipality_id = mun.id
    LEFT JOIN departments dep ON mun.department_id = dep.id
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

DROP TABLE IF EXISTS receipts_payment_detail;
CREATE OR REPLACE VIEW receipts_payment_detail
AS
SELECT r.id, prd.id as detail_id, prd.payment_receipt_id, r.serial_number, r.currency_id,
       cur.short_name as currency_name, inv.series_value,
       r.balance, prd.payment_balance as receipt_total,
       r.status, r.client_id, r.receipt_date
FROM receipts r
         INNER JOIN currencies cur ON r.currency_id = cur.id
         LEFT JOIN invoice_series inv ON r.invoice_series_id = inv.id
         LEFT JOIN payment_receipt_detail prd ON r.id = prd.receipt_id
WHERE r.status = 'GENERADA';

DROP TABLE IF EXISTS payment_receipt_view;
CREATE OR REPLACE VIEW payment_receipt_view
AS
SELECT pr.id, IF(c.client_type = 2, CONCAT(c.name, ' ', c.last_name), c.name) as client_name, pr.status, pr.payment_date, pr.total_payment,
       pr.exchange_rate, cur.short_name as currency_name,
       CONCAT(UPPER(us1.username), ' ', pr.created_at) as created,
       IF(pr.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', pr.updated_at)) as modified
FROM payment_receipt pr
         INNER JOIN clients c ON pr.client_id = c.id
         INNER JOIN currencies cur ON pr.currency_id = cur.id
         LEFT JOIN users us1 ON pr.created_by = us1.id
         LEFT JOIN users us2 ON pr.updated_by = us2.id;

# SELECT pr.id, IF(c.client_type = 2, CONCAT(c.name, ' ', c.last_name), c.name) as client_name, b.name as bank_name,
#        tt.name as transaction_type_name, pr.status, pr.payment_date, pr.total_payment, cur.short_name as currency_name,
#        CONCAT(UPPER(us1.username), ' ', pr.created_at) as created,
#        IF(pr.updated_by IS NULL, '', CONCAT(UPPER(us2.username), ' ', pr.updated_at)) as modified
# FROM payment_receipt pr
#     INNER JOIN clients c ON pr.client_id = c.id
#     INNER JOIN bank b ON pr.bank_id = b.id
#     INNER JOIN transaction_type tt ON pr.transaction_type_id = tt.id
#     INNER JOIN currencies cur ON pr.currency_id = cur.id
#     LEFT JOIN users us1 ON pr.created_by = us1.id
#     LEFT JOIN users us2 ON pr.updated_by = us2.id;

# DROP PROCEDURE IF EXISTS getpath;
# CREATE PROCEDURE getpath(IN cat_id bigint, OUT path TEXT)
# BEGIN
#     DECLARE catname VARCHAR(20);
#     DECLARE temppath TEXT;
#     DECLARE tempparent INT;
#     SET max_sp_recursion_depth = 255;
#     SELECT code, parent_id FROM nomenclatures WHERE id=cat_id INTO catname, tempparent;
#     IF tempparent IS NULL
#     THEN
#         SET path = catname;
#     ELSE
#         CALL getpath(tempparent, temppath);
#         SET path = CONCAT(temppath, catname);
#     END IF;
# END;
#
# DROP FUNCTION IF EXISTS getpath;
# CREATE FUNCTION getpath(cat_id BIGINT) RETURNS TEXT DETERMINISTIC
# BEGIN
#     DECLARE res TEXT;
#     CALL getpath(cat_id, res);
#     RETURN res;
# END;

INSERT INTO app_options
  (id, name)
VALUES
  (1, 'USUARIO_ADMIN'),
  (2, 'DASHBOARD_MENU'),
  (3, 'DASHBOARD_LECTURA'),
  (4, 'USUARIO_MENU'),
  (5, 'USUARIO_LECTURA'),
  (6, 'USUARIO_CREA'),
  (7, 'USUARIO_MODIFICA'),
  (8, 'USUARIO_ELIMINA'),
  (9, 'USUARIO_ASIGNA_ROL'),
  (10, 'USUARIO_ASIGNA'),
  (11, 'ROL_MENU'),
  (12, 'ROL_LECTURA'),
  (13, 'ROL_CREA'),
  (14, 'ROL_MODIFICA'),
  (15, 'ROL_ELIMINA'),
  (16, 'EMPRESA_MENU'),
  (17, 'EMPRESA_LECTURA'),
  (18, 'EMPRESA_CREA'),
  (19, 'EMPRESA_MODIFICA'),
  (20, 'EMPRESA_ELIMINA'),
  (21, 'MONEDA_MENU'),
  (22, 'MONEDA_LECTURA'),
  (23, 'MONEDA_CREA'),
  (24, 'MONEDA_MODIFICA'),
  (25, 'MONEDA_ELIMINA'),
  (26, 'CONFIGURACION_MENU'),
  (27, 'CONFIGURACION_LECTURA'),
  (28, 'CONFIGURACION_CREA'),
  (29, 'CONFIGURACION_MODIFICA'),
  (30, 'CONFIGURACION_ELIMINA'),
  (31, 'CLIENTE_MENU'),
  (32, 'CLIENTE_LECTURA'),
  (33, 'CLIENTE_CREA'),
  (34, 'CLIENTE_ELIMINA'),
  (35, 'EMPLEADO_MENU'),
  (36, 'EMPLEADO_LECTURA'),
  (37, 'EMPLEADO_CREA'),
  (38, 'EMPLEADO_ELIMINA'),
  (39, 'EXPEDIENTE_MENU'),
  (40, 'EXPEDIENTE_LECTURA'),
  (41, 'EXPEDIENTE_CREA'),
  (42, 'EXPEDIENTE_CAMBIA_ESTADO'),
  (43, 'EXPEDIENTE_AUTORIZA_RECHAZA'),
  (44, 'ACTIVIDAD_MENU'),
  (45, 'ACTIVIDAD_LECTURA'),
  (46, 'ACTIVIDAD_CREA'),
  (47, 'ACTIVIDAD_MODIFICA'),
  (48, 'ACTIVIDAD_ELIMINA'),
  (49, 'INSTITUTION_MENU'),
  (50, 'INSTITUCION_LECTURA'),
  (51, 'INSTITUCION_CREA'),
  (52, 'INSTITUCION_MODIFICA'),
  (53, 'INSTITUCION_ELIMINA'),
  (54, 'DOCUMENTO_MENU'),
  (55, 'DOCUMENTO_LECTURA'),
  (56, 'DOCUMENTO_CREA'),
  (57, 'DOCUMENTO_ELIMINA'),
  (58, 'EXPEDIENTE_ACTIVIDAD_MENU'),
  (59, 'EXPEDIENTE_ACTIVIDAD_LECTURA'),
  (60, 'EXPEDIENTE_ACTIVIDAD_CREA'),
  (61, 'EXPEDIENTE_ACTIVIDAD_ELIMINA'),
  (62, 'AGENDA_PROCURADOR_MENU'),
  (63, 'AGENDA_PROCURADOR_LECTURA'),
  (64, 'AGENDA_PROCURADOR_CREA'),
  (65, 'AGENDA_PROCURADOR_ELIMINA'),
  (66, 'AGENDA_LIQUIDACION_MENU'),
  (67, 'AGENDA_LIQUIDACION_LECTURA'),
  (68, 'AGENDA_LIQUIDACION_CREA'),
  (69, 'AGENDA_LIQUIDACION_ELIMINA'),
  (70, 'TIMBRE_FISCAL_INVENTARIO_MENU'),
  (71, 'TIMBRE_FISCAL_INVENTARIO_LECTURA'),
  (72, 'TIMBRE_FISCAL_INVENTARIO_CREA'),
  (73, 'TIMBRE_FISCAL_INVENTARIO_ELIMINA'),
  (74, 'TIMBRE_FISCAL_INVENTARIO_CAMBIA_ESTADO'),
  (75, 'PRODUCTO_MENU'),
  (76, 'PRODUCTO_LECTURA'),
  (77, 'PRODUCTO_CREA'),
  (78, 'PRODUCTO_ELIMINA'),
  (79, 'USUARIO_RESETEA'),
  (80, 'AGENDA_PROCURADOR_EDITA'),
  (81, 'AGENDA_PROCURADOR_LIQUIDA'),
  (82, 'AGENDA_PROCURADOR_CAMBIO_ESTADO'),
  (83, 'AGENDA_PROCURADOR_AUTORIZA'),
  (84, 'EXPEDIENTE_EDITA'),
  (85, 'TIMBRE_FISCAL_INVENTARIO_AUTORIZA'),
  (86, 'TIMBRE_FISCAL_INVENTARIO_EDITA'),
  (87, 'EXPEDIENTE_TIPO_LISTA'),
  (88, 'EXPEDIENTE_SUBTIPO_LISTA'),
  (89, 'TIPO_EXPEDIENTE_MENU'),
  (90, 'TIPO_EXPEDIENTE_LECTURA'),
  (91, 'TIPO_EXPEDIENTE_CREA'),
  (92, 'TIPO_EXPEDIENTE_MODIFICA'),
  (93, 'TIPO_EXPEDIENTE_ELIMINA'),
  (94, 'SUB_TIPO_EXPEDIENTE_MENU'),
  (95, 'SUB_TIPO_EXPEDIENTE_LECTURA'),
  (96, 'SUB_TIPO_EXPEDIENTE_CREA'),
  (97, 'SUB_TIPO_EXPEDIENTE_MODIFICA'),
  (98, 'SUB_TIPO_EXPEDIENTE_ELIMINA'),
  (99, 'USUARIO_LISTADO_EMPLEADOS'),
  (100, 'EXPEDIENTE_LISTADO_CLIENTES'),
  (101, 'EXPEDIENTE_LISTADO_EMPLEADOS'),
  (102, 'EXPEDIENTE_ACTIVIDAD_LISTADO'),
  (103, 'EXPEDIENTE_ACTIVIDAD_LISTADO_INSTITUCION'),
  (104, 'EXPEDIENTE_ACTIVIDAD_LISTADO_EMPLEADOS'),
  (105, 'EXPEDIENTE_ACTIVIDAD_LISTADO_EXPEDIENTES'),
  (106, 'TIMBRE_FISCAL_INVENTARIO_LISTADO_EXPEDIENTES'),
  (107, 'TIMBRE_FISCAL_INVENTARIO_LISTADO_PRODUCTO'),
  (108, 'TIMBRE_FISCAL_INVENTARIO_LISTADO_EMPLEADOS'),
  (109, 'PROVEEDOR_MENU'),
  (110, 'PROVEEDOR_LECTURA'),
  (111, 'PROVEEDOR_CREA'),
  (112, 'PROVEEDOR_MODIFICA'),
  (113, 'PROVEEDOR_ELIMINA'),
  (114, 'CONCEPTO_MENU'),
  (115, 'CONCEPTO_LECTURA'),
  (116, 'CONCEPTO_CREA'),
  (117, 'CONCEPTO_MODIFICA'),
  (118, 'CONCEPTO_ELIMINA'),
  (119, 'DOCUMENTOS_GASTOS_MENU'),
  (120, 'DOCUMENTOS_GASTOS_LECTURA'),
  (121, 'DOCUMENTOS_GASTOS_CREA'),
  (122, 'DOCUMENTOS_GASTOS_CAMBIA_ESTADO'),
  (123, 'DOCUMENTOS_GASTOS_PROVEEDORES'),
  (124, 'DOCUMENTOS_GASTOS_CONCEPTOS'),
  (125, 'DOCUMENTOS_GASTOS_LISTADO_EXPEDIENTES'),
  (126, 'LIQUIDACION_FACTURA_MENU'),
  (127, 'LIQUIDACION_FACTURA_LECTURA'),
  (128, 'LIQUIDACION_FACTURA_CREA'),
  (129, 'LIQUIDACION_FACTURA_CAMBIA_ESTADO'),
  (130, 'LIQUIDACION_FACTURA_AUTORIZA'),
  (131, 'LIQUIDACION_FACTURA_GENERAR_REPORTE'),
  (132, 'LIQUIDACION_FACTURA_GENERAR_FACTURA'),
  (133, 'LIQUIDACION_FACTURA_LISTADO_CLIENTES'),
  (134, 'FACTURA_MENU'),
  (135, 'FACTURA_LECTURA'),
  (136, 'FACTURA_CREA'),
  (137, 'FACTURA_CAMBIA_ESTADO'),
  (138, 'FACTURA_AUTORIZA'),
  (139, 'FACTURA_GENERAR_REPORTE'),
  (140, 'FACTURA_GENERAR_FACTURA'),
  (141, 'FACTURA_LISTADO_CLIENTES'),
  (142, 'FACTURA_LISTADO_DIRECCIONES'),
  (143, 'FACTURA_LISTADO_SERIES'),
  (144, 'SERIE_FACTURA_MENU'),
  (145, 'SERIE_FACTURA_LECTURA'),
  (146, 'SERIE_FACTURA_CREA'),
  (147, 'SERIE_FACTURA_CAMBIA_ESTADO'),
  (148, 'REPORTES_FACTURA_MENU'),
  (149, 'LISTADO_FACTURA_MENU'),
  (150, 'NOMENCLATURA_CONTABLE_MENU'),
  (151, 'NOMENCLATURA_CONTABLE_CREA'),
  (152, 'NOMENCLATURA_CONTABLE_LECTURA'),
  (153, 'NOMENCLATURA_CONTABLE_CAMBIA_ESTADO'),
  (154, 'EXPEDIENTE_COMBINA_EXPEDIENTE'),
  (155, 'RECIBO_FACTURA_MENU'),
  (156, 'RECIBO_FACTURA_LECTURA'),
  (157, 'RECIBO_FACTURA_CREA'),
  (158, 'RECIBO_FACTURA_MODIFICA'),
  (159, 'RECIBO_FACTURA_CAMBIA_ESTADO');

INSERT INTO roles (id,created_at,updated_at,name,status) 
VALUES 
    (1, NOW(), NOW(), 'Admin', 'ACTIVO'),
    (2, NOW(), NOW(), 'Configuración', 'ACTIVO'),
    (3, NOW(), NOW(), 'Expedientes', 'ACTIVO'),
    (4, NOW(), NOW(), 'Catálogos', 'ACTIVO'),
    (5, NOW(), NOW(), 'Inventarios', 'ACTIVO'),
    (6, NOW(), NOW(), 'Facturación', 'ACTIVO'),
    (7, NOW(), NOW(), 'Contabilidad', 'ACTIVO');

INSERT INTO role_app_options 
  (app_option_id,role_id,created_at,updated_at,status) 
VALUES 
  (1,1 , NOW(), NOW(), 'ACTIVO'),
  (2,2 , NOW(), NOW(), 'ACTIVO'),
  (2,3 , NOW(), NOW(), 'ACTIVO'),
  (2,4 , NOW(), NOW(), 'ACTIVO'),
  (2,5 , NOW(), NOW(), 'ACTIVO'),
  (3,2 , NOW(), NOW(), 'ACTIVO'),
  (4,2 , NOW(), NOW(), 'ACTIVO'),
  (5,2 , NOW(), NOW(), 'ACTIVO'),
  (6,2 , NOW(), NOW(), 'ACTIVO'),
  (7,2 , NOW(), NOW(), 'ACTIVO'),
  (8,2 , NOW(), NOW(), 'ACTIVO'),
  (9,2 , NOW(), NOW(), 'ACTIVO'),
  (10, 2, NOW(), NOW(), 'ACTIVO'),
  (11, 2, NOW(), NOW(), 'ACTIVO'),
  (12, 2, NOW(), NOW(), 'ACTIVO'),
  (13, 2, NOW(), NOW(), 'ACTIVO'),
  (14, 2, NOW(), NOW(), 'ACTIVO'),
  (15, 2, NOW(), NOW(), 'ACTIVO'),
  (99, 2, NOW(), NOW(), 'ACTIVO'),
  (31, 3, NOW(), NOW(), 'ACTIVO'),
  (32, 3, NOW(), NOW(), 'ACTIVO'),
  (33, 3, NOW(), NOW(), 'ACTIVO'),
  (34, 3, NOW(), NOW(), 'ACTIVO'),
  (35, 3, NOW(), NOW(), 'ACTIVO'),
  (36, 3, NOW(), NOW(), 'ACTIVO'),
  (37, 3, NOW(), NOW(), 'ACTIVO'),
  (38, 3, NOW(), NOW(), 'ACTIVO'),
  (39, 3, NOW(), NOW(), 'ACTIVO'),
  (40, 3, NOW(), NOW(), 'ACTIVO'),
  (41, 3, NOW(), NOW(), 'ACTIVO'),
  (42, 3, NOW(), NOW(), 'ACTIVO'),
  (43, 3, NOW(), NOW(), 'ACTIVO'),
  (44, 4, NOW(), NOW(), 'ACTIVO'),
  (45, 4, NOW(), NOW(), 'ACTIVO'),
  (46, 4, NOW(), NOW(), 'ACTIVO'),
  (47, 4, NOW(), NOW(), 'ACTIVO'),
  (48, 4, NOW(), NOW(), 'ACTIVO'),
  (49, 4, NOW(), NOW(), 'ACTIVO'),
  (50, 4, NOW(), NOW(), 'ACTIVO'),
  (51, 4, NOW(), NOW(), 'ACTIVO'),
  (52, 4, NOW(), NOW(), 'ACTIVO'),
  (53, 4, NOW(), NOW(), 'ACTIVO'),
  (54, 3, NOW(), NOW(), 'ACTIVO'),
  (55, 3, NOW(), NOW(), 'ACTIVO'),
  (56, 3, NOW(), NOW(), 'ACTIVO'),
  (57, 3, NOW(), NOW(), 'ACTIVO'),
  (58, 3, NOW(), NOW(), 'ACTIVO'),
  (59, 3, NOW(), NOW(), 'ACTIVO'),
  (60, 3, NOW(), NOW(), 'ACTIVO'),
  (61, 3, NOW(), NOW(), 'ACTIVO'),
  (62, 3, NOW(), NOW(), 'ACTIVO'),
  (63, 3, NOW(), NOW(), 'ACTIVO'),
  (64, 3, NOW(), NOW(), 'ACTIVO'),
  (65, 3, NOW(), NOW(), 'ACTIVO'),
  (66, 3, NOW(), NOW(), 'ACTIVO'),
  (67, 3, NOW(), NOW(), 'ACTIVO'),
  (68, 3, NOW(), NOW(), 'ACTIVO'),
  (69, 3, NOW(), NOW(), 'ACTIVO'),
  (70, 5, NOW(), NOW(), 'ACTIVO'),
  (71, 5, NOW(), NOW(), 'ACTIVO'),
  (72, 5, NOW(), NOW(), 'ACTIVO'),
  (73, 5, NOW(), NOW(), 'ACTIVO'),
  (74, 5, NOW(), NOW(), 'ACTIVO'),
  (75, 5, NOW(), NOW(), 'ACTIVO'),
  (76, 5, NOW(), NOW(), 'ACTIVO'),
  (77, 5, NOW(), NOW(), 'ACTIVO'),
  (78, 5, NOW(), NOW(), 'ACTIVO'),
  (79, 2, NOW(), NOW(), 'ACTIVO'),
  (80, 3, NOW(), NOW(), 'ACTIVO'),
  (81, 3, NOW(), NOW(), 'ACTIVO'),
  (82, 3, NOW(), NOW(), 'ACTIVO'),
  (83, 3, NOW(), NOW(), 'ACTIVO'),
  (84, 3, NOW(), NOW(), 'ACTIVO'),
  (85, 5, NOW(), NOW(), 'ACTIVO'),
  (86, 5, NOW(), NOW(), 'ACTIVO'),
  (87, 3, NOW(), NOW(), 'ACTIVO'),
  (88, 3, NOW(), NOW(), 'ACTIVO'),
  (100, 3, NOW(), NOW(), 'ACTIVO'),
  (101, 3, NOW(), NOW(), 'ACTIVO'),
  (102, 3, NOW(), NOW(), 'ACTIVO'),
  (103, 3, NOW(), NOW(), 'ACTIVO'),
  (104, 3, NOW(), NOW(), 'ACTIVO'),
  (105, 3, NOW(), NOW(), 'ACTIVO'),
  (106, 5, NOW(), NOW(), 'ACTIVO'),
  (107, 5, NOW(), NOW(), 'ACTIVO'),
  (108, 5, NOW(), NOW(), 'ACTIVO'),
  (109, 6, NOW(), NOW(), 'ACTIVO'),
  (110, 6, NOW(), NOW(), 'ACTIVO'),
  (111, 6, NOW(), NOW(), 'ACTIVO'),
  (112, 6, NOW(), NOW(), 'ACTIVO'),
  (113, 6, NOW(), NOW(), 'ACTIVO'),
  (114, 6, NOW(), NOW(), 'ACTIVO'),
  (115, 6, NOW(), NOW(), 'ACTIVO'),
  (116, 6, NOW(), NOW(), 'ACTIVO'),
  (117, 6, NOW(), NOW(), 'ACTIVO'),
  (118, 6, NOW(), NOW(), 'ACTIVO'),
  (119, 6, NOW(), NOW(), 'ACTIVO'),
  (120, 6, NOW(), NOW(), 'ACTIVO'),
  (121, 6, NOW(), NOW(), 'ACTIVO'),
  (122, 6, NOW(), NOW(), 'ACTIVO'),
  (123, 6, NOW(), NOW(), 'ACTIVO'),
  (124, 6, NOW(), NOW(), 'ACTIVO'),
  (125, 6, NOW(), NOW(), 'ACTIVO'),
  (126, 6, NOW(), NOW(), 'ACTIVO'),
  (127, 6, NOW(), NOW(), 'ACTIVO'),
  (128, 6, NOW(), NOW(), 'ACTIVO'),
  (129, 6, NOW(), NOW(), 'ACTIVO'),
  (130, 6, NOW(), NOW(), 'ACTIVO'),
  (131, 6, NOW(), NOW(), 'ACTIVO'),
  (132, 6, NOW(), NOW(), 'ACTIVO'),
  (133, 6, NOW(), NOW(), 'ACTIVO'),
  (134, 6, NOW(), NOW(), 'ACTIVO'),
  (135, 6, NOW(), NOW(), 'ACTIVO'),
  (136, 6, NOW(), NOW(), 'ACTIVO'),
  (137, 6, NOW(), NOW(), 'ACTIVO'),
  (138, 6, NOW(), NOW(), 'ACTIVO'),
  (139, 6, NOW(), NOW(), 'ACTIVO'),
  (140, 6, NOW(), NOW(), 'ACTIVO'),
  (141, 6, NOW(), NOW(), 'ACTIVO'),
  (142, 6, NOW(), NOW(), 'ACTIVO'),
  (143, 6, NOW(), NOW(), 'ACTIVO'),
  (144, 6, NOW(), NOW(), 'ACTIVO'),
  (145, 6, NOW(), NOW(), 'ACTIVO'),
  (146, 6, NOW(), NOW(), 'ACTIVO'),
  (147, 6, NOW(), NOW(), 'ACTIVO'),
  (148, 6, NOW(), NOW(), 'ACTIVO'),
  (149, 6, NOW(), NOW(), 'ACTIVO');

INSERT INTO companies
  (id, created_at, updated_at, name, status)
VALUES
  (1, NOW(), NOW(), 'Bufete Olivero', 'ACTIVO');

INSERT INTO users
  (id, created_at, updated_at, email, name, password, status, username, employee_id)
VALUES
  -- (1, NOW(), NOW(), 'admin@admin.com', 'Admin Admin', '$2a$10$DZU7t75GfRfo0PkLId.IoeLlo3TeNJab1kDINciAXVWoTvxdhAFUK', 'ACTIVO', 'admin', 1);
  (1, NOW(), NOW(), 'jlarroyop@gmail.com', 'Jorge Arroyo', '$2a$10$.2KH9RO41v01eF.FJV1q3utRtieRbBXJSFxVYchPrNIm54c0nJYBe', 'ACTIVO', 'jlarroyop', 1),
  (2, NOW(), NOW(), 'warroyop@gmail.com', 'Walter Arroyo', '$2a$04$v/97IRUowe6ehLB.Efb2C.QQ54KB05QR9P.Gf5MQ4d3wdjsYBI0aW', 'ACTIVO', 'warroyo', 4);

INSERT INTO user_role_company
  (company_id, role_id, user_id, created_at, updated_at, status)
VALUES
  -- (1, 1, 1, NOW(), NOW(), 'ACTIVO');
  (1, 2, 1, NOW(), NOW(), 'ACTIVO'),
  (1, 1, 2, NOW(), NOW(), 'ACTIVO');

INSERT INTO currencies
  (id, created_at, updated_at, exchange_value, name, short_name, status, company_id)
VALUES
    (1, NOW(), NOW(), 1, 'QUETZALES', 'GTO', 'ACTIVO', 1),
    (2, NOW(), NOW(), 7.6, 'DOLARES', 'USD', 'ACTIVO', 1),
    (3, NOW(), NOW(), 11, 'EUROS', 'EUR', 'ACTIVO', 1),
    (4, NOW(), NOW(), 0.5, 'Pesos Mexicanos', 'MXN', 'ACTIVO', 1);

INSERT INTO departments 
	(id, name)
VALUES 
	(1,'GUATEMALA'),
	(2,'EL PROGRESO'),
	(3,'SACATEPEQUEZ'),
	(4,'CHIMALTENANGO'),
	(5,'ESCUINTLA'),
	(6,'SANTA ROSA'),
	(7,'SOLOLÁ'),
	(8,'TOTONICAPÁN'),
	(9,'QUETZALTENANGO'),
	(10,'SUCHITEPEQUEZ'),
	(11,'RETALHULEU'),
	(12,'SAN MARCOS'),
	(13,'HUEHUETENANGO'),
	(14,'EL QUICHÉ'),
	(15,'BAJA VERAPAZ'),
	(16,'ALTA VERAPAZ'),
	(17,'EL PETÉN'),
	(18,'IZABAL'),
	(19,'ZACAPA'),
	(20,'CHIQUIMULA'),
	(21,'JALAPA'),
	(22,'JUTIAPA'),
	(31,'EL SALVADOR'),
	(32,'HONDURAS'),
	(33,'NICARAGUA'),
	(34,'COSTA RICA'),
	(35,'MÉXICO'),
	(99,'(PAÍS)');

INSERT INTO municipalities 
	(id, name, department_id) 
VALUES 
	(1,'GUATEMALA',1),
	(2,'ACATENANGO',4),
	(3,'AGUA BLANCA',22),
	(4,'AGUA CALIENTE (ESQUIPULAS)',20),
	(5,'AGUA ESCONDIDA (SAN ANTONIO P.',7),
	(6,'AGUACATAN',13),
	(7,'ALMOLONGA',9),
	(8,'ALOTENANGO',3),
	(9,'AMATITLAN',1),
	(10,'ANGUIATU (CONCEPCION LAS MINAS',20),
	(11,'ANTIGUA GUATEMALA',3),
	(12,'ARGUETA (SOLOLA)',7),
	(13,'ASUNCION MITA',22),
	(14,'ATESCATEMPA',22),
	(15,'AYARZA (CASILLAS)',6),
	(16,'AYUTLA',12),
	(17,'BANANERA (MORALES)',18),
	(18,'BARBERENA',6),
	(19,'BOCA DEL MONTE (VILLA CANALES)',1),
	(20,'BOLIVIA (SANTO DOMINGO SUCH.)',10),
	(21,'BOLONCO (FRAY BARTOLOME)',16),
	(22,'BRACITOS (MAZATENANGO)',10),
	(23,'BRITO (GUANAGAZAPA)',5),
	(24,'BUENOS AIRES (MORALES)',18),
	(25,'CABALLO BLANCO (RETALHULEU)',11),
	(26,'CABANAS',19),
	(27,'CABRICAN',9),
	(28,'CAHABON',16),
	(29,'CAJOLA',9),
	(30,'CALAPTE (IXCHIGUAN)',12),
	(31,'CAMOTAN',20),
	(32,'CAMPUR (SAN PEDRO CARCHA)',16),
	(33,'CANALITOS',1),
	(34,'CANDELARIA XOLHUITZ (NVO. SAN',11),
	(35,'CANILLA',14),
	(36,'CANTABAL',14),
	(37,'CANTEL',9),
	(38,'CARMELITA (SAN ANDRES)',17),
	(39,'CASAS VIEJAS (CHIQUIMULILLA)',6),
	(40,'CASILLAS',6),
	(41,'CATARINA',12),
	(42,'CAYUGA (MORALES)',18),
	(43,'CERRO GORDO (STA. ROSA DE LIMA)',6),
	(44,'CHAHAL',16),
	(45,'CHAJUL',14),
	(46,'CHALUM (LA LIBERTAD)',13),
	(47,'CHAMPERICO',11),
	(48,'CHAMPOLLAP (SAN PEDRO SAC.)',12),
	(49,'CHIANTLA',13),
	(50,'CHICACAO',10),
	(51,'CHICAMAN',14),
	(52,'CHICHE',14),
	(53,'CHICHICASTENANGO',14),
	(54,'CHIMALTENANGO',4),
	(55,'CHINAUTLA',1),
	(56,'CHINIQUE',14),
	(57,'CHIQUIBAL (SAN CARLOS SIJA)',9),
	(58,'CHIQUIMULA',20),
	(59,'CHIQUIMULILLA',6),
	(60,'CHISEC',16),
	(61,'CHOCOLA (SAN PABLO JOCOPILAS)',10),
	(62,'CHUARRANCHO',1),
	(63,'CHUATUJ (SAN CARLOS SIJA)',9),
	(64,'CIUDAD PEDRO DE ALVARADO (MOYU',22),
	(65,'CIUDAD VIEJA',3),
	(66,'COATEPEQUE',9),
	(67,'COBAN',16),
	(68,'COCALES (PATULUL)',10),
	(69,'COLOMBA COSTA CUCA',9),
	(70,'COLOTENANGO',13),
	(71,'COMALAPA',4),
	(72,'COMAPA',22),
	(73,'COMITANCILLO',12),
	(74,'CONCEPCION',7),
	(75,'CONCEPCION',13),
	(76,'CONCEPCION CHIQUIRICHAPA',9),
	(77,'CONCEPCION LAS MINAS',20),
	(78,'CONCEPCION TUTUAPA',12),
	(79,'CONGUACO',22),
	(80,'CONTEPEQUE (ATESCATEMPA)',22),
	(81,'CUBULCO',15),
	(82,'CUICABAL (SIBILIA)',9),
	(83,'CUILAPA',6),
	(84,'CUILCO',13),
	(85,'CUNEN',14),
	(86,'CUYOTENANGO',10),
	(87,'CUYUTA (MASAGUA)',5),
	(88,'DOLORES',17),
	(89,'DOS LAGUNAS (FLORES)',17),
	(90,'EL ADELANTO',22),
	(91,'EL AHUMADO (CHIQUIMULILLA)',6),
	(92,'EL AMATILLO (JOCOTAN)',20),
	(93,'EL AMPARO (EL TUMBADOR)',12),
	(94,'EL ASINTAL',11),
	(95,'EL CARMEN (MALACATAN)',12),
	(96,'EL CERINAL (BARBERENA)',6),
	(97,'EL CHAL (DOLORES)',17),
	(98,'EL CHOL',15),
	(99,'EL CIELO (EL TUMBADOR)',12),
	(100,'EL CINCHADO (PUERTO BARRIOS)',18),
	(101,'EL EDEN (PALESTINA DE LOS ALTO',9),
	(102,'EL ESTOR',18),
	(103,'EL FISCAL (PALENCIA)',1),
	(104,'EL FLORIDO (JOCOTAN)',20),
	(105,'EL JICARO',2),
	(106,'EL MITCHAL (MORALES)',18),
	(107,'EL MOLINO (CUILAPA)',6),
	(108,'EL NARANJO (LA LIBERTAD)',17),
	(109,'EL NARANJO (MASAGUA)',5),
	(110,'EL OVEJERO (EL PROGRESO)',22),
	(111,'EL PALMAR',9),
	(112,'EL PORVENIR TICANLU (TIQUISATE',5),
	(113,'EL PROGRESO',22),
	(114,'EL QUETZAL',12),
	(115,'EL RANCHO (SN. AGUSTIN ACASAGU',2),
	(116,'EL REFUGIO (LOS AMATES)',18),
	(117,'EL REMATE (FLORES)',17),
	(118,'EL RICO (LOS AMATES)',18),
	(119,'EL RINCONCITO (STA. ROSA DE LI',6),
	(120,'EL RODEO',12),
	(121,'EL ROSARIO',16),
	(122,'EL SITIO (CATARINA)',12),
	(123,'EL TAMBOR (EL PALMAR)',9),
	(124,'EL TEJAR',4),
	(125,'EL TUMBADOR',12),
	(126,'EL XAB (EL ASINTAL)',11),
	(127,'ENTRE RIOS (PUERTO BARRIOS)',18),
	(128,'ESCUINTLA',5),
	(129,'ESQUIPULAS',20),
	(130,'ESQUIPULAS PALO GORDO',12),
	(131,'ESTANCIA DE LA VIRGEN (SN. AGU',2),
	(132,'ESTANSON JALAPA (SANSARE)',2),
	(133,'ESTANZUELA',19),
	(134,'FLORES',17),
	(135,'FLORES COSTA CUCA',9),
	(136,'FRAIJANES',1),
	(137,'FRAY BARTOLOME DE LAS CASAS',16),
	(138,'FRONTERAS (LIVINGSTON)',18),
	(139,'GENOVA',9),
	(140,'GENOVA COSTA CUCA',9),
	(141,'GODINES (SAN ANDRES SEMETABAJ)',7),
	(142,'GRACIAS A DIOS (NENTON)',13),
	(143,'GRANADOS',15),
	(144,'GUALAN',19),
	(145,'GUANAGAZAPA',5),
	(146,'GUASTATOYA',2),
	(147,'GUATALON (RIO BRAVO)',10),
	(148,'GUAZACAPAN',6),
	(149,'HORCONES (ATESCATEMPA)',22),
	(150,'HORCONES (STA. CATARINA MITA)',22),
	(151,'HUEHUETENANGO',13),
	(152,'HUITAN',9),
	(153,'HUITE',19),
	(154,'IPALA',20),
	(155,'IXCHIGUAN',12),
	(156,'IXHUATAN',6),
	(157,'IXTAHUACAN',13),
	(158,'JACALTENANGO',13),
	(159,'JALAPA',21),
	(160,'JALPATAGUA',22),
	(161,'JEREZ',22),
	(162,'JOCOTAN',20),
	(163,'JOCOTENANGO',3),
	(164,'JOYABAJ',14),
	(165,'JUTIAPA',22),
	(166,'LA BLANCA (OCOS)',12),
	(167,'LA CANOA (SALAMA)',15),
	(168,'LA CONQUISTA (NVO. PROGRESO)',12),
	(169,'LA DEMOCRACIA',5),
	(170,'LA DEMOCRACIA',13),
	(171,'LA DEMOCRACIA',12),
	(172,'LA ESMERALDA (JEREZ)',22),
	(173,'LA ESPERANZA',9),
	(174,'LA FELICIDAD (SAYAXCHE)',17),
	(175,'LA FRAGUA',19),
	(176,'LA GOMERA',5),
	(177,'LA LIBERTAD',13),
	(178,'LA LIBERTAD',17),
	(179,'LA MAQUINA (CUYOTENANGO)',10),
	(180,'LA MAQUINA (SAN ANDRES V. SECA',11),
	(181,'LA MESILLA',13),
	(182,'LA REFORMA',12),
	(183,'LA REFORMA (HUITE)',19),
	(184,'LA TINTA (PANZOS)',16),
	(185,'LA UNION',19),
	(186,'LANQUIN',16),
	(187,'LAS CASAS',16),
	(188,'LAS CONCHAS',16),
	(189,'LAS CRUCES (LA LIBERTAD)',17),
	(190,'LAS DELICIAS (EL TUMBADOR)',12),
	(191,'LAS MERCEDES (COLOMBA)',9),
	(192,'LAS PALMAS (COATEPEQUE)',9),
	(193,'LAS QUEBRADAS (MORALES)',18),
	(194,'LAS VINAS (MORALES)',18),
	(195,'LIVINGSTON',18),
	(196,'LLANO GRANDE',21),
	(197,'LOS AMATES',18),
	(198,'LOS AMATES (EL CHOL)',15),
	(199,'LOS CERRITOS (CHIQUIMULILLA)',6),
	(200,'LOS ENCUENTROS, SOLOLA',7),
	(201,'LOS ESCLAVOS (CUILAPA)',6),
	(202,'LOS LIMONES (OCOS)',12),
	(203,'MACANCHE (DOLORES)',17),
	(204,'MACHAQUILA (DOLORES)',17),
	(205,'MAGDALENA MILPAS ALTAS',3),
	(206,'MALACATAN',12),
	(207,'MALACATANCITO',13),
	(208,'MARISCOS (LOS AMATES)',18),
	(209,'MASAGUA',5),
	(210,'MATAQUESCUINTLA',21),
	(211,'MAZATENANGO',10),
	(212,'MELCHOR DE MENCOS',17),
	(213,'MICHICOY (SAN PEDRO NECTA)',13),
	(214,'MIXCO',1),
	(215,'MOMOSTENANGO',8),
	(216,'MONJAS',21),
	(217,'MONTERICO (TAXISCO)',6),
	(218,'MONTERREY (SANTO DOMINGO SUCH.)',10),
	(219,'MORALES',18),
	(220,'MORAZAN',2),
	(221,'MOYUTA',22),
	(222,'NAHUALA',7),
	(223,'NANCINTA (CHIQUIMULILLA)',6),
	(224,'NEBAJ',14),
	(225,'NENTON',13),
	(226,'NUEVA ANGUIATU (CONCEP. LAS MI)',20),
	(227,'NUEVA CONCEPCION',5),
	(228,'NUEVA SANTA ROSA',6),
	(229,'NUEVO PROGRESO',12),
	(230,'NUEVO SAN CARLOS',11),
	(231,'OBERO (MASAGUA)',5),
	(232,'OCOS',12),
	(233,'OLINTEPEQUE',9),
	(234,'OLOPA',20),
	(235,'ORATORIO',6),
	(236,'PACHALUM',14),
	(237,'PAJAPITA',12),
	(238,'PALENCIA',1),
	(239,'PALESTINA DE LOS ALTOS',9),
	(240,'PALIN',5),
	(241,'PALMIRA (COLOMBA)',9),
	(242,'PALO GORDO (SAN ANTONIO SUCH.)',10),
	(243,'PANAJACHEL',7),
	(244,'PANCAJCHE (TUCURU)',16),
	(245,'PANZOS',16),
	(246,'PAQUIX',13),
	(247,'PARRAMOS',4),
	(248,'PASACO',22),
	(249,'PASO CABALLOS (SAN ANDRES)',17),
	(250,'PASO DE LOS JALAPAS (EL JICARO)',2),
	(251,'PASTORES',3),
	(252,'PATULUL',10),
	(253,'PATZICIA',4),
	(254,'PATZITE',14),
	(255,'PATZUN',4),
	(256,'PAXCAMAN (FLORES)',17),
	(257,'PETATAN (CONCEPCION)',13),
	(258,'PIEDRA GRANDE (SAN PEDRO SAC.)',12),
	(259,'PIXABAJ (SOLOLA)',7),
	(260,'PLATANARES (OCOS)',12),
	(261,'PLAYA GRANDE (IXCAN)',14),
	(262,'PLAYITAS (MORALES)',18),
	(263,'POCHUTA',4),
	(264,'POPTUN',17),
	(265,'PTO. SANTO TOMAS DE CASTILLA',18),
	(266,'PUEBLO NUEVO',10),
	(267,'PUEBLO NUEVO VIÑAS',6),
	(268,'PUERTA PARADA (STA. CAT. PIN)',1),
	(269,'PUERTO BARRIOS',18),
	(270,'PUERTO IZTAPA',5),
	(271,'PUERTO QUETZAL',5),
	(272,'PUERTO SAN JOSE',5),
	(273,'PURULHA',15),
	(274,'QUESADA',22),
	(275,'QUETZALTENANGO',9),
	(276,'QUEZALTEPEQUE',20),
	(277,'QUIRIGUA (LOS AMATES)',18),
	(278,'RABINAL',15),
	(279,'RAXRUHA (CHISEC)',16),
	(280,'RETALHULEU',11),
	(281,'RIO BLANCO',12),
	(282,'RIO BRAVO',10),
	(283,'RIO DE PAZ',22),
	(284,'RIO HONDO',19),
	(285,'SABANETA (DOLORES)',17),
	(286,'SACAPULAS',14),
	(287,'SACPUY (SAN ANDRES)',17),
	(288,'SALACUIN',16),
	(289,'SALAMA',15),
	(290,'SALCAJA',9),
	(291,'SALTAN (GRANADOS)',15),
	(292,'SAMAYAC',10),
	(293,'SAN AGUSTIN ACASAGUASTLAN',2),
	(294,'SAN ANDRES',17),
	(295,'SAN ANDRES HUISTA',13),
	(296,'SAN ANDRES ITZAPA',4),
	(297,'SAN ANDRES OSUNA (ESCUINTLA)',5),
	(298,'SAN ANDRES SAJCABAJA',14),
	(299,'SAN ANDRES SEMETABAJ',7),
	(300,'SAN ANDRES VILLA SECA',11),
	(301,'SAN ANDRES XECUL',8),
	(302,'SAN ANTONIO AGUAS CALIENTES',3),
	(303,'SAN ANTONIO HUISTA',13),
	(304,'SAN ANTONIO ILOTENANGO',14),
	(305,'SAN ANTONIO LA PAZ',2),
	(306,'SAN ANTONIO PALOPO',7),
	(307,'SAN ANTONIO SACATEPEQUEZ',12),
	(308,'SAN ANTONIO SUCHITEPEQUEZ',10),
	(309,'SAN BARTOLO',8),
	(310,'SAN BARTOLOME JOCOTENANGO',14),
	(311,'SAN BARTOLOME MILPAS ALTAS',3),
	(312,'SAN BENITO',17),
	(313,'SAN BERNANDINO',10),
	(314,'SAN CARLOS ALZATATE',21),
	(315,'SAN CARLOS SIJA',9),
	(316,'SAN CRISTOBAL ACASAGUASTLAN',2),
	(317,'SAN CRISTOBAL CUCHO',12),
	(318,'SAN CRISTOBAL FRONTERA (ATESCA',22),
	(319,'SAN CRISTOBAL TOTONICAPAN',8),
	(320,'SAN CRISTOBAL VERAPAZ',16),
	(321,'SAN DIEGO',19),
	(322,'SAN ESTEBAN (CHIQUIMULA)',20),
	(323,'SAN FELIPE',11),
	(324,'SAN FELIPE (LIVINGSTON)',18),
	(325,'SAN FRANCISCO',17),
	(326,'SAN FRANCISCO (EL RODEO)',12),
	(327,'SAN FRANCISCO EL ALTO',8),
	(328,'SAN FRANCISCO LA UNION',9),
	(329,'SAN FRANCISCO ZAPOTITLAN',10),
	(330,'SAN GABRIEL',10),
	(331,'SAN GABRIEL PANTZUY',15),
	(332,'SAN GASPAR IXCHIL',13),
	(333,'SAN JACINTO',20),
	(334,'SAN JERONIMO',15),
	(335,'SAN JERONIMO (EL TUMBADOR)',12),
	(336,'SAN JORGE',19),
	(337,'SAN JOSE',17),
	(338,'SAN JOSE (TECULUTAN)',19),
	(339,'SAN JOSE ACATEMPA',22),
	(340,'SAN JOSE CHACAYA',7),
	(341,'SAN JOSE CHIQUILAJA (QUETZ.)',9),
	(342,'SAN JOSE DEL GOLFO',1),
	(343,'SAN JOSE EL IDOLO',10),
	(344,'SAN JOSE IXTAL (NVO. PROGRESO)',12),
	(345,'SAN JOSE LA 20 (USPANTAN-IXCAN)',14),
	(346,'SAN JOSE LA ARADA',20),
	(347,'SAN JOSE OJETENAM',12),
	(348,'SAN JOSE PINULA',1),
	(349,'SAN JOSE POAQUIL',4),
	(350,'SAN JUAN ATITAN',13),
	(351,'SAN JUAN BAUTISTA',10),
	(352,'SAN JUAN CHAMELCO',16),
	(353,'SAN JUAN COTZAL',14),
	(354,'SAN JUAN DE ARANA (CUILAPA)',6),
	(355,'SAN JUAN DEL OBISPO',3),
	(356,'SAN JUAN ERMITA',20),
	(357,'SAN JUAN IXCOY',13),
	(358,'SAN JUAN LA LAGUNA',7),
	(359,'SAN JUAN OSTUNCALCO',9),
	(360,'SAN JUAN SACATEPEQUEZ',1),
	(361,'SAN JUAN TECUACO',6),
	(362,'SAN LORENZO',10),
	(363,'SAN LORENZO',12),
	(364,'SAN LORENZO',13),
	(365,'SAN LUCAS SACATEPEQUEZ',3),
	(366,'SAN LUCAS TOLIMAN',7),
	(367,'SAN LUIS',17),
	(368,'SAN LUIS JILOTEPEQUE',21),
	(369,'SAN MANUEL CHAPARRON',21),
	(370,'SAN MARCOS',12),
	(371,'SAN MARCOS HUISTA',13),
	(372,'SAN MARCOS LA LAGUNA',7),
	(373,'SAN MARTIN CUCHUMATAN',13),
	(374,'SAN MARTIN JILOTEPEQUE',4),
	(375,'SAN MARTIN SACATEPEQUEZ',9),
	(376,'SAN MARTIN ZAPOTITLAN',11),
	(377,'SAN MATEO',9),
	(378,'SAN MATEO IXTATAN',13),
	(379,'SAN MIGUEL ACATAN',13),
	(380,'SAN MIGUEL CHICAJ',15),
	(381,'SAN MIGUEL DUEÑAS',3),
	(382,'SAN MIGUEL IXTAGUACAN',12),
	(383,'SAN MIGUEL PANAN',10),
	(384,'SAN MIGUEL PETAPA',1),
	(385,'SAN MIGUEL SIGUILA',9),
	(386,'SAN PABLO',12),
	(387,'SAN PABLO JOCOPILAS',10),
	(388,'SAN PABLO LA LAGUNA',7),
	(389,'SAN PAOLO (ZACAPA)',19),
	(390,'SAN PEDRO AYAMPUC',1),
	(391,'SAN PEDRO CARCHA',16),
	(392,'SAN PEDRO JOCOPILAS',14),
	(393,'SAN PEDRO LA LAGUNA',7),
	(394,'SAN PEDRO NECTA',13),
	(395,'SAN PEDRO PINULA',21),
	(396,'SAN PEDRO SACATEPEQUEZ',1),
	(397,'SAN PEDRO SACATEPEQUEZ',12),
	(398,'SAN RAFAEL LA INDEPENDENCIA',13),
	(399,'SAN RAFAEL LAS FLORES',6),
	(400,'SAN RAFAEL PANAN (STA. BARBARA',10),
	(401,'SAN RAFAEL PETZAL',13),
	(402,'SAN RAFAEL PIE DE LA CUESTA',12),
	(403,'SAN RAYMUNDO',1),
	(404,'SAN SEBASTIAN',11),
	(405,'SAN SEBASTIAN (SAN MARCOS)',12),
	(406,'SAN SEBASTIAN COATAN',13),
	(407,'SAN SEBASTIAN HUEHUETENANGO',13),
	(408,'SAN VICENTE (CABANAS)',19),
	(409,'SAN VICENTE PACAYA',5),
	(410,'SANARATE',2),
	(411,'SANSARE',2),
	(412,'SANTA ANA',17),
	(413,'SANTA ANA HUISTA',13),
	(414,'SANTA ANA MIXTAN (NVA. CONCEPC)',5),
	(415,'SANTA APOLONIA',4),
	(416,'SANTA BARBARA',10),
	(417,'SANTA BARBARA',13),
	(418,'SANTA CATARINA BARAHONA',3),
	(419,'SANTA CATARINA IXTAHUACAN',7),
	(420,'SANTA CATARINA MITA',22),
	(421,'SANTA CATARINA PALOPO',7),
	(422,'SANTA CATARINA PINULA',1),
	(423,'SANTA CLARA LA LAGUNA',7),
	(424,'SANTA CRUZ BALANYA',4),
	(425,'SANTA CRUZ BARILLAS',13),
	(426,'SANTA CRUZ DEL QUICHE',14),
	(427,'SANTA CRUZ LA LAGUNA',7),
	(428,'SANTA CRUZ MULUA',11),
	(429,'SANTA CRUZ NARANJO',6),
	(430,'SANTA CRUZ VERAPAZ',16),
	(431,'SANTA ELENA',17),
	(432,'SANTA ELENA (CHIQUIMULA)',20),
	(433,'SANTA ELENA BARILLAS',1),
	(434,'SANTA EULALIA',13),
	(435,'SANTA INES (LOS AMATES)',18),
	(436,'SANTA LUCIA (ZACAPA)',19),
	(437,'SANTA LUCIA COTZUMALGUAPA',5),
	(438,'SANTA LUCIA IXCAMAL (SAN MARCO',12),
	(439,'SANTA LUCIA LA REFORMA',8),
	(440,'SANTA LUCIA MILPAS ALTAS',3),
	(441,'SANTA LUCIA UTATLAN',7),
	(442,'SANTA MARIA CAUQUE (SNTIAGO. S',3),
	(443,'SANTA MARIA CHIQUIMULA',8),
	(444,'SANTA MARIA DE JESUS',3),
	(445,'SANTA MARIA DE JESUS (ZUNIL)',9),
	(446,'SANTA MARIA IXHUATAN',6),
	(447,'SANTA MARIA VISITACION',7),
	(448,'SANTA RITA (GUASTATOYA)',2),
	(449,'SANTA ROSA CHUJUYUB',14),
	(450,'SANTA ROSA DE LIMA',6),
	(451,'SANTA ROSALIA (ZACAPA)',19),
	(452,'SANTIAGO ATITLAN',7),
	(453,'SANTIAGO CHIMALTENANGO',13),
	(454,'SANTIAGO SACATEPEQUEZ',3),
	(455,'SANTO DOMINGO SUCHITEPEQUEZ',10),
	(456,'SANTO DOMINGO XENACOJ',3),
	(457,'SANTO TOMAS LA UNION',10),
	(458,'SANTO TOMAS MILPASALTAS',3),
	(459,'SANTO TORIBIO (DOLORES)',17),
	(460,'SAYAXCHE',17),
	(461,'SEBOL (FRAY BARTOLOME)',16),
	(462,'SENAHU',16),
	(463,'SERCHIL (SAN MARCOS)',12),
	(464,'SIBANA (EL ASINTAL)',11),
	(465,'SIBILIA',9),
	(466,'SIBINAL',12),
	(467,'SIPACAPA',12),
	(468,'SIPACATE (LA GOMERA)',5),
	(469,'SIQUINALA',5),
	(470,'SN. MIGUEL AROCHE (CHIQUIMULILLA)',6),
	(471,'SOLOLA',7),
	(472,'SOLOMA',13),
	(473,'SUMPANGO',3),
	(474,'TACANA',12),
	(475,'TACTIC',16),
	(476,'TAHUEXCO (MAZATE)',10),
	(477,'TAJUMULCO',12),
	(478,'TAMAHU',16),
	(479,'TAXISCO',6),
	(480,'TECPAN GUATEMALA',4),
	(481,'TECTITAN',13),
	(482,'TECULUTAN',19),
	(483,'TECUN UMAN',12),
	(484,'TEJUTLA',12),
	(485,'TELEMAN (PANZOS)',16),
	(486,'TENEDORES (MORALES)',18),
	(487,'TIERRA COLORADA (SAN JOSE LA A',20),
	(488,'TIKAL (FLORES)',17),
	(489,'TIQUISATE',5),
	(490,'TIUCAL (ASUNCION MITA)',22),
	(491,'TOCACHE (SAN PABLO)',12),
	(492,'TODA LA REPUBLICA',1),
	(493,'TODOS SANTOS CUCHUMATAN',13),
	(494,'TOTONICAPAN',8),
	(495,'TRAPICHE GRANDE (CHUARRANCHO)',1),
	(496,'TUCURU',16),
	(497,'TULUMAJE',2),
	(498,'TULUMAJILLO (SN. AGUSTIN ACASA',2),
	(499,'UAXACTUN (FLORES)',17),
	(500,'USPANTAN',14),
	(501,'USUMATLAN',19),
	(502,'VADO HONDO (CHIQUIMULA)',20),
	(503,'VALLE NUEVO JALPATAGUA',22),
	(504,'VILLA CANALES',1),
	(505,'VILLA NUEVA',1),
	(506,'VUELTA GRANDE (SAN RAYMUNDO)',1),
	(507,'XACBAL',14),
	(508,'YEPOCAPA',4),
	(509,'YUPILTEPEQUE',22),
	(510,'ZACAPA',19),
	(511,'ZACUALPA',14),
	(512,'ZANJON SAN LORENZO (TECUN UMAN',12),
	(513,'ZAPOTITLAN',22),
	(514,'ZARAGOZA',4),
	(515,'ZUNIL',9),
	(516,'ZUNILITO',10),
	(901,'EL SALVADOR',99),
	(902,'HONDURAS',99),
	(903,'NICARAGUA',99),
	(904,'COSTA RICA',99),
	(905,'PANAMA',99),
	(906,'MEXICO',99),
	(907,'ESTADOS UNIDOS',99);

INSERT INTO countries
  (id, country_code, country_name)
VALUES
  (1, 'AF', 'Afganistán'),
  (2, 'AX', 'Islas Gland'),
  (3, 'AL', 'Albania'),
  (4, 'DE', 'Alemania'),
  (5, 'AD', 'Andorra'),
  (6, 'AO', 'Angola'),
  (7, 'AI', 'Anguilla'),
  (8, 'AQ', 'Antártida'),
  (9, 'AG', 'Antigua y Barbuda'),
  (10, 'AN', 'Antillas Holandesas'),
  (11, 'SA', 'Arabia Saudí'),
  (12, 'DZ', 'Argelia'),
  (13, 'AR', 'Argentina'),
  (14, 'AM', 'Armenia'),
  (15, 'AW', 'Aruba'),
  (16, 'AU', 'Australia'),
  (17, 'AT', 'Austria'),
  (18, 'AZ', 'Azerbaiyán'),
  (19, 'BS', 'Bahamas'),
  (20, 'BH', 'Bahréin'),
  (21, 'BD', 'Bangladesh'),
  (22, 'BB', 'Barbados'),
  (23, 'BY', 'Bielorrusia'),
  (24, 'BE', 'Bélgica'),
  (25, 'BZ', 'Belice'),
  (26, 'BJ', 'Benin'),
  (27, 'BM', 'Bermudas'),
  (28, 'BT', 'Bhután'),
  (29, 'BO', 'Bolivia'),
  (30, 'BA', 'Bosnia y Herzegovina'),
  (31, 'BW', 'Botsuana'),
  (32, 'BV', 'Isla Bouvet'),
  (33, 'BR', 'Brasil'),
  (34, 'BN', 'Brunéi'),
  (35, 'BG', 'Bulgaria'),
  (36, 'BF', 'Burkina Faso'),
  (37, 'BI', 'Burundi'),
  (38, 'CV', 'Cabo Verde'),
  (39, 'KY', 'Islas Caimán'),
  (40, 'KH', 'Camboya'),
  (41, 'CM', 'Camerún'),
  (42, 'CA', 'Canadá'),
  (43, 'CF', 'República Centroafricana'),
  (44, 'TD', 'Chad'),
  (45, 'CZ', 'República Checa'),
  (46, 'CL', 'Chile'),
  (47, 'CN', 'China'),
  (48, 'CY', 'Chipre'),
  (49, 'CX', 'Isla de Navidad'),
  (50, 'VA', 'Ciudad del Vaticano'),
  (51, 'CC', 'Islas Cocos'),
  (52, 'CO', 'Colombia'),
  (53, 'KM', 'Comoras'),
  (54, 'CD', 'República Democrática del Congo'),
  (55, 'CG', 'Congo'),
  (56, 'CK', 'Islas Cook'),
  (57, 'KP', 'Corea del Norte'),
  (58, 'KR', 'Corea del Sur'),
  (59, 'CI', 'Costa de Marfil'),
  (60, 'CR', 'Costa Rica'),
  (61, 'HR', 'Croacia'),
  (62, 'CU', 'Cuba'),
  (63, 'DK', 'Dinamarca'),
  (64, 'DM', 'Dominica'),
  (65, 'DO', 'República Dominicana'),
  (66, 'EC', 'Ecuador'),
  (67, 'EG', 'Egipto'),
  (68, 'SV', 'El Salvador'),
  (69, 'AE', 'Emiratos Árabes Unidos'),
  (70, 'ER', 'Eritrea'),
  (71, 'SK', 'Eslovaquia'),
  (72, 'SI', 'Eslovenia'),
  (73, 'ES', 'España'),
  (74, 'UM', 'Islas ultramarinas de Estados Unidos'),
  (75, 'US', 'Estados Unidos'),
  (76, 'EE', 'Estonia'),
  (77, 'ET', 'Etiopía'),
  (78, 'FO', 'Islas Feroe'),
  (79, 'PH', 'Filipinas'),
  (80, 'FI', 'Finlandia'),
  (81, 'FJ', 'Fiyi'),
  (82, 'FR', 'Francia'),
  (83, 'GA', 'Gabón'),
  (84, 'GM', 'Gambia'),
  (85, 'GE', 'Georgia'),
  (86, 'GS', 'Islas Georgias del Sur y Sandwich del Sur'),
  (87, 'GH', 'Ghana'),
  (88, 'GI', 'Gibraltar'),
  (89, 'GD', 'Granada'),
  (90, 'GR', 'Grecia'),
  (91, 'GL', 'Groenlandia'),
  (92, 'GP', 'Guadalupe'),
  (93, 'GU', 'Guam'),
  (94, 'GT', 'Guatemala'),
  (95, 'GF', 'Guayana Francesa'),
  (96, 'GN', 'Guinea'),
  (97, 'GQ', 'Guinea Ecuatorial'),
  (98, 'GW', 'Guinea-Bissau'),
  (99, 'GY', 'Guyana'),
  (100, 'HT', 'Haití'),
  (101, 'HM', 'Islas Heard y McDonald'),
  (102, 'HN', 'Honduras'),
  (103, 'HK', 'Hong Kong'),
  (104, 'HU', 'Hungría'),
  (105, 'IN', 'India'),
  (106, 'ID', 'Indonesia'),
  (107, 'IR', 'Irán'),
  (108, 'IQ', 'Iraq'),
  (109, 'IE', 'Irlanda'),
  (110, 'IS', 'Islandia'),
  (111, 'IL', 'Israel'),
  (112, 'IT', 'Italia'),
  (113, 'JM', 'Jamaica'),
  (114, 'JP', 'Japón'),
  (115, 'JO', 'Jordania'),
  (116, 'KZ', 'Kazajstán'),
  (117, 'KE', 'Kenia'),
  (118, 'KG', 'Kirguistán'),
  (119, 'KI', 'Kiribati'),
  (120, 'KW', 'Kuwait'),
  (121, 'LA', 'Laos'),
  (122, 'LS', 'Lesotho'),
  (123, 'LV', 'Letonia'),
  (124, 'LB', 'Líbano'),
  (125, 'LR', 'Liberia'),
  (126, 'LY', 'Libia'),
  (127, 'LI', 'Liechtenstein'),
  (128, 'LT', 'Lituania'),
  (129, 'LU', 'Luxemburgo'),
  (130, 'MO', 'Macao'),
  (131, 'MK', 'ARY Macedonia'),
  (132, 'MG', 'Madagascar'),
  (133, 'MY', 'Malasia'),
  (134, 'MW', 'Malawi'),
  (135, 'MV', 'Maldivas'),
  (136, 'ML', 'Malí'),
  (137, 'MT', 'Malta'),
  (138, 'FK', 'Islas Malvinas'),
  (139, 'MP', 'Islas Marianas del Norte'),
  (140, 'MA', 'Marruecos'),
  (141, 'MH', 'Islas Marshall'),
  (142, 'MQ', 'Martinica'),
  (143, 'MU', 'Mauricio'),
  (144, 'MR', 'Mauritania'),
  (145, 'YT', 'Mayotte'),
  (146, 'MX', 'México'),
  (147, 'FM', 'Micronesia'),
  (148, 'MD', 'Moldavia'),
  (149, 'MC', 'Mónaco'),
  (150, 'MN', 'Mongolia'),
  (151, 'MS', 'Montserrat'),
  (152, 'MZ', 'Mozambique'),
  (153, 'MM', 'Myanmar'),
  (154, 'NA', 'Namibia'),
  (155, 'NR', 'Nauru'),
  (156, 'NP', 'Nepal'),
  (157, 'NI', 'Nicaragua'),
  (158, 'NE', 'Níger'),
  (159, 'NG', 'Nigeria'),
  (160, 'NU', 'Niue'),
  (161, 'NF', 'Isla Norfolk'),
  (162, 'NO', 'Noruega'),
  (163, 'NC', 'Nueva Caledonia'),
  (164, 'NZ', 'Nueva Zelanda'),
  (165, 'OM', 'Omán'),
  (166, 'NL', 'Países Bajos'),
  (167, 'PK', 'Pakistán'),
  (168, 'PW', 'Palau'),
  (169, 'PS', 'Palestina'),
  (170, 'PA', 'Panamá'),
  (171, 'PG', 'Papúa Nueva Guinea'),
  (172, 'PY', 'Paraguay'),
  (173, 'PE', 'Perú'),
  (174, 'PN', 'Islas Pitcairn'),
  (175, 'PF', 'Polinesia Francesa'),
  (176, 'PL', 'Polonia'),
  (177, 'PT', 'Portugal'),
  (178, 'PR', 'Puerto Rico'),
  (179, 'QA', 'Qatar'),
  (180, 'GB', 'Reino Unido'),
  (181, 'RE', 'Reunión'),
  (182, 'RW', 'Ruanda'),
  (183, 'RO', 'Rumania'),
  (184, 'RU', 'Rusia'),
  (185, 'EH', 'Sahara Occidental'),
  (186, 'SB', 'Islas Salomón'),
  (187, 'WS', 'Samoa'),
  (188, 'AS', 'Samoa Americana'),
  (189, 'KN', 'San Cristóbal y Nevis'),
  (190, 'SM', 'San Marino'),
  (191, 'PM', 'San Pedro y Miquelón'),
  (192, 'VC', 'San Vicente y las Granadinas'),
  (193, 'SH', 'Santa Helena'),
  (194, 'LC', 'Santa Lucía'),
  (195, 'ST', 'Santo Tomé y Príncipe'),
  (196, 'SN', 'Senegal'),
  (197, 'CS', 'Serbia y Montenegro'),
  (198, 'SC', 'Seychelles'),
  (199, 'SL', 'Sierra Leona'),
  (200, 'SG', 'Singapur'),
  (201, 'SY', 'Siria'),
  (202, 'SO', 'Somalia'),
  (203, 'LK', 'Sri Lanka'),
  (204, 'SZ', 'Suazilandia'),
  (205, 'ZA', 'Sudáfrica'),
  (206, 'SD', 'Sudán'),
  (207, 'SE', 'Suecia'),
  (208, 'CH', 'Suiza'),
  (209, 'SR', 'Surinam'),
  (210, 'SJ', 'Svalbard y Jan Mayen'),
  (211, 'TH', 'Tailandia'),
  (212, 'TW', 'Taiwán'),
  (213, 'TZ', 'Tanzania'),
  (214, 'TJ', 'Tayikistán'),
  (215, 'IO', 'Territorio Británico del Océano Índico'),
  (216, 'TF', 'Territorios Australes Franceses'),
  (217, 'TL', 'Timor Oriental'),
  (218, 'TG', 'Togo'),
  (219, 'TK', 'Tokelau'),
  (220, 'TO', 'Tonga'),
  (221, 'TT', 'Trinidad y Tobago'),
  (222, 'TN', 'Túnez'),
  (223, 'TC', 'Islas Turcas y Caicos'),
  (224, 'TM', 'Turkmenistán'),
  (225, 'TR', 'Turquía'),
  (226, 'TV', 'Tuvalu'),
  (227, 'UA', 'Ucrania'),
  (228, 'UG', 'Uganda'),
  (229, 'UY', 'Uruguay'),
  (230, 'UZ', 'Uzbekistán'),
  (231, 'VU', 'Vanuatu'),
  (232, 'VE', 'Venezuela'),
  (233, 'VN', 'Vietnam'),
  (234, 'VG', 'Islas Vírgenes Británicas'),
  (235, 'VI', 'Islas Vírgenes de los Estados Unidos'),
  (236, 'WF', 'Wallis y Futuna'),
  (237, 'YE', 'Yemen'),
  (238, 'DJ', 'Yibuti'),
  (239, 'ZM', 'Zambia'),
  (240, 'ZW', 'Zimbabue');

INSERT INTO shared_catalog
  (id, name, type, status, parent_id)
VALUES
  (1, 'Empresa/Entidad', 1, 'ACTIVO', 0),
  (2, 'Persona Individual', 1, 'ACTIVO', 0),
  (3, 'Grupo', 1, 'ACTIVO', 0),
  (4, 'Abogado', 2, 'ACTIVO', 0),
  (5, 'Procurador', 2, 'ACTIVO', 0),
  (6, 'Administrativo', 2, 'ACTIVO', 0),
  (7, 'Fiscal', 5, 'ACTIVO', 0),
  (8, 'Notarial', 5, 'ACTIVO', 0),
  (9, 'Forense', 5, 'ACTIVO', 0),
  (10, 'Q0.50', 6, 'ACTIVO', 0),
  (11, 'Q1', 6, 'ACTIVO', 0),
  (12, 'Q2', 6, 'ACTIVO', 0),
  (13, 'Q3', 6, 'ACTIVO', 0),
  (14, 'Q4', 6, 'ACTIVO', 0),
  (15, 'Q5', 6, 'ACTIVO', 0),
  (16, 'Q10', 6, 'ACTIVO', 0),
  (17, 'Q25', 6, 'ACTIVO', 0),
  (18, 'Q40', 6, 'ACTIVO', 0),
  (19, 'Q80', 6, 'ACTIVO', 0),
  (20, 'Q100', 6, 'ACTIVO', 0),
  (21, '1 - Solicitud', 7, 'ACTIVO', 0),
  (22, '2 - Entrega/Salida', 7, 'ACTIVO', 0),
  (23, '3 - Compra/Entrada', 7, 'ACTIVO', 0),
  (24, 'Todos', 8, 'ACTIVO', 0),
  (25, 'Hoy', 8, 'ACTIVO', 0),
  (26, 'Ayer', 8, 'ACTIVO', 0),
  (27, 'Anteayer', 8, 'ACTIVO', 0),
  (28, 'Semana actual', 8, 'ACTIVO', 0),
  (29, 'Semana pasada', 8, 'ACTIVO', 0),
  (30, 'Semana antepasada', 8, 'ACTIVO', 0),
  (31, 'Mes actual', 8, 'ACTIVO', 0),
  (32, 'Mes pasado', 8, 'ACTIVO', 0),
  (33, 'Mes antepasado', 8, 'ACTIVO', 0),
  (34, 'Año actual', 8, 'ACTIVO', 0),
  (35, 'Año pasado', 8, 'ACTIVO', 0),
  (36, 'Año antepasado', 8, 'ACTIVO', 0);

INSERT INTO record_type
  (id, name, status)
VALUES
  (1, 'CIVIL', 'ACTIVO'),
  (2, 'MERCANTIL', 'ACTIVO'),
  (3, 'NOTARIADO', 'ACTIVO'),
  (4, 'JUDICIAL', 'ACTIVO'),
  (5, 'MARCAS', 'ACTIVO'),
  (6, 'ADMVO, FISCAL, LABORAL Y PENAL', 'ACTIVO');

INSERT INTO record_subtype
  (id, name, status, record_type_id)
VALUES
  (1, 'Persona Individual', 'ACTIVO', 1),
  (2, 'Contratos', 'ACTIVO', 1),
  (3, 'Bienes', 'ACTIVO', 1),
  (4, 'Mandatos', 'ACTIVO', 1),
  (5, 'Proceso Sucesorio', 'ACTIVO', 1),
  (6, 'Otros', 'ACTIVO', 1),
  (7, 'Sociedades', 'ACTIVO', 2),
  (8, 'Nombramientos', 'ACTIVO', 2),
  (9, 'Contratos', 'ACTIVO', 2),
  (10, 'Otros', 'ACTIVO', 2),
  (11, 'Legalizaciones', 'ACTIVO', 3),
  (12, 'Protocolizaciones', 'ACTIVO', 3),
  (13, 'Actas Notariales', 'ACTIVO', 3),
  (14, 'Otros', 'ACTIVO', 3),
  (15, 'Primera Instancia', 'ACTIVO', 4),
  (16, 'Apelaciones', 'ACTIVO', 4),
  (17, 'Amparos', 'ACTIVO', 4),
  (18, 'Inconstitucionalidades', 'ACTIVO', 4),
  (19, 'Contencioso Administrativo', 'ACTIVO', 4),
  (20, 'Casación', 'ACTIVO', 4),
  (21, 'Incidente', 'ACTIVO', 4),
  (22, 'Marca', 'ACTIVO', 5),
  (23, 'Nombre comercial', 'ACTIVO', 5),
  (24, 'Señal de publicidad', 'ACTIVO', 5),
  (25, 'Emblema', 'ACTIVO', 5),
  (26, 'Proced. ante autoridades de Gobierno', 'ACTIVO', 6),
  (27, 'Recursos', 'ACTIVO', 6),
  (28, 'Ministerio Público', 'ACTIVO', 6);

INSERT INTO clients
    (id, created_at, updated_at, created_by, updated_by, acronym, client_type, last_name, name, nit, status)
VALUES
    (1, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 1, 2, null, 1, 'Perez', 'Gladis', 'C/F', 'ACTIVO'),
    (2, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 1, 2, null, 2, 'Arroyo', 'Oswaldo', 'C/F', 'ACTIVO'),
    (3, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 1, 2, null, 2, 'Solis', 'Ada', 'C/F', 'ACTIVO'),
    (4, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 1, 2, null, 2, 'Arriaza', 'Jacky', 'C/F', 'ACTIVO'),
    (5, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, null, 2, 'Arroyo', 'Walter', 'C/F', 'ACTIVO'),
    (6, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 1, 2, null, 2, 'Arroyo', 'Jorge', 'C/F', 'ACTIVO'),
    (7, '2020-09-29 16:47:15', '2020-09-29 16:47:15', 2, 2, 'POPU', 3, null, 'Industria La Popular S.A.', '33494-4', 'ACTIVO');

INSERT INTO addresses
    (id, address, address_type, entity_id, entity_type, municipality_id, status, zone)
VALUES
    (1, 'Via 3 5-42', 2, 7, 1, 1, 'ACTIVO', '4');

INSERT INTO contact_entity
    (id, contact_address, contact_email, entity_id, entity_type, contact_name, contact_phone, status, contact_type)
VALUES
    (1, 'Km. 15.5 Carretera a Villa Canales, Terrazas de Villa Flores Torre 1 Apto 203', 'blackhamet@gmail.com', 7, 1, 'Jorge Luis Arroyo Perez', '45270422', 'ACTIVO', 1);

INSERT INTO personal_info
    (id, birthday, doc_emmit, doc_num, doc_type, entity_id, entity_type, lawyer, lawyer_assistant, lawyer_jr, observation, sex_type)
VALUES
    (1, null, '', '', null, 7, 1, 1, 2, 4, '', null);

INSERT INTO phone_contact
    (id, entity_id, entity_type, phone_number, phone_type, status)
VALUES
    (1, 7, 1, '23020003', 4, 'ACTIVO');

INSERT INTO activities
  (id, name, status, created_by, updated_by, created_at, updated_at)
VALUES
  (1, 'Gasto de registros varios', 'ACTIVO', 1, 2, NOW(), NOW()),
  (2, 'Actividad 1', 'ACTIVO', 1, 2, NOW(), NOW()),
  (3, 'Actividad 2', 'ACTIVO', 1, 2, NOW(), NOW()),
  (4, 'ENTREGAR CONTRATO FUNDACION MIRAFLORES', 'ACTIVO', 1, 2, NOW(), NOW()),
  (5, 'Entregar Escritura en Banco Industrial para cotejar', 'ACTIVO', 1, 2, NOW(), NOW()),
  (6, 'Recoger checque de la factura No. 4584 de la serie B', 'ACTIVO', 1, 2, NOW(), NOW()),
  (7, 'Entregar factura No. 4534 y Recibo de Caja No. 1943', 'ACTIVO', 1, 2, NOW(), NOW());

INSERT INTO institutions
  (id, name, short_name, status, created_by, updated_by, created_at, updated_at)
VALUES
  (1, 'Registro Mercantil', 'RM', 'ACTIVO', 1, 2, NOW(), NOW()),
  (2, 'Superintendencia de Bancos', 'SPB', 'ACTIVO', 1, 2, NOW(), NOW()),
  (3, 'Registro de la Propiedad Inmueble', 'Reg. Prop. Inm.', 'ACTIVO', 1, 2, NOW(), NOW()),
  (4, 'Registro de la Propiedad Intelectual', 'Reg. Prop. Int.', 'ACTIVO', 1, 2, NOW(), NOW()),
  (5, 'Municipalidad de Guatemala', 'Muni. Guate.', 'ACTIVO', 1, 2, NOW(), NOW()),
  (6, 'Tribunales', 'Tribunales', 'ACTIVO', 1, 2, NOW(), NOW()),
  (7, 'Superintendencia de Administración Tributaria', 'SAT', 'ACTIVO', 1, 2, NOW(), NOW()),
  (8, 'Instituto Guatemalteco de Seguridad Social', 'IGSS', 'ACTIVO', 1, 2, NOW(), NOW()),
  (9, 'Ministerio Energía y Minas', 'Min. Energía y Mir', 'ACTIVO', 1, 2, NOW(), NOW()),
  (10, 'Instituto Nacional de Bosques', 'INAB', 'ACTIVO', 1, 2, NOW(), NOW()),
  (11, 'Dirección General de Migración', 'Migración', 'ACTIVO', 1, 2, NOW(), NOW()),
  (12, 'Dirección de Catastro y Avalúo Bienes Inmuebles', 'DICABI', 'ACTIVO', 1, 2, NOW(), NOW()),
  (13, 'Procuraduría General de la Nación', 'PGN', 'ACTIVO', 1, 2, NOW(), NOW()),
  (14, 'Ministerio Público', 'MP', 'ACTIVO', 1, 2, NOW(), NOW()),
  (15, 'Archivo de Protocolos', 'Archivo de Protoc', 'ACTIVO', 1, 2, NOW(), NOW()),
  (16, 'Ministerio Relaciones Exteriores', 'Min. Relaciones Ext', 'ACTIVO', 1, 2, NOW(), NOW()),
  (17, 'Ministerio de Gobernación', 'Min. Gob.', 'ACTIVO', 1, 2, NOW(), NOW()),
  (18, 'Registro Nacional de Personas', 'RENAP', 'ACTIVO', 1, 2, NOW(), NOW()),
  (19, 'Ministerio de Trabajo', 'Min. Trabajo', 'ACTIVO', 1, 2, NOW(), NOW()),
  (20, 'Consulados', 'Consulados', 'ACTIVO', 1, 2, NOW(), NOW()),
  (21, 'CEMENTERIOS', 'CEMENTERIOS', 'ACTIVO', 1, 2, NOW(), NOW()),
  (22, 'Ministerio de Ambiente y Recursos Naturales', 'MARN', 'ACTIVO', 1, 2, NOW(), NOW()),
  (23, 'Registro de Personas Jurídicas', 'Registro de Persor', 'ACTIVO', 1, 2, NOW(), NOW()),
  (24, 'Registro de Garantías Mobiliarias', 'RGM', 'ACTIVO', 1, 2, NOW(), NOW()),
  (25, 'Corte Suprema de Justicia', 'Corte Suprema', 'ACTIVO', 1, 2, NOW(), NOW()),
  (99, 'Otros', 'Otros', 'ACTIVO', 1, 2, NOW(), NOW());

INSERT INTO status_flow
  (id, entity_type, prev_status, next_status, privilege)
VALUES
  (1, 3, 'ELABORADO', 'PENDIENTE', 'EXPEDIENTE_CAMBIA_ESTADO'),
  (2, 3, 'PENDIENTE', 'AUTORIZADO', 'EXPEDIENTE_AUTORIZA_RECHAZA'),
  (3, 3, 'PENDIENTE', 'RECHAZADO', 'EXPEDIENTE_AUTORIZA_RECHAZA'),
  (4, 3, 'PENDIENTE', 'ELABORADO', 'EXPEDIENTE_CAMBIA_ESTADO'),
  (5, 3, 'AUTORIZADO', 'TERMINADO', 'EXPEDIENTE_CAMBIA_ESTADO'),
  (6, 4, 'ABIERTO', 'PROCESO', 'AGENDA_PROCURADOR_CAMBIO_ESTADO'),
  (7, 4, 'ABIERTO', 'ELIMINADO', 'AGENDA_PROCURADOR_CAMBIO_ESTADO'),
  (8, 4, 'PROCESO', 'CERRADO', 'AGENDA_PROCURADOR_CAMBIO_ESTADO'),
  (9, 5, 'ABIERTO', 'TERMINADO', 'AGENDA_PROCURADOR_CAMBIO_ESTADO'),
  (10, 5, 'ABIERTO', 'PROCESO', 'AGENDA_PROCURADOR_CAMBIO_ESTADO'),
  (11, 6, 'ELABORADO', 'PENDIENTE', 'TIMBRE_FISCAL_INVENTARIO_CAMBIA_ESTADO'),
  (12, 6, 'PENDIENTE', 'ELABORADO', 'TIMBRE_FISCAL_INVENTARIO_CAMBIA_ESTADO'),
  (13, 6, 'PENDIENTE', 'AUTORIZADO', 'TIMBRE_FISCAL_INVENTARIO_AUTORIZA'),
  (14, 6, 'PENDIENTE', 'RECHAZADO', 'TIMBRE_FISCAL_INVENTARIO_AUTORIZA'),
  (15, 7, 'ELABORADO', 'PENDIENTE', 'LIQUIDACION_FACTURA_CAMBIA_ESTADO'),
  (16, 7, 'PENDIENTE', 'REVISION', 'LIQUIDACION_FACTURA_CAMBIA_ESTADO'),
  (17, 7, 'REVISION', 'AUTORIZADO', 'LIQUIDACION_FACTURA_AUTORIZA'),
  (18, 7, 'REVISION', 'RECHAZADO', 'LIQUIDACION_FACTURA_AUTORIZA'),
  (19, 7, 'RECHAZADO', 'ELABORADO', 'LIQUIDACION_FACTURA_CAMBIA_ESTADO'),
  (20, 7, 'AUTORIZADO', 'FACTURADO', 'LIQUIDACION_FACTURA_GENERAR_FACTURA'),
  (21, 8, 'ELABORADO', 'ACTIVO', 'DOCUMENTOS_GASTOS_CAMBIA_ESTADO'),
  (22, 8, 'ELABORADO', 'ELIMINADO', 'DOCUMENTOS_GASTOS_CAMBIA_ESTADO'),
  (23, 9, 'EN_EDICION', 'GENERADA', 'FACTURA_AUTORIZA'),
  (24, 9, 'EN_EDICION', 'ELIMINADO', 'FACTURA_CAMBIA_ESTADO'),
  (25, 9, 'GENERADA', 'ANULADO', 'FACTURA_CAMBIA_ESTADO'),
  (26, 10, 'ELABORADO', 'APLICADO', 'RECIBO_FACTURA_CAMBIA_ESTADO'),
  (27, 10, 'ELABORADO', 'ELIMINADO', 'RECIBO_FACTURA_CAMBIA_ESTADO');

INSERT INTO app_config 
  (id, created_at, updated_at, company_id, config_name, config_value, status)
VALUES 
  (1, NOW(), NOW(), 1, 'MONTO_PERMITIDO_CIERRE_LOCAL', '999999', 'ACTIVO'),
  (2, NOW(), NOW(), 1, 'MONTO_PERMITIDO_CIERRE_EXTRANJERO', '999999', 'ACTIVO'),
  (3, NOW(), NOW(), 1, 'MONEDA_LOCAL', '1', 'ACTIVO'),
  (4, NOW(), NOW(), 1, 'MONEDA_EXTRANJERA', '2', 'ACTIVO'),
  (5, NOW(), NOW(), 1, 'DIAS_EXPIRACION', '20', 'ACTIVO'),
  (6, NOW(), NOW(), 1, 'FILE_PATH', 'uploads', 'ACTIVO'),
  (7, NOW(), NOW(), 1, 'EXPENSES_NOT_AFFECTED', '1', 'ACTIVO'),
  (8, NOW(), NOW(), 1, 'RECEIPT_NONFREE_DEFAULT_DESCRIPTION', 'Por servicios legales prestados', 'ACTIVO'),
  (9, NOW(), NOW(), 1, 'RECEIPT_FREE_DEFAULT_DESCRIPTION', 'Por servicios adicionales prestados', 'ACTIVO'),
  (10, NOW(), NOW(), 1, 'IVA_PORCENTAJE', '12', 'ACTIVO');

INSERT INTO employees 
  (id, created_at, updated_at, created_by, updated_by, academic_level, address, amount_per_hour, cel_phone, child_no, civil_status, name, home_phone, igss, languages, nit, position, status, last_name, title, village) 
VALUES 
  -- (1,'2020-01-20 17:58:31','2020-01-20 17:58:31',2,2,'','Ciudad',
  -- 35,'45270422',0,'2','Admin','24200200','','','','67503691',4,'','DELETED','Admin','','');
  (1,NOW(),NOW(),2,2,'','Km. 15.5 Carretera a Villa Canales, Terrazas de Villa Flores Torre 1 Apto 203', 35,'45270422',0,'2','Jorge','24200200','','','67503691',1,'ACTIVO','Arroyo','',''),
  (2,NOW(),NOW(),2,2,'','7 Calle 5-55 Zona 1',15,'45270422',0,'1','Francisco','45270422','','', '36368296',2,'ACTIVO','Pineda','',''),
  (3,NOW(),NOW(),2,2,'','Km. 15.5 Carretera a Villa Canales, Terrazas de Villa Flores Torre 1 Apto 203',0, '45270422',0,'1','Julio','24200200','','','806671k',2,'ACTIVO','Lopez','',''),
  (4,NOW(),NOW(),2,2,'','Condado Catalina, Jarque J8 Zona 6 Villa Nueva', 35,'45270422',0,'2','Walter','24200200','','','67503691',1,'ACTIVO','Arroyo','','');

INSERT INTO product_property 
	(id, product_type, property_name, status, property_column_name) 
VALUES
  (1, 'TIMBRES', 'Tipo', 'ACTIVO', 'stamp_type'),
	(2, 'TIMBRES', 'Designación', 'ACTIVO', 'designation_type'),
  (3, 'TIMBRES', 'Año', 'ACTIVO', 'year');

INSERT INTO products 
(id,created_at,updated_at,created_by,updated_by,min_quantity,product_code,product_existence,product_inv_type,product_name,status,unit_value) 
VALUES 
    (1,'2020-03-26 13:14:01','2020-03-26 13:14:01',2,2,10,'F0',36,'TIMBRES','Timbre Fiscal de Q0.50','ACTIVO',0.5),
    (2,'2020-03-26 13:14:27','2020-03-26 13:14:27',2,2,10,'F1',20,'TIMBRES','Timbre Fiscal de Q1.00','ACTIVO',1),
    (3,'2020-03-26 13:15:12','2020-03-26 13:15:12',2,2,10,'F2',17,'TIMBRES','Timbre Fiscal de Q2.00','ACTIVO',2),
    (4,'2020-03-26 13:15:37','2020-03-26 13:15:37',2,2,10,'F3',16,'TIMBRES','Timbre Fiscal de Q3.00','ACTIVO',3),
    (5,'2020-03-26 13:16:08','2020-03-26 13:16:08',2,2,10,'F4',15,'TIMBRES','Timbre Fiscal de Q4.00','ACTIVO',4),
    (6,'2020-03-26 13:16:33','2020-03-26 13:16:33',2,2,10,'F5',10,'TIMBRES','Timbre Fiscal de Q5.00','ACTIVO',5),
    (7,'2020-03-26 13:16:58','2020-03-26 13:16:58',2,2,10,'F10',0,'TIMBRES','Timbre Fiscal de Q10.00','ACTIVO',10),
    (8,'2020-03-26 13:17:30','2020-03-26 13:17:30',2,2,10,'F25',0,'TIMBRES','Timbre Fiscal de Q25.00','ACTIVO',25),
    (9,'2020-03-26 13:17:58','2020-03-26 13:17:58',2,2,10,'F40',0,'TIMBRES','Timbre Fiscal de Q40.00','ACTIVO',40),
    (10,'2020-03-26 13:18:56','2020-03-26 13:18:56',2,2,10,'F80',0,'TIMBRES','Timbre Fiscal de Q80.00','ACTIVO',80),
    (11,'2020-03-26 13:19:25','2020-03-26 13:19:25',2,2,10,'F100',0,'TIMBRES','Timbre Fiscal de Q100.00','ACTIVO',100);

INSERT INTO products_detail
	(id,product_id,product_property,property_value) 
VALUES 
	(1,1,1,'7'),
	(2,1,2,'10'),
	(3,1,3,'2020'),
  (4,2,1,'7'),
  (5,2,2,'11'),
  (6,2,3,'2020'),
  (7,3,1,'7'),
  (8,3,2,'12'),
  (9,3,3,'2020'),
  (10,4,1,'7'),
  (11,4,2,'13'),
  (12,4,3,'2020'),
  (13,5,1,'7'),
  (14,5,2,'14'),
  (15,5,3,'2020'),
  (16,6,1,'7'),
  (17,6,2,'15'),
  (18,6,3,'2020'),
  (19,7,1,'7'),
  (20,7,2,'16'),
  (21,7,3,'2020'),
  (22,8,1,'7'),
  (23,8,2,'17'),
  (24,8,3,'2020'),
  (25,9,1,'7'),
  (26,9,2,'18'),
  (27,9,3,'2020'),
  (28,10,1,'7'),
  (29,10,2,'19'),
  (30,10,3,'2020'),
  (31,11,1,'7'),
  (32,11,2,'20'),
  (33,11,3,'2020');

INSERT INTO providers
    (id, created_at, created_by,  code, name, status)
VALUES
    (1,NOW(), 1,'737810-6','Operadora de Tiendas, S.A.','ACTIVO'),
    (2,NOW(), 1,'674923-2','Maynor Gamarro','ACTIVO'),
    (3,NOW(), 1,'RM','Registro Mercantil','ACTIVO'),
    (4,NOW(), 1,'RPI','Registro Propiedad Intelectual','ACTIVO'),
    (5,NOW(), 1,'438506-3','Victorino Cantalicio Quiroa Mortual','ACTIVO'),
    (6,NOW(), 1,'RP','Registro de la Propiedad Inmueble','ACTIVO'),
    (7,NOW(), 1,'DIC','DICABI','ACTIVO'),
    (8,NOW(), 1,'VA','VARIOS SIN COMPROBANTE','ACTIVO'),
    (9,NOW(), 1,'AP','Archivo de Protocolos','ACTIVO'),
    (10,NOW(), 1,'ZZ','Proveedor Sin Comprobante','ACTIVO'),
    (11,NOW(), 1,'1277190-2','Gasolinera Shell Santa Rosa','ACTIVO'),
    (12,NOW(), 1,'MU','Municipalidad de Guatemala','ACTIVO'),
    (13,NOW(), 1,'MG','Ministerio de Gobernación','ACTIVO'),
    (14,NOW(), 1,'575081-4','Cargo Expreso, S.A.','ACTIVO'),
    (15,NOW(), 1,'601445-3','Codicomsa','ACTIVO'),
    (16,NOW(), 1,'1267812-0','Carlos Romeo Guevara De Paz','ACTIVO'),
    (17,NOW(), 1,'586092-K','La Hora, S.A.','ACTIVO'),
    (18,NOW(), 1,'528206-3','Julia Diéguez de Jacinto','ACTIVO'),
    (19,NOW(), 1,'531427-5','Automarket Limited','ACTIVO'),
    (20,NOW(), 1,'2624488-8','Euro Mantenimientos, S.A.','ACTIVO'),
    (21,NOW(), 1,'571802-3','Luis Roberto Hernández González','ACTIVO'),
    (22,NOW(), 1,'3144552-7','Comsesa','ACTIVO'),
    (23,NOW(), 1,'460722-8','Servicentro Gerona, S.A.','ACTIVO'),
    (24,NOW(), 1,'980928-7','Constructoa Marhnos, S.A.','ACTIVO'),
    (25,NOW(), 1,'688254-4','Marco Vinicio Rivera','ACTIVO'),
    (26,NOW(), 1,'618862-1','Macana, S.A.','ACTIVO'),
    (27,NOW(), 1,'150350-2','Tulio José Ovalle Mont','ACTIVO'),
    (28,NOW(), 1,'212882-9','José Artemio Ordóñez Pérez','ACTIVO'),
    (29,NOW(), 1,'390709-0','Raúl Rodolfo Méndez Camas','ACTIVO'),
    (30,NOW(), 1,'705945-0','César Stuardo Nelson Monroy','ACTIVO'),
    (31,NOW(), 1,'103060-4','Winston Leslie Solé Hernández','ACTIVO'),
    (32,NOW(), 1,'SAT','Superintendencia de Administración Tributaria','ACTIVO'),
    (33,NOW(), 1,'250471-5','Raúl Antonio Polanco','ACTIVO'),
    (34,NOW(), 1,'2853232-5','Uri Josué García García','ACTIVO'),
    (35,NOW(), 1,'630465-6','Representaciones Comerciales Primavera, S.A.','ACTIVO'),
    (36,NOW(), 1,'482270-6','Meykos, S.A.','ACTIVO'),
    (37,NOW(), 1,'589201-5','Promotora Internacional El Triángulo, S.A.','ACTIVO'),
    (38,NOW(), 1,'1826251-1','Samuel Sique Aguilar','ACTIVO'),
    (39,NOW(), 1,'599635-K','Litegua, S.A.','ACTIVO'),
    (40,NOW(), 1,'EV','Embajada de Venezuela','ACTIVO'),
    (41,NOW(), 1,'744600-4','Inmobiliaria Apollo, S.A.','ACTIVO'),
    (42,NOW(), 1,'330926-6','Rebeca Jeannette Batres y Cía. Ltda.','ACTIVO'),
    (43,NOW(), 1,'38863-7','Comunidad Castillo Lara','ACTIVO'),
    (44,NOW(), 1,'11642-4','Activos, S.A.','ACTIVO'),
    (45,NOW(), 1,'747058-4','Centro de Negocios, S.A.','ACTIVO'),
    (46,NOW(), 1,'624805-5','Julio Abril, Hnos. y Cía. Soc. Colectiva','ACTIVO'),
    (47,NOW(), 1,'1277387-5','Cajolú, S.A.','ACTIVO'),
    (48,NOW(), 1,'4217475-9','Parqueos Internacionales, S.A.','ACTIVO'),
    (49,NOW(), 1,'810383-6','Arrendadora 7 y 10, S.A.','ACTIVO'),
    (50,NOW(), 1,'815298-5','Jesús Amparo Ruiz de Tzorín','ACTIVO'),
    (51,NOW(), 1,'835782-K','Parqueo Plaza Italia','ACTIVO'),
    (52,NOW(), 1,'545789-0','Joseph Edward Cohen Mory','ACTIVO'),
    (53,NOW(), 1,'575084-9','Inversiones del Campo, S.A.','ACTIVO'),
    (54,NOW(), 1,'169634-3','Administradora de Bienes San Juan, S.A.','ACTIVO'),
    (55,NOW(), 1,'546499-4','Ingrid Zuseth Contreras Menéndez','ACTIVO'),
    (56,NOW(), 1,'390947-6','Dagoberto Sosa Brolo','ACTIVO'),
    (57,NOW(), 1,'316275-3','Club Industrial','ACTIVO'),
    (58,NOW(), 1,'1252273-2','DHL, S.A.','ACTIVO'),
    (59,NOW(), 1,'450747-9','Jorge Alfredo Estrada Molina','ACTIVO'),
    (60,NOW(), 1,'CC','Corte de Constitucionalidad','ACTIVO'),
    (61,NOW(), 1,'MVN','Municipalidad de Villa Nueva','ACTIVO'),
    (62,NOW(), 1,'CGC','Contraloría General de Cuentas','ACTIVO'),
    (63,NOW(), 1,'32561-9','Canella, S.A.','ACTIVO'),
    (64,NOW(), 1,'OJ','Organismo Judicial','ACTIVO'),
    (65,NOW(), 1,'3529404-3','Operaciones Contractuales, S.A.','ACTIVO'),
    (66,NOW(), 1,'1325946-6','Hever Hernández Vela','ACTIVO'),
    (67,NOW(), 1,'545630-4','Comercial de Autos, S.A.','ACTIVO'),
    (68,NOW(), 1,'252554-2','Estación de Servicio La Torre','ACTIVO'),
    (69,NOW(), 1,'3012200-7','Soluciones Logísticas, S.A.','ACTIVO'),
    (70,NOW(), 1,'153653-2','Coinscla, S.A.','ACTIVO'),
    (71,NOW(), 1,'3225523-3','Multiorganización, S.A.','ACTIVO'),
    (72,NOW(), 1,'516209-2','Coterrenos','ACTIVO'),
    (73,NOW(), 1,'BI','Banco Industrial','ACTIVO'),
    (74,NOW(), 1,'2489806-6','Fesme, S.A.','ACTIVO'),
    (75,NOW(), 1,'739398-9','Edificios Comerciales Metropolitanos, S.A.','ACTIVO'),
    (76,NOW(), 1,'598136-0','Julio Alfredo Hernández Escobar','ACTIVO'),
    (77,NOW(), 1,'4527156-9','Arquicopias, S.A.','ACTIVO'),
    (78,NOW(), 1,'3493857-5','Ferretería Hermanos Aldana, S.A.','ACTIVO'),
    (79,NOW(), 1,'4838429-1','Beyaca, S.A.','ACTIVO'),
    (80,NOW(), 1,'323344-8','Mayra Lorena Carrillo','ACTIVO'),
    (81,NOW(), 1,'CV','Consulado de Venezuela','ACTIVO'),
    (82,NOW(), 1,'594572-0','Mayra Lissette Pereira Lucas de Rodríguez','ACTIVO'),
    (83,NOW(), 1,'MM','Municipalidad de Mixco','ACTIVO'),
    (84,NOW(), 1,'CCH','Consulado de Chile','ACTIVO'),
    (85,NOW(), 1,'ES','Embajada de El Salvador','ACTIVO'),
    (86,NOW(), 1,'2740645-8','Estacionamiento IC, S.A.','ACTIVO'),
    (87,NOW(), 1,'628609-7','Banco Empresarial, S.A.','ACTIVO'),
    (88,NOW(), 1,'2644249-3','Parqueo Sexta Calle','ACTIVO'),
    (89,NOW(), 1,'344093-1','Aeropuerto Internacional La Aurora','ACTIVO'),
    (90,NOW(), 1,'3510168-7','Correo de Guatemala, S.A.','ACTIVO'),
    (91,NOW(), 1,'EH','Embajada de Honduras','ACTIVO'),
    (92,NOW(), 1,'CP','Consulado de Panamá','ACTIVO'),
    (93,NOW(), 1,'3459648-8','Publicidades, S.A.','ACTIVO'),
    (94,NOW(), 1,'808349-5','Inversiones Odolo, S.A.','ACTIVO'),
    (95,NOW(), 1,'EC','Embajada de Colombia','ACTIVO'),
    (96,NOW(), 1,'2999597-3','Freshcorp de Guatemala, S.A.','ACTIVO'),
    (97,NOW(), 1,'IT','Inspección de Trabajo','ACTIVO'),
    (98,NOW(), 1,'1689779-K','Partes y Accesorios Automotrices, S.A.','ACTIVO'),
    (99,NOW(), 1,'6716-4','Roberto Francisco Berti Molina','ACTIVO'),
    (100,NOW(), 1,'585288-9','Estación de Servicio Shell "Tívoli"','ACTIVO'),
    (101,NOW(), 1,'43494-9','Carlos Enrique Rivera Ortiz','ACTIVO'),
    (102,NOW(), 1,'EN','Embajada de Nicaragua','ACTIVO'),
    (103,NOW(), 1,'551181-K','Cantaclaro, S.A..','ACTIVO'),
    (104,NOW(), 1,'2373441-8','Brenda Estela Aguilar Santiago','ACTIVO'),
    (105,NOW(), 1,'370855-1','Parqueo La Concordia','ACTIVO'),
    (106,NOW(), 1,'EUSA','Embajada Estados Unidos','ACTIVO'),
    (107,NOW(), 1,'2251754-5','Copias Profesionales, S.A.','ACTIVO'),
    (108,NOW(), 1,'3033667-8','Parqueo Belén','ACTIVO'),
    (109,NOW(), 1,'170068-5','Estacionamientos Urbanos, S.A.','ACTIVO'),
    (110,NOW(), 1,'1236734-6','Negocios, S.A.','ACTIVO'),
    (111,NOW(), 1,'752251-7','Ministerio Público','ACTIVO'),
    (112,NOW(), 1,'652923-2','Operaciones Varias, S.A.','ACTIVO'),
    (113,NOW(), 1,'347776-2','Ingrid Regina Midence Pivaral','ACTIVO'),
    (114,NOW(), 1,'4219289-7','María Gabriela Saenz, Copropiedad','ACTIVO'),
    (115,NOW(), 1,'1277267-4','Estación Star Plus San Lucas','ACTIVO'),
    (116,NOW(), 1,'90494-5','Pollo Campero, S.A.','ACTIVO'),
    (117,NOW(), 1,'32105-2','Shell Guatemala, S.A.','ACTIVO'),
    (118,NOW(), 1,'516348-K','Asociación Guatemalteca de Exportadores','ACTIVO'),
    (119,NOW(), 1,'348219-7','Impresos David','ACTIVO'),
    (120,NOW(), 1,'1692245-K','Estación de Servicio Aurora Montúfar','ACTIVO'),
    (121,NOW(), 1,'754397-2','Cecoba, S.A.','ACTIVO'),
    (122,NOW(), 1,'4527251-4','Multiservicios Sarita','ACTIVO'),
    (123,NOW(), 1,'4255921-9','Flori Isabel Ramírez Hernández','ACTIVO'),
    (124,NOW(), 1,'2228161-4','Alcamial, S.A.','ACTIVO'),
    (125,NOW(), 1,'740489-1','Marco Vinicio Arenas Menéndez','ACTIVO'),
    (126,NOW(), 1,'156381-5','Saúl Arriaza Ríos','ACTIVO'),
    (127,NOW(), 1,'EB','Embajada de Brasil','ACTIVO'),
    (128,NOW(), 1,'3642494-3','El Bagel, S.A.','ACTIVO'),
    (129,NOW(), 1,'200442-9','Universidad Francisco Marroquín','ACTIVO'),
    (130,NOW(), 1,'4530614-1','Urda','ACTIVO'),
    (131,NOW(), 1,'287989-1','Mauricio Rodolfo Estrada Mejía','ACTIVO'),
    (132,NOW(), 1,'1493950-9','Guacha, S.A.','ACTIVO'),
    (133,NOW(), 1,'530137-8','Gladys  Margarita Solórzano Vega','ACTIVO'),
    (134,NOW(), 1,'5124381-4','Gasolineras Exclusivas, S.A.','ACTIVO'),
    (135,NOW(), 1,'3736883-4','Operadora de Estacionamientos y Rentas Suc II','ACTIVO'),
    (136,NOW(), 1,'5607942-7','Parqueo Sixtino, S.A.','ACTIVO'),
    (137,NOW(), 1,'851933-1','Víctor Manuel Catalán Paredes','ACTIVO'),
    (138,NOW(), 1,'818038-5','Delicias Internacionales, S.A.','ACTIVO'),
    (139,NOW(), 1,'992929-0','Telgua, S.A.','ACTIVO'),
    (140,NOW(), 1,'453818-8','María Clara Coralia Echeverría','ACTIVO'),
    (141,NOW(), 1,'448694-3','Inmobiliaria Las Majadas','ACTIVO'),
    (142,NOW(), 1,'414915-7','Comercial Tívoli, S.A.','ACTIVO'),
    (143,NOW(), 1,'852008-9','Harald Amílcar Flores González','ACTIVO'),
    (144,NOW(), 1,'269059-4','Gloria Sucel Delgado Sosa','ACTIVO'),
    (145,NOW(), 1,'RENAP','Registro Nacional de Personas','ACTIVO'),
    (146,NOW(), 1,'468138-K','Parqueo Rodmalba','ACTIVO'),
    (147,NOW(), 1,'452158-7','Industria de Hamburguesas, S.A.','ACTIVO'),
    (148,NOW(), 1,'CCR','Consulado de Costa Rica','ACTIVO'),
    (149,NOW(), 1,'3859895-7','Lucille, S.A.','ACTIVO'),
    (150,NOW(), 1,'385380-2','Parqueo M&M','ACTIVO'),
    (151,NOW(), 1,'581080-9','Restaurante Don Carlos','ACTIVO'),
    (152,NOW(), 1,'32207-5','Hotel Camino Real, S.A.','ACTIVO'),
    (153,NOW(), 1,'20489-7','José Adolfo Rivera del Frate','ACTIVO'),
    (154,NOW(), 1,'126817-1','Juan José Ortiz Ordóñez','ACTIVO'),
    (155,NOW(), 1,'497871-4','Rentalsa, S.A.','ACTIVO'),
    (156,NOW(), 1,'2442093-K','Olga Maritza Urízar De León','ACTIVO'),
    (157,NOW(), 1,'JUZ','Juzgados','ACTIVO'),
    (158,NOW(), 1,'131160-3','Thelma Giovana Paz Ochoa de Cifuentes','ACTIVO'),
    (159,NOW(), 1,'1008183-6','Ada Minerva López Alvarez de Melgar','ACTIVO'),
    (160,NOW(), 1,'1494668-8','Operadora de Servicios Viales, S.A.','ACTIVO'),
    (161,NOW(), 1,'175155-7','Angélica Encarnación Villatoro Alvarado','ACTIVO'),
    (162,NOW(), 1,'33570-3','Gabriel Valenzuela y Cía. S.C.','ACTIVO'),
    (163,NOW(), 1,'737432-1','Proyectos Santa Fe, S.A.','ACTIVO'),
    (164,NOW(), 1,'MSCP','Municipalidad de Santa Catarina Pinula','ACTIVO'),
    (165,NOW(), 1,'709004-8','Grupo AB, S.A.','ACTIVO'),
    (166,NOW(), 1,'662721-8','Cementerio General','ACTIVO'),
    (167,NOW(), 1,'2391145-K','Transportes Marquensita, S.A.','ACTIVO'),
    (168,NOW(), 1,'2399458-4','Cía. Internacional de Hoteles, S.A.','ACTIVO'),
    (169,NOW(), 1,'5252918-5','G&V, S.A.','ACTIVO'),
    (170,NOW(), 1,'334238-7','Mario Leonel Calderón Signor','ACTIVO'),
    (171,NOW(), 1,'593967-4','Inmobiliaria Elite, S.A.','ACTIVO'),
    (172,NOW(), 1,'591026-9','Oscar De León','ACTIVO'),
    (173,NOW(), 1,'611955-7','María Augusta Angélica Barrientos Fuentes','ACTIVO'),
    (174,NOW(), 1,'559880-K','Alquiler de Automóviles Tabarini, S.A.','ACTIVO'),
    (175,NOW(), 1,'45183-5','Julio Alfredo Miralbes Rubio','ACTIVO'),
    (176,NOW(), 1,'344027-3','Min. de Agricultura, Ganadería y Alim. Ocret','ACTIVO'),
    (177,NOW(), 1,'347625-1','Mario Mora Rodríguez','ACTIVO'),
    (178,NOW(), 1,'EHO','Embajada de Holanda','ACTIVO'),
    (179,NOW(), 1,'395587-7','Bienes Raíces Santa Teresa, S.A.','ACTIVO'),
    (180,NOW(), 1,'547986-K','Edwin Jacinto Estrada Mérida','ACTIVO'),
    (181,NOW(), 1,'71174-8','Francisco S. Estrada H.','ACTIVO'),
    (182,NOW(), 1,'1494609-2','Operadora de Calidad, S.A.','ACTIVO'),
    (183,NOW(), 1,'774546-K','Un medio Inmobiliaria,S.A','ACTIVO'),
    (184,NOW(), 1,'4301619-7','Zonificadora Notarial, S.A.','ACTIVO'),
    (185,NOW(), 1,'33862-1','Empresa de Transacciones Inm. S.A.','ACTIVO'),
    (186,NOW(), 1,'3548429-2','Venesa, S.A.','ACTIVO'),
    (187,NOW(), 1,'4330811-2','SHELLOS ATENA, SOCIEDAD ANONIMA','ACTIVO'),
    (188,NOW(), 1,'BACOR','Banco Reformador','ACTIVO'),
    (189,NOW(), 1,'BR','Banrural','ACTIVO'),
    (190,NOW(), 1,'BAM','Banco Agrícola Mercantil','ACTIVO'),
    (191,NOW(), 1,'EP','Embajada de Panamá','ACTIVO'),
    (192,NOW(), 1,'5121061-4','Servicentro Los Cipresales','ACTIVO'),
    (193,NOW(), 1,'25291-3','FRANCISCO ROBERTO DE JESUS BARNOYA RUIZ','ACTIVO'),
    (194,NOW(), 1,'610447-9','JULIA ISABEL VILLATORO ALVARADO','ACTIVO'),
    (195,NOW(), 1,'598160-3','Inmobiliaria El Lido, S.A.','ACTIVO'),
    (196,NOW(), 1,'SER','SERCORE','ACTIVO'),
    (197,NOW(), 1,'412185-6','Servicios Múltiples Ciudad Vieja','ACTIVO'),
    (198,NOW(), 1,'BAR','BANCOR','ACTIVO'),
    (199,NOW(), 1,'2375221-1','JECE, S.A.','ACTIVO'),
    (200,NOW(), 1,'CITI','Citi Bank','ACTIVO'),
    (201,NOW(), 1,'545374-7','MYM','ACTIVO'),
    (202,NOW(), 1,'40777-1','Luis Alberto Martínez Sandoval','ACTIVO'),
    (203,NOW(), 1,'CE','Consulado de Ecuador','ACTIVO'),
    (204,NOW(), 1,'123555-9','Clave Negocios','ACTIVO'),
    (205,NOW(), 1,'2665325-7','LEARRENDA, S.A.','ACTIVO'),
    (206,NOW(), 1,'DHL','DHL','ACTIVO'),
    (207,NOW(), 1,'1970516-6','Parqueo Cooperativa Integral de Ahorro y Crédito Proyección Dos Mil','ACTIVO'),
    (208,NOW(), 1,'21464-7','Parqueo Victor','ACTIVO'),
    (209,NOW(), 1,'3822809-2','Insigne, S.A.','ACTIVO'),
    (210,NOW(), 1,'618596-7','IPSA','ACTIVO'),
    (211,NOW(), 1,'126125-8','Inversiones Felguera, S.A.','ACTIVO'),
    (212,NOW(), 1,'EMRD','Embajada Republica Dominicana','ACTIVO'),
    (213,NOW(), 1,'1277841-9','Inmobiliaria Cimientos, S.A.','ACTIVO'),
    (214,NOW(), 1,'504924-5','Inversiones Reforma Palace, S.A.','ACTIVO'),
    (215,NOW(), 1,'1960883-7','Estacionamiento Juluc','ACTIVO'),
    (216,NOW(), 1,'1232786-7','Parqueo San Carlos','ACTIVO'),
    (217,NOW(), 1,'182395-7','Inrodva','ACTIVO'),
    (218,NOW(), 1,'CB','Consulado de Brasil','ACTIVO'),
    (219,NOW(), 1,'57546-1','Documentos y Digitales, S.A.','ACTIVO'),
    (220,NOW(), 1,'91337-5','Joaquín Gustavo Ponce Leiva','ACTIVO'),
    (221,NOW(), 1,'504070-1','Llantas y Reencauches, S.A.','ACTIVO'),
    (222,NOW(), 1,'3642480-3','Copias y Suministros','ACTIVO'),
    (223,NOW(), 1,'DGM','Dirección General de Migración','ACTIVO'),
    (224,NOW(), 1,'678374-0','Juan Esteban Girón','ACTIVO'),
    (225,NOW(), 1,'CS','Consulado de El Salvador','ACTIVO'),
    (226,NOW(), 1,'646707-5','Litografía Intergráfica','ACTIVO'),
    (227,NOW(), 1,'557920-1','Asociación de Amigos del Museo Ixchel','ACTIVO'),
    (228,NOW(), 1,'CA','Consulado de Alemania','ACTIVO'),
    (229,NOW(), 1,'G&T','Banco G&T','ACTIVO'),
    (230,NOW(), 1,'BIN','BANCO INTERNACIONAL','ACTIVO'),
    (231,NOW(), 1,'CH','Consulado de Honduras','ACTIVO'),
    (232,NOW(), 1,'599868-9','Gloria Ramos de Contreras','ACTIVO'),
    (233,NOW(), 1,'MSJS','Municipalidad de San Juan Sacatepéquez','ACTIVO'),
    (234,NOW(), 1,'2327380-1','Conexión Empresarial, S.A.','ACTIVO'),
    (235,NOW(), 1,'5596357-9','Compro, S.A.','ACTIVO'),
    (236,NOW(), 1,'598191-3','El Cafetalito, S.A.','ACTIVO'),
    (237,NOW(), 1,'2383048-4','Corporacion de Operaciones y Servicios','ACTIVO'),
    (238,NOW(), 1,'1235895-9','Michelle Renee Goudey','ACTIVO'),
    (239,NOW(), 1,'BAC','bac','ACTIVO'),
    (240,NOW(), 1,'TN','Tipografía Nacional','ACTIVO'),
    (241,NOW(), 1,'MRE','Ministerio de Relaciones Exteriores','ACTIVO'),
    (242,NOW(), 1,'A&A','Argueta & Alvarado','ACTIVO'),
    (243,NOW(), 1,'5590541-2','OFFICCE DEPOT','ACTIVO'),
    (244,NOW(), 1,'394215-5','Librería Jurídica','ACTIVO'),
    (245,NOW(), 1,'672681-K','Colegio de Abogados y Notarios','ACTIVO'),
    (246,NOW(), 1,'5734570-8','Tiempo, S.A.','ACTIVO'),
    (247,NOW(), 1,'6517435-6','Smart, S.A.','ACTIVO'),
    (248,NOW(), 1,'2725692-8','Grafito, S.A.','ACTIVO'),
    (249,NOW(), 1,'3499208-1','Basis Consultores, S.A.','ACTIVO'),
    (250,NOW(), 1,'4299603-1','Amigas Monte María, S.A.','ACTIVO'),
    (251,NOW(), 1,'EPERU','Embajada de Perú','ACTIVO'),
    (252,NOW(), 1,'MT','Ministerio de Trabajo','ACTIVO'),
    (253,NOW(), 1,'OCRET','ocret','ACTIVO'),
    (254,NOW(), 1,'518626-9','Restaurante Ahumados Katok','ACTIVO'),
    (255,NOW(), 1,'2713943-3','C&G, S.A.','ACTIVO'),
    (256,NOW(), 1,'1184321-7','Serviautos Monte Carlo','ACTIVO'),
    (257,NOW(), 1,'GR','Gloria Ramos','ACTIVO'),
    (258,NOW(), 1,'3739191-7','Servicomp de Guatemala','ACTIVO'),
    (259,NOW(), 1,'MA','Municipalidad de Antigua Guatemala','ACTIVO'),
    (260,NOW(), 1,'71879-3','Saúl Gamarro Meneses','ACTIVO'),
    (261,NOW(), 1,'438923-9','Ayre, S.A.','ACTIVO'),
    (262,NOW(), 1,'BG&T','Banco G&T Continental','ACTIVO'),
    (263,NOW(), 1,'714702-3','Documentos y Digitales, S.A.','ACTIVO'),
    (264,NOW(), 1,'4085492-2','Corporación Santa Margarita','ACTIVO'),
    (265,NOW(), 1,'MUNI','Municipalidad de Guatemala','ACTIVO'),
    (266,NOW(), 1,'6166407-3','Grupo BT Combustibles, S.A.','ACTIVO'),
    (267,NOW(), 1,'CAN','Colegio de Abogados y Notarios','ACTIVO'),
    (268,NOW(), 1,'678878-5','Compañía Imperial','ACTIVO'),
    (269,NOW(), 1,'466632-1','Offirentas Servicios','ACTIVO'),
    (270,NOW(), 1,'415518-1','Foto Tivoli','ACTIVO'),
    (271,NOW(), 1,'MFP','Ministerio de Finanzas Públicas','ACTIVO'),
    (272,NOW(), 1,'115998-4','Comunicatel','ACTIVO'),
    (273,NOW(), 1,'EM','Embajada de Mexico','ACTIVO'),
    (274,NOW(), 1,'AEH','Aeropuerto de Honduras','ACTIVO'),
    (275,NOW(), 1,'TONY','tony roma\'s','ACTIVO'),
    (276,NOW(), 1,'169875-3','Galgos, S.A.','ACTIVO'),
    (277,NOW(), 1,'TME','Tesorería Municipal de Escuintla','ACTIVO'),
    (278,NOW(), 1,'92143-2','René Amilcar Roca Ceballos','ACTIVO'),
    (279,NOW(), 1,'767598-4','Inversiones Natasha','ACTIVO'),
    (280,NOW(), 1,'330651-8','Empagua','ACTIVO'),
    (281,NOW(), 1,'273598-9','Encuadernadora Profesional Lara','ACTIVO'),
    (282,NOW(), 1,'493436-9','Farmacia Paty','ACTIVO'),
    (283,NOW(), 1,'UPS','UPS','ACTIVO'),
    (284,NOW(), 1,'PN','Policía Nacional','ACTIVO'),
    (285,NOW(), 1,'6814246-3','Franquicia de Limpieza','ACTIVO'),
    (286,NOW(), 1,'3560997-4','Farmacia López','ACTIVO'),
    (287,NOW(), 1,'DGA','Dirección General de Aeronáutica','ACTIVO'),
    (288,NOW(), 1,'HIH','Hotel Intercontinental Hondruas','ACTIVO'),
    (289,NOW(), 1,'AH','Aeropuerto de Honduras','ACTIVO'),
    (290,NOW(), 1,'3416236-4','FARMACIAS GUATEMALTECAS JIREH','ACTIVO'),
    (291,NOW(), 1,'6957436-7','RBSL, S.A.','ACTIVO'),
    (292,NOW(), 1,'2534282-7','Farmacias ADIH','ACTIVO'),
    (293,NOW(), 1,'EE','Embajada de España','ACTIVO'),
    (294,NOW(), 1,'4701935-2','Distribuidora de Telefonía WYT, S.A.','ACTIVO'),
    (295,NOW(), 1,'2295843-6','Farmacia Las Américas','ACTIVO'),
    (296,NOW(), 1,'MF','Ministerio de Finanzas','ACTIVO'),
    (297,NOW(), 1,'255308-2','Hustler','ACTIVO'),
    (298,NOW(), 1,'382620-1','Parrilladas, S.A.','ACTIVO'),
    (299,NOW(), 1,'2815510-6','La Panería,','ACTIVO'),
    (300,NOW(), 1,'EHOL','Embajada de Holanda','ACTIVO'),
    (301,NOW(), 1,'3773563-2','Servicios de Formalización, S.A.','ACTIVO'),
    (302,NOW(), 1,'276281-1','Ismael Alfonso Martínez Bustamante','ACTIVO'),
    (303,NOW(), 1,'34714-0','Estación Shell Modelo','ACTIVO'),
    (304,NOW(), 1,'PNG','Policía Nacional Civil','ACTIVO'),
    (305,NOW(), 1,'7302392-2','Intergráfica, S.A.','ACTIVO'),
    (306,NOW(), 1,'2470050-9','Parqueo Capuchinas','ACTIVO'),
    (307,NOW(), 1,'3044990-1','Restaurantes Sarita, S.A.','ACTIVO'),
    (308,NOW(), 1,'6956170-2','RBVH, S.A.','ACTIVO'),
    (309,NOW(), 1,'5784727-4','Feluca, S.A.','ACTIVO'),
    (310,NOW(), 1,'301743-5','Gasolinera Los Encuentros','ACTIVO'),
    (311,NOW(), 1,'CAR','CONSULADO DE ARGENTINA','ACTIVO'),
    (312,NOW(), 1,'619279-3','Comercial Nueva San Jose','ACTIVO'),
    (313,NOW(), 1,'97528-1','Marco Tulio Rivera','ACTIVO'),
    (314,NOW(), 1,'7473287-0','Operadora Sesamo','ACTIVO'),
    (315,NOW(), 1,'6136613-7','Celleccion, S.A.','ACTIVO'),
    (316,NOW(), 1,'6480655-3','Gasolineras Excelentes, S.A.','ACTIVO'),
    (317,NOW(), 1,'2570507-5','Inmobiliaria Fasani','ACTIVO'),
    (318,NOW(), 1,'3464661-2','Servicentro El Naranjo','ACTIVO'),
    (319,NOW(), 1,'4428978-2','Parqueo El Cortijo','ACTIVO'),
    (320,NOW(), 1,'7457725-5','parqueo la 7a.','ACTIVO'),
    (321,NOW(), 1,'CHN','Crédito Hipotecario Nacional','ACTIVO'),
    (322,NOW(), 1,'36471-1','Lic. Carlos Ramiro Lemus','ACTIVO'),
    (323,NOW(), 1,'6921407-7','Megaestaciones de Servicio S.A.','ACTIVO'),
    (324,NOW(), 1,'BA','Brenda Aguilar','ACTIVO'),
    (325,NOW(), 1,'3654893-6','Texaco','ACTIVO'),
    (326,NOW(), 1,'4131816-1','Negoexsa','ACTIVO'),
    (327,NOW(), 1,'722305-6','Ana Karina Fernández','ACTIVO'),
    (328,NOW(), 1,'7014040-5','Foto Roma','ACTIVO'),
    (329,NOW(), 1,'652115-0','Caffe Saul','ACTIVO'),
    (330,NOW(), 1,'MARN','Ministerio de Ambiente y Recursos Naturales','ACTIVO'),
    (331,NOW(), 1,'112082-4','Anexa Repuestos y Servicios El Triángulo','ACTIVO'),
    (332,NOW(), 1,'4937376-5','Edge Guatemala, S.A.','ACTIVO'),
    (333,NOW(), 1,'487302-5','Foto Rápida','ACTIVO'),
    (334,NOW(), 1,'246049-1','Multisellos Vile','ACTIVO'),
    (335,NOW(), 1,'2294256-4','Gasolinera Estrella','ACTIVO'),
    (336,NOW(), 1,'CR','Carlos Ramiro Lemus Juárez','ACTIVO'),
    (337,NOW(), 1,'BG','Banco de Guatemala','ACTIVO'),
    (338,NOW(), 1,'7648818-7','GRUPO LH, S.A.','ACTIVO'),
    (339,NOW(), 1,'CL','Carlos Ramiro Lemus','ACTIVO'),
    (340,NOW(), 1,'988460-2','Librería y Papelería Elgin Las Conchas','ACTIVO'),
    (341,NOW(), 1,'FB','Florales Belmont','ACTIVO'),
    (342,NOW(), 1,'EA','Embajada de Argentina','ACTIVO'),
    (343,NOW(), 1,'575338-4','Shell Santiago','ACTIVO'),
    (344,NOW(), 1,'293190-7','Carlos Ramiro Lemus','ACTIVO'),
    (345,NOW(), 1,'ERD','Embajada de la República Dominicana','ACTIVO'),
    (346,NOW(), 1,'IM','Inmobiliaria Las Majadas','ACTIVO'),
    (347,NOW(), 1,'7675032-9','Servicios y Distribuciones Generales No. 3','ACTIVO'),
    (348,NOW(), 1,'6922732-2','Estación Gerona','ACTIVO'),
    (349,NOW(), 1,'1494687-4','Parqueo Cetrisa','ACTIVO'),
    (350,NOW(), 1,'2647545-6','Inmobiliaria Real, S.A.','ACTIVO'),
    (351,NOW(), 1,'CRL','Carlos Ramiro Lemus','ACTIVO'),
    (352,NOW(), 1,'FT','Fondo de Tierras','ACTIVO'),
    (353,NOW(), 1,'2637645-8','Servicios Dos Mil, S.A.','ACTIVO'),
    (354,NOW(), 1,'PG','Pasaportes de Guatemala','ACTIVO'),
    (355,NOW(), 1,'2281922-3','Tienda de Conveniencia Landívar','ACTIVO'),
    (356,NOW(), 1,'4692789-1','Business Solutions Parners, S.A.','ACTIVO'),
    (357,NOW(), 1,'4692789-11','Business Solutions Partners, S.A.','ACTIVO'),
    (358,NOW(), 1,'165886-7','Estación de Servicio La Paz','ACTIVO'),
    (359,NOW(), 1,'AA','American Airlines','ACTIVO'),
    (360,NOW(), 1,'7925670-8','Grupo Roma S.A.','ACTIVO'),
    (361,NOW(), 1,'6485586-4','Mobile Technologies','ACTIVO'),
    (362,NOW(), 1,'5332426-9','Inversiones Meme, S.A.','ACTIVO'),
    (363,NOW(), 1,'3531704-3','Ban, S.A.','ACTIVO'),
    (364,NOW(), 1,'GRAF','GRAFITO','ACTIVO'),
    (365,NOW(), 1,'1277809-5','SERJURSA','ACTIVO'),
    (366,NOW(), 1,'2653247-6','Unisuper','ACTIVO'),
    (367,NOW(), 1,'FAB','FABREGA','ACTIVO'),
    (368,NOW(), 1,'32165-6','Librería Progreso, S.A.','ACTIVO'),
    (369,NOW(), 1,'291828-5','Juan Carlos Lejárraga','ACTIVO'),
    (370,NOW(), 1,'2819711-9','Texaco Panamericana','ACTIVO'),
    (371,NOW(), 1,'4222257-5','Tecnología Dinámica','ACTIVO'),
    (372,NOW(), 1,'MIGRA','Migración','ACTIVO'),
    (373,NOW(), 1,'7474465-8','COMBUSTIBLES ALTAMIRA','ACTIVO'),
    (374,NOW(), 1,'ME','Muebles Excelencia','ACTIVO'),
    (375,NOW(), 1,'PP','Parqueos Plaza','ACTIVO'),
    (376,NOW(), 1,'7798402-1','Combustibles y Lubricantes','ACTIVO'),
    (377,NOW(), 1,'LTHM','LITHOMARCA','ACTIVO'),
    (378,NOW(), 1,'721779-K','AGROPECUARIA EL CHICHIPATE','ACTIVO'),
    (379,NOW(), 1,'554120-4','Parqueo Inmobiliaria Monte Sion','ACTIVO'),
    (380,NOW(), 1,'5582659-8','Operador de Importaciones y Comercialización, S.A.','ACTIVO'),
    (381,NOW(), 1,'609770-7','Grupo Innovador, S.A.','ACTIVO'),
    (382,NOW(), 1,'7376250-4','Desbal, S.A.','ACTIVO'),
    (383,NOW(), 1,'521909-4','Emma Teresa Montenegro Camblor','ACTIVO'),
    (384,NOW(), 1,'3882721-2','Ana Maria del Rosario, Valdez Bercian','ACTIVO'),
    (385,NOW(), 1,'7359162-9','Parqueo Galerías del Sur','ACTIVO'),
    (386,NOW(), 1,'5731300-8','Dir. Gen. del D. de C.A. y Tipografía Nacional','ACTIVO'),
    (387,NOW(), 1,'1417636-K','Erwing Dick Veliz Botzoc','ACTIVO'),
    (388,NOW(), 1,'747499-7','Uturriberricoechea, S.A.','ACTIVO'),
    (389,NOW(), 1,'SSP','Servicios de Seguridad Privada','ACTIVO'),
    (390,NOW(), 1,'CM','Consulado de México','ACTIVO'),
    (391,NOW(), 1,'1255866-4','Lubrirepuestos JC','ACTIVO'),
    (392,NOW(), 1,'8189524-0','Resguardo de Títulos Inmobiliarios, S.A.','ACTIVO'),
    (393,NOW(), 1,'6972312-5','Imaginova','ACTIVO'),
    (394,NOW(), 1,'4210126-3','Go Green','ACTIVO'),
    (395,NOW(), 1,'4836353-7','Fotocopiadora Las 5 calles','ACTIVO'),
    (396,NOW(), 1,'199274-0','Zurich','ACTIVO'),
    (397,NOW(), 1,'2602587-6','Altuna, S.A.','ACTIVO'),
    (398,NOW(), 1,'345037-6','Imprenta de la Riva Hnos.','ACTIVO'),
    (399,NOW(), 1,'OD','Office Depot','ACTIVO'),
    (400,NOW(), 1,'6706984-3','Oil\'s MK','ACTIVO'),
    (401,NOW(), 1,'24639-5','SUPER SERVICIO REFORMA','ACTIVO'),
    (402,NOW(), 1,'4245832-3','Jorge Urízar','ACTIVO'),
    (403,NOW(), 1,'700141-K','Platino, S.A.','ACTIVO'),
    (404,NOW(), 1,'6956055-2','Puerta Parada','ACTIVO'),
    (405,NOW(), 1,'34880-5','Radiovisión','ACTIVO'),
    (406,NOW(), 1,'7347209-3','Gasolinera Los Planes','ACTIVO'),
    (407,NOW(), 1,'7699087-7','Estaciones de Servicio Optima','ACTIVO'),
    (408,NOW(), 1,'DGP','Dirección General Policía Nacional','ACTIVO'),
    (409,NOW(), 1,'1267453-2','Cristina Chocano','ACTIVO'),
    (410,NOW(), 1,'235446-2',' IGA','ACTIVO'),
    (411,NOW(), 1,'666023-1','Parqueo El Empedrado','ACTIVO'),
    (412,NOW(), 1,'2496443-3','Parqueo Público 12-19','ACTIVO'),
    (413,NOW(), 1,'850344-3','Operadora de Bodegas, S.A.','ACTIVO'),
    (414,NOW(), 1,'711303-K','La Prosperidad','ACTIVO'),
    (415,NOW(), 1,'1277728-5','Parqueo San José','ACTIVO'),
    (416,NOW(), 1,'802583-5','CMF, S.A.','ACTIVO'),
    (417,NOW(), 1,'2315426-8','Pedro Enrique Alvarez','ACTIVO'),
    (418,NOW(), 1,'752005-0','Estación de Servicio Cipresales','ACTIVO'),
    (419,NOW(), 1,'1646832-5','Norma Elizabeth Rivera','ACTIVO'),
    (420,NOW(), 1,'CMC','Colegio de Médicos y Cirujanos de Guatemala','ACTIVO'),
    (421,NOW(), 1,'1731333-3','Taxis Buenaventura','ACTIVO'),
    (422,NOW(), 1,'5292585-4','Aerovías de México','ACTIVO'),
    (423,NOW(), 1,'PBX','Telecomunique','ACTIVO'),
    (424,NOW(), 1,'6690146-4','Unitra','ACTIVO'),
    (425,NOW(), 1,'485149-8','Librería e Imprenta Vivian','ACTIVO'),
    (426,NOW(), 1,'512922-2','SEYMA','ACTIVO'),
    (427,NOW(), 1,'246049-14','Multisellos Vile','ACTIVO'),
    (428,NOW(), 1,'690470-K','Matefraf','ACTIVO'),
    (429,NOW(), 1,'1491175-2','Trans Muñoz','ACTIVO'),
    (430,NOW(), 1,'LH','La Hora','ACTIVO'),
    (431,NOW(), 1,'4117676-6','Cerrajería La Chapita','ACTIVO'),
    (432,NOW(), 1,'6042809-0','Lic. Andrés Goicolea Mena','ACTIVO'),
    (433,NOW(), 1,'2495496-9','Radio Shack','ACTIVO'),
    (434,NOW(), 1,'6149642-1','MegaTecno, S.A.','ACTIVO'),
    (435,NOW(), 1,'534454-9','Impresos San Carlos','ACTIVO'),
    (436,NOW(), 1,'7640331-9','Taxis Cifuentes','ACTIVO'),
    (437,NOW(), 1,'RPJ','Registro de Personas Jurídicas','ACTIVO'),
    (438,NOW(), 1,'5357815-5','Lexglobal','ACTIVO'),
    (439,NOW(), 1,'2418449-7','Fedex','ACTIVO'),
    (440,NOW(), 1,'1016850-8','ELDER OMAR LOAIZA DE LEON','ACTIVO'),
    (441,NOW(), 1,'732884-2','Librería Progreso','ACTIVO'),
    (442,NOW(), 1,'7719619-8','Centro de Servicios DACAR','ACTIVO'),
    (443,NOW(), 1,'4161798-3','Menalsa','ACTIVO'),
    (444,NOW(), 1,'6545029-9','Copias Día y Noche','ACTIVO'),
    (445,NOW(), 1,'1689577-0','Grupo Comudisa','ACTIVO'),
    (446,NOW(), 1,'8599909-1','Taxis Camey','ACTIVO'),
    (447,NOW(), 1,'9102071-9','Taxis Full Service','ACTIVO'),
    (448,NOW(), 1,'1951013-6','Taxi Rocars','ACTIVO'),
    (449,NOW(), 1,'EDEC','embajada de canada','ACTIVO'),
    (450,NOW(), 1,'2487450-7','Lingua','ACTIVO'),
    (451,NOW(), 1,'5731827-1','Aceitera Tune - Up y Más','ACTIVO'),
    (452,NOW(), 1,'CI','Colegio de Ingenieros','ACTIVO'),
    (453,NOW(), 1,'AG','Archivo General','ACTIVO'),
    (454,NOW(), 1,'1214371-5','Ana Marroquín','ACTIVO'),
    (455,NOW(), 1,'590426-9','Jaime Fuentes Batz','ACTIVO'),
    (456,NOW(), 1,'4436888-7','Contactenos, S.A.','ACTIVO'),
    (457,NOW(), 1,'559802-8','Ana Karina Thurm Lehnoff','ACTIVO'),
    (458,NOW(), 1,'CAUS','Consulado de Austria','ACTIVO'),
    (459,NOW(), 1,'5102550-7','El Cafecito','ACTIVO'),
    (460,NOW(), 1,'CMG','Colegio de Médicos de Guatemala','ACTIVO'),
    (461,NOW(), 1,'EI','Embajada de Italia','ACTIVO'),
    (462,NOW(), 1,'3235185-2','Adriana Castañeda Dollagaray','ACTIVO'),
    (463,NOW(), 1,'2446207-1','María Antonieta López','ACTIVO'),
    (464,NOW(), 1,'519278-1','Industrias A.B.M.','ACTIVO'),
    (465,NOW(), 1,'773512-K','Mayra Gerónimo de Cedeño','ACTIVO'),
    (466,NOW(), 1,'1576-8','Berta Eugenia Cáceres','ACTIVO'),
    (467,NOW(), 1,'9334546-1','Servicios de Taxi Jireh','ACTIVO'),
    (468,NOW(), 1,'2519320-1','El Zapotal','ACTIVO'),
    (469,NOW(), 1,'3037029-9','GUATEX','ACTIVO'),
    (470,NOW(), 1,'8234114-1','IURISTEC','ACTIVO'),
    (471,NOW(), 1,'5809216-1','Restaurante Montano\'s','ACTIVO'),
    (472,NOW(), 1,'4032422-2','Tre Fratelli','ACTIVO'),
    (473,NOW(), 1,'RICOH','RICOH','ACTIVO'),
    (474,NOW(), 1,'MSP','Ministerio de Salud Publica','ACTIVO'),
    (475,NOW(), 1,'5488505-1','Parqueo La Aurora','ACTIVO'),
    (476,NOW(), 1,'717783-6','Traslados VIP de C.A.','ACTIVO'),
    (477,NOW(), 1,'558173-7','T.G.I. FRIDAYS','ACTIVO'),
    (478,NOW(), 1,'1652912-K','Cerrajeria Obelisco','ACTIVO'),
    (479,NOW(), 1,'3045909-5','ASESORIA ESPECIALIZADA, S.A.','ACTIVO'),
    (480,NOW(), 1,'RGM','Registro de Garantías Mobiliarias','ACTIVO'),
    (481,NOW(), 1,'1524880-1','Mariana Victoria Castellanos de Carranza','ACTIVO'),
    (482,NOW(), 1,'66838-9','HELVETIA GUATEMALA','ACTIVO'),
    (483,NOW(), 1,'475112-4','Bodega Farmaceutica, S.A.','ACTIVO');

INSERT INTO concepts
    (id, created_at, created_by, code, name, status, type)
VALUES
    (1, NOW(), 1,'G1','Gastos de Registro', 'ACTIVO','G'),
    (2, NOW(), 1,'G11','Honorarios de Registros', 'ACTIVO','G'),
    (3, NOW(), 1,'G12','Certificación de Registros', 'ACTIVO','G'),
    (4, NOW(), 1,'G13','Publicación de Edictos', 'ACTIVO','G'),
    (5, NOW(), 1,'G2','Timbres', 'ACTIVO','G'),
    (6, NOW(), 1,'G21','Timbres Fiscales', 'ACTIVO','G'),
    (7, NOW(), 1,'G22','Timbres Notariales', 'ACTIVO','G'),
    (8, NOW(), 1,'G23','Timbres Forenses', 'ACTIVO','G'),
    (9, NOW(), 1,'G3','Papelería y Utiles', 'ACTIVO','G'),
    (10, NOW(), 1,'G31','Fotocopias', 'ACTIVO','G'),
    (11, NOW(), 1,'G32','Papelería y Utiles', 'ACTIVO','G'),
    (12, NOW(), 1,'G33','Impresiones', 'ACTIVO','G'),
    (13, NOW(), 1,'G34','Formularios', 'ACTIVO','G'),
    (14, NOW(), 1,'G35','Papel de Protocolo', 'ACTIVO','G'),
    (15, NOW(), 1,'G4','Gastos de Procuración y Administración', 'ACTIVO','G'),
    (16, NOW(), 1,'G41','Faxes', 'ACTIVO','G'),
    (17, NOW(), 1,'G42','Teléfono', 'ACTIVO','G'),
    (18, NOW(), 1,'G43','Parqueos públicos', 'ACTIVO','G'),
    (19, NOW(), 1,'G44','Combustible', 'ACTIVO','G'),
    (20, NOW(), 1,'G5','Otros', 'ACTIVO','G'),
    (21, NOW(), 1,'G51','Impuestos', 'ACTIVO','G'),
    (22, NOW(), 1,'G52','Multas', 'ACTIVO','G'),
    (23, NOW(), 1,'G53','Otros', 'ACTIVO','G'),
    (24, NOW(), 1,'H1','Honorarios Bufete', 'ACTIVO','H'),
    (25, NOW(), 1,'P1','Anticipos', 'ACTIVO','P'),
    (26, NOW(), 1,'P2','Pagos', 'ACTIVO','P'),
    (27, NOW(), 1,'G','Gastos', 'ACTIVO','G'),
    (28, NOW(), 1,'H','Honorarios', 'ACTIVO','H'),
    (29, NOW(), 1,'G14','Consultas Distancia - Internet', 'ACTIVO','G'),
    (30, NOW(), 1,'G15','Consultas Electrónicas', 'ACTIVO','G'),
    (31, NOW(), 1,'CC','Movtos en CC', 'ACTIVO','C'),
    (32, NOW(), 1,'G16','Consulta de libros', 'ACTIVO','G'),
    (33, NOW(), 1,'G17','Solvencia de tránsito', 'ACTIVO','G'),
    (34, NOW(), 1,'G18','Edicto', 'ACTIVO','G'),
    (35, NOW(), 1,'G19','Despachos Juzgados', 'ACTIVO','G'),
    (36, NOW(), 1,'G45','Transporte', 'ACTIVO','G'),
    (37, NOW(), 1,'G20','Traducciones', 'ACTIVO','G'),
    (38, NOW(), 1,'G111','Título', 'ACTIVO','G'),
    (39, NOW(), 1,'G46','Parqueos Plaza', 'ACTIVO','G'),
    (40, NOW(), 1,'G54','Devolución Anticipo', 'ACTIVO','G'),
    (41, NOW(), 1,'G47','Traducciones', 'ACTIVO','G'),
    (42, NOW(), 1,'HRM','Honorarios por Revisión de Minuta', 'ACTIVO','G'),
    (43, NOW(), 1,'IS','Inscripción de Sociedad', 'ACTIVO','G'),
    (44, NOW(), 1,'AP','TESTIMONIOS ESPECIALES', 'ACTIVO','G'),
    (45, NOW(), 1,'DIV','Compra de Divisas', 'ACTIVO','G'),
    (46, NOW(), 1,'OJ','Mandatos', 'ACTIVO','G'),
    (47, NOW(), 1,'DEP','Depositos Bancarios', 'ACTIVO','G'),
    (48, NOW(), 1,'G40','Traducciones', 'ACTIVO','G'),
    (49, NOW(), 1,'G55','Carpintería', 'ACTIVO','G');

INSERT INTO record_file
(id, created_at, updated_at, created_by, updated_by, closing_date, confidential, file_num, judgement_no, location, observations, opening_date, priority, status, sub_type, subject, type)
VALUES
(1, '2020-09-29 16:58:43', '2020-09-29 16:58:55', 2, 2, null, false, '202009001', '', '', '', '2020-09-29 00:00:00', 'Alta', 'AUTORIZADO', 8, '', 2),
(2, '2020-09-29 16:59:14', '2020-09-29 16:59:24', 2, 2, null, false, '202009002', '', '', '', '2020-09-29 00:00:00', 'Alta', 'AUTORIZADO', 12, '', 3),
(3, '2020-09-29 16:59:42', '2020-09-29 16:59:52', 2, 2, null, false, '202009003', '', '', '', '2020-09-29 00:00:00', 'Alta', 'AUTORIZADO', 17, '', 4);

INSERT INTO record_file_details
(id, entity_id, entity_type, file_record_id)
VALUES
(1, 7, 1, 1),
(2, 1, 2, 1),
(3, 2, 3, 1),
(4, 7, 1, 2),
(5, 4, 2, 2),
(6, 2, 3, 2),
(7, 7, 1, 3),
(8, 1, 2, 3),
(9, 2, 3, 3);

INSERT INTO status_history
    (id, created_at, updated_at, created_by, updated_by, comment, entity_id, entity_type, next_status, prev_status)
VALUES
    (1, '2020-09-29 16:58:50', '2020-09-29 16:58:50', 2, 2, '', 1, 3, 'PENDIENTE', 'ELABORADO'),
    (2, '2020-09-29 16:58:55', '2020-09-29 16:58:55', 2, 2, '', 1, 3, 'AUTORIZADO', 'PENDIENTE'),
    (3, '2020-09-29 16:59:20', '2020-09-29 16:59:20', 2, 2, '', 2, 3, 'PENDIENTE', 'ELABORADO'),
    (4, '2020-09-29 16:59:24', '2020-09-29 16:59:24', 2, 2, '', 2, 3, 'AUTORIZADO', 'PENDIENTE'),
    (5, '2020-09-29 16:59:48', '2020-09-29 16:59:48', 2, 2, '', 3, 3, 'PENDIENTE', 'ELABORADO'),
    (6, '2020-09-29 16:59:52', '2020-09-29 16:59:52', 2, 2, '', 3, 3, 'AUTORIZADO', 'PENDIENTE'),
    (7, '2020-09-29 20:56:58', '2020-09-29 20:56:58', 2, 2, '', 1, 4, 'PROCESO', 'ABIERTO'),
    (8, '2020-09-29 20:57:12', '2020-09-29 20:57:12', 2, 2, '', 1, 5, 'TERMINADO', 'TERMINADO'),
    (9, '2020-09-29 20:57:19', '2020-09-29 20:57:19', 2, 2, '', 2, 5, 'TERMINADO', 'TERMINADO'),
    (10, '2020-09-29 20:57:22', '2020-09-29 20:57:22', 2, 2, '', 4, 5, 'PROCESO', 'PROCESO'),
    (11, '2020-09-29 20:57:33', '2020-09-29 20:57:33', 2, 2, '', 5, 5, 'TERMINADO', 'TERMINADO'),
    (12, '2020-09-29 20:57:38', '2020-09-29 20:57:38', 2, 2, '', 7, 5, 'PROCESO', 'PROCESO'),
    (13, '2020-09-29 20:57:45', '2020-09-29 20:57:45', 2, 2, '', 8, 5, 'TERMINADO', 'TERMINADO'),
    (14, '2020-09-29 20:57:49', '2020-09-29 20:57:49', 2, 2, '', 9, 5, 'TERMINADO', 'TERMINADO'),
    (15, '2020-09-29 20:57:52', '2020-09-29 20:57:52', 2, 2, '', 10, 5, 'TERMINADO', 'TERMINADO'),
    (16, '2020-09-29 20:57:56', '2020-09-29 20:57:56', 2, 2, '', 6, 5, 'PROCESO', 'PROCESO'),
    (17, '2020-09-29 20:58:01', '2020-09-29 20:58:01', 2, 2, '', 3, 5, 'PROCESO', 'PROCESO'),
    (18, '2020-09-29 21:01:16', '2020-09-29 21:01:16', 2, 2, '', 1, 4, 'CERRADO', 'PROCESO'),
    (19, '2020-09-29 21:21:42', '2020-09-29 21:21:42', 2, 2, '', 2, 6, 'PENDIENTE', 'ELABORADO'),
    (20, '2020-09-29 21:22:24', '2020-09-29 21:22:24', 2, 2, '', 3, 6, 'PENDIENTE', 'ELABORADO'),
    (21, '2020-09-29 21:22:52', '2020-09-29 21:22:52', 2, 2, '', 4, 6, 'PENDIENTE', 'ELABORADO'),
    (22, '2020-11-13 13:03:01', '2020-11-13 13:03:01', 2, 2, 'comentario', 11, 9, 'GENERADA', 'EN_EDICION'),
    (23, '2020-11-13 14:11:54', '2020-11-13 14:11:54', 2, 2, 'Se Anula Factura por limite de tiempo caducado.', 11, 9, 'ANULADO', 'GENERADA'),
    (24, '2020-11-13 14:14:15', '2020-11-13 14:14:15', 2, 2, 'comentario de prueba', 12, 9, 'GENERADA', 'EN_EDICION'),
    (25, '2020-11-13 14:18:01', '2020-11-13 14:18:01', 2, 2, 'prueba de anulacion de documento', 12, 9, 'ANULADO', 'GENERADA'),
    (26, '2020-11-13 14:31:21', '2020-11-13 14:31:21', 2, 2, '', 13, 9, 'GENERADA', 'EN_EDICION'),
    (27, '2020-11-13 18:38:58', '2020-11-13 18:38:58', 2, 2, '', 14, 9, 'GENERADA', 'EN_EDICION'),
    (28, '2020-11-13 20:50:09', '2020-11-13 20:50:09', 2, 2, 'comentario de prueba', 15, 9, 'GENERADA', 'EN_EDICION'),
    (29, '2020-11-13 20:57:49', '2020-11-13 20:57:49', 2, 2, 'prueba', 16, 9, 'GENERADA', 'EN_EDICION');

INSERT INTO case_activity
    (id, created_at, updated_at, created_by, updated_by, activity_cost, activity_end_date, activity_id, activity_start_date,
     activity_time, assign_date, case_activity_type, check_amount, check_number, comment, currency_type, employee_id, institution_id,
     proctor_agenda_id, file_record_id, status)
VALUES
    (1, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, 100, null, 4, null, 0, '2020-09-29 00:00:00', 'PROCURACION', null, null, 'Entregar copia de contrato en: Calle Los eucaliptos 6-43 zona 4 de Santa Catarina Pinula (Cod de acceso 0146) con atencion a Mariana Bonifasi en horario de 8 a 4pm', 1, 3, 99, 1, 1, 'FINALIZADO'),
    (2, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, 20, null, 5, null, 0, '2020-09-29 00:00:00', 'PROCURACION', null, null, 'Entregar escritura en Banco Industrial con Ingrid Saj', 1, 3, 99, 1, 1, 'FINALIZADO'),
    (3, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, 30, null, 6, null, 0, '2020-09-29 00:00:00', 'PROCURACION', null, null, 'Favor recoger cheque en:

    Direccion: kilometro 17-05 carretera a San Juan Sacatepequez Zona 6 de mixco.
    Atencion: Verinica Barrios
    Horario: 10 AM a 5:00 PM', 2, 3, 99, 1, 1, 'FINALIZADO'),
    (4, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, 60, null, 7, null, 0, '2020-09-29 00:00:00', 'PROCURACION', null, null, 'Favor de entregar el dia de maniana en:

    Direccion: Avenida La Reforma 10-00 zona 9 Edi. Condominio Reforma, Of. 8B
    Atencion: Oscar Lopez', 1, 3, 99, 1, 1, 'FINALIZADO'),
    (5, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, 250, null, 1, null, 0, '2020-09-29 00:00:00', 'PROCURACION', null, null, '', 2, 3, 1, 1, 2, 'FINALIZADO'),
    (6, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, 40, null, 2, null, 0, '2020-09-29 00:00:00', 'PROCURACION', null, null, '', 1, 3, 2, 1, 2, 'FINALIZADO'),
    (7, '2020-09-29 16:42:07', '2020-09-29 16:42:07', 2, 2, 80, null, 3, null, 0, '2020-09-29 00:00:00', 'PROCURACION', null, null, '', 1, 3, 3, 1, 2, 'FINALIZADO'),
    (8, '2020-09-29 19:40:31', '2020-09-29 19:40:31', 2, 2, 5, '2020-09-29 19:40:08', 4, '2020-09-29 19:40:08', 0, '2020-09-29 00:00:00', 'PROCURACION', 0, '', '', 1, 3, 12, 1, 3, 'FINALIZADO'),
    (9, '2020-09-29 19:40:46', '2020-09-29 19:40:46', 2, 2, 6, '2020-09-29 19:40:08', 6, '2020-09-29 19:40:08', 0, '2020-09-29 00:00:00', 'PROCURACION', 0, '', '', 1, 3, 14, 1, 3, 'FINALIZADO'),
    (10, '2020-09-29 19:41:00', '2020-09-29 19:41:00', 2, 2, 67, '2020-09-29 19:40:08', 6, '2020-09-29 19:40:08', 0, '2020-09-29 00:00:00', 'PROCURACION', 0, '', '', 1, 3, 11, 1, 3, 'FINALIZADO'),
    (11, '2020-09-29 19:42:56', '2020-09-29 19:42:56', 2, 2, 0, '2020-09-22 19:30:00', 4, '2020-09-22 08:00:00', 690, '2020-09-29 00:00:00', 'HONORARIOS', 0, '', 'Generacion de contratos', 1, 1, 99, null, 1, 'ACTIVO'),
    (12, '2020-09-29 19:43:32', '2020-09-29 19:43:32', 2, 2, 0, '2020-09-23 19:40:00', 2, '2020-09-23 08:00:00', 700, '2020-09-29 00:00:00', 'HONORARIOS', 0, '', 'Generacion de documento legal', 1, 1, 99, null, 1, 'ACTIVO'),
    (13, '2020-09-29 19:44:06', '2020-09-29 19:44:06', 2, 2, 0, '2020-09-24 19:40:00', 2, '2020-09-24 08:40:00', 660, '2020-09-29 00:00:00', 'HONORARIOS', 0, '', '', 1, 4, 99, null, 2, 'ACTIVO'),
    (14, '2020-09-29 19:44:30', '2020-09-29 19:44:30', 2, 2, 0, '2020-09-24 19:40:00', 3, '2020-09-24 08:40:00', 660, '2020-09-29 00:00:00', 'HONORARIOS', 0, '', 'registro legal', 1, 4, 99, null, 2, 'ACTIVO'),
    (15, '2020-09-29 19:44:59', '2020-09-29 19:44:59', 2, 2, 0, '2020-09-25 19:40:00', 2, '2020-09-25 08:40:00', 660, '2020-09-29 00:00:00', 'HONORARIOS', 0, '', 'registro legal', 1, 4, 99, null, 3, 'ACTIVO'),
    (16, '2020-09-29 19:45:25', '2020-09-29 19:45:25', 2, 2, 0, '2020-09-26 19:40:00', 3, '2020-09-26 08:40:00', 660, '2020-09-29 00:00:00', 'HONORARIOS', 0, '', 'generacion de documento legal', 1, 1, 99, null, 3, 'ACTIVO'),
    (17, '2020-09-29 20:57:22', '2020-09-29 20:57:22', 2, 2, 60, null, 7, null, 0, '2020-09-30 00:00:00', 'PROCURACION', null, null, 'Favor de entregar el dia de maniana en:

    Direccion: Avenida La Reforma 10-00 zona 9 Edi. Condominio Reforma, Of. 8B
    Atencion: Oscar Lopez', 1, 3, 99, null, 1, 'ACTIVO'),
    (18, '2020-09-29 20:57:38', '2020-09-29 20:57:38', 2, 2, 80, null, 3, null, 0, '2020-09-30 00:00:00', 'PROCURACION', null, null, '', 1, 3, 3, null, 2, 'ACTIVO'),
    (19, '2020-09-29 20:57:56', '2020-09-29 20:57:56', 2, 2, 40, null, 2, null, 0, '2020-09-30 00:00:00', 'PROCURACION', null, null, '', 1, 3, 2, null, 2, 'ACTIVO'),
    (20, '2020-09-29 20:58:01', '2020-09-29 20:58:01', 2, 2, 30, null, 6, null, 0, '2020-09-30 00:00:00', 'PROCURACION', null, null, 'Favor recoger cheque en:

    Direccion: kilometro 17-05 carretera a San Juan Sacatepequez Zona 6 de mixco.
    Atencion: Verinica Barrios
    Horario: 10 AM a 5:00 PM', 2, 3, 99, null, 1, 'ACTIVO');

INSERT INTO stamp_inventory
    (id, created_at, updated_at, created_by, updated_by, inventory_type, receipt_number, file_record_id, reference, request_date, request_type, requester_id, status, total)
VALUES
    (1, '2020-09-29 20:43:28', '2020-09-29 20:43:28', 2, 2, 'TIMBRES', '4532534', -1, '', '2020-09-29 00:00:00', 23, -1, 'AUTORIZADO', 270),
    (2, '2020-09-29 21:21:36', '2020-09-29 21:23:07', 2, 2, 'TIMBRES', '', 1, 'timbres para expediente 2020090001', '2020-09-29 00:00:00', 21, 4, 'FINALIZADO', 15.5),
    (3, '2020-09-29 21:22:20', '2020-09-29 21:23:13', 2, 2, 'TIMBRES', '', 2, 'timbres para expediente 202009002', '2020-09-29 00:00:00', 21, 4, 'FINALIZADO', 16.5),
    (4, '2020-09-29 21:22:47', '2020-09-29 21:23:18', 2, 2, 'TIMBRES', '', 3, 'timbres para expediente 202009003', '2020-09-29 00:00:00', 21, 4, 'FINALIZADO', 9),
    (5, '2020-09-29 21:23:07', '2020-09-29 21:23:07', 2, 2, 'TIMBRES', '', 1, 'timbres para expediente 2020090001', '2020-09-29 00:00:00', 22, 4, 'AUTORIZADO', 15.5),
    (6, '2020-09-29 21:23:13', '2020-09-29 21:23:13', 2, 2, 'TIMBRES', '', 2, 'timbres para expediente 202009002', '2020-09-29 00:00:00', 22, 4, 'AUTORIZADO', 16.5),
    (7, '2020-09-29 21:23:18', '2020-09-29 21:23:18', 2, 2, 'TIMBRES', '', 3, 'timbres para expediente 202009003', '2020-09-29 00:00:00', 22, 4, 'AUTORIZADO', 9);

INSERT INTO stamp_inventory_detail
    (id, inventory_id, product_id, quantity_request)
VALUES
    (1, 1, 1, 40),
    (2, 1, 2, 30),
    (3, 1, 3, 25),
    (4, 1, 4, 20),
    (5, 1, 5, 15),
    (6, 1, 6, 10),
    (7, 2, 1, 3),
    (8, 2, 2, 3),
    (9, 2, 3, 4),
    (10, 2, 4, 1),
    (11, 3, 1, 3),
    (12, 3, 2, 4),
    (13, 3, 3, 1),
    (14, 3, 4, 3),
    (15, 4, 2, 3),
    (16, 4, 3, 3),
    (17, 5, 1, 3),
    (18, 5, 2, 3),
    (19, 5, 3, 4),
    (20, 5, 4, 1),
    (21, 6, 1, 3),
    (22, 6, 2, 4),
    (23, 6, 3, 1),
    (24, 6, 4, 3),
    (25, 7, 2, 3),
    (26, 7, 3, 3);

INSERT INTO product_movement
    (id, created_at, updated_at, action, inventory_id, product_id, quantity)
VALUES
    (1, '2020-09-29 20:43:28', '2020-09-29 20:43:28', 'ENTRADA', 1, 1, 40),
    (2, '2020-09-29 20:43:28', '2020-09-29 20:43:28', 'ENTRADA', 1, 2, 30),
    (3, '2020-09-29 20:43:28', '2020-09-29 20:43:28', 'ENTRADA', 1, 3, 25),
    (4, '2020-09-29 20:43:28', '2020-09-29 20:43:28', 'ENTRADA', 1, 4, 20),
    (5, '2020-09-29 20:43:28', '2020-09-29 20:43:28', 'ENTRADA', 1, 5, 15),
    (6, '2020-09-29 20:43:28', '2020-09-29 20:43:28', 'ENTRADA', 1, 6, 10),
    (7, '2020-09-29 21:23:07', '2020-09-29 21:23:07', 'SALIDA', 5, 1, 3),
    (8, '2020-09-29 21:23:07', '2020-09-29 21:23:07', 'SALIDA', 5, 2, 3),
    (9, '2020-09-29 21:23:07', '2020-09-29 21:23:07', 'SALIDA', 5, 3, 4),
    (10, '2020-09-29 21:23:07', '2020-09-29 21:23:07', 'SALIDA', 5, 4, 1),
    (11, '2020-09-29 21:23:13', '2020-09-29 21:23:13', 'SALIDA', 6, 1, 3),
    (12, '2020-09-29 21:23:13', '2020-09-29 21:23:13', 'SALIDA', 6, 2, 4),
    (13, '2020-09-29 21:23:13', '2020-09-29 21:23:13', 'SALIDA', 6, 3, 1),
    (14, '2020-09-29 21:23:13', '2020-09-29 21:23:13', 'SALIDA', 6, 4, 3),
    (15, '2020-09-29 21:23:18', '2020-09-29 21:23:18', 'SALIDA', 7, 2, 3),
    (16, '2020-09-29 21:23:18', '2020-09-29 21:23:18', 'SALIDA', 7, 3, 3);

INSERT INTO proctor_agenda
    (id, created_at, updated_at, created_by, updated_by, agenda_invoice_amount_local, agenda_invoice_amount_outer,
    agenda_return_amount_local, agenda_return_amount_outer, assign_date, comment, employee_id, proctor_agenda_cost_local,
    proctor_agenda_cost_outer, status)
VALUES
    (1, '2020-09-29 20:56:45', '2020-09-29 21:01:16', 2, 2, 0, 0, 0, 0, '2020-09-29 00:00:00', '', 3, 350, 250, 'CERRADO');

INSERT INTO proctor_agenda_detail
    (id, activity_cost, case_activity_id, comment, currency_type, proctor_agenda_id, status)
VALUES
    (1, 100, 1, '', 1, 1, 'TERMINADO'),
    (2, 20, 2, '', 1, 1, 'TERMINADO'),
    (3, 30, 3, '', 2, 1, 'PROCESO'),
    (4, 60, 4, '', 1, 1, 'PROCESO'),
    (5, 250, 5, '', 2, 1, 'TERMINADO'),
    (6, 40, 6, '', 1, 1, 'PROCESO'),
    (7, 80, 7, '', 1, 1, 'PROCESO'),
    (8, 5, 8, '', 1, 1, 'TERMINADO'),
    (9, 6, 9, '', 1, 1, 'TERMINADO'),
    (10, 67, 10, '', 1, 1, 'TERMINADO');

INSERT INTO activity_settlement
    (id, created_at, updated_at, created_by, updated_by, assign_date, comments, invoice_currency, invoice_description,
    invoice_name, invoice_num, invoice_range, invoice_total, invoice_type, proctor_agenda_id, status)
VALUES
    (1, '2020-09-29 20:59:19', '2020-09-29 20:59:19', 2, 2, '2020-09-30 00:00:00', null, 2, null, '', '4534345', '', 280, 1, 1, 'ABIERTO'),
    (2, '2020-09-29 21:00:54', '2020-09-29 21:00:54', 2, 2, '2020-09-30 00:00:00', null, 1, null, '', '4534345', 'A', 378, 2, 1, 'ABIERTO');

INSERT INTO activity_settlement_detail
    (id, activity_settlement_id, case_activity_id, cost_detail)
VALUES
    (1, 1, 3, 30),
    (2, 1, 5, 250),
    (3, 2, 1, 100),
    (4, 2, 2, 20),
    (5, 2, 4, 60),
    (6, 2, 6, 40),
    (7, 2, 7, 80),
    (8, 2, 8, 5),
    (9, 2, 9, 6),
    (10, 2, 10, 67);

INSERT INTO expenses (id, created_at, created_by, exchange_rate, expenses_currency, expenses_date,
                      expenses_num, expenses_total, expenses_type, status, concept_id, provider_id)
VALUES (1, NOW(), 1, 1.00, 1, NOW(), '1000000', 50000.00, 1, 'ELABORADO', 1, 1);

INSERT INTO expenses_detail (id, created_at, created_by, expense_value, status,  expenses_id, file_record_id)
VALUES (1, NOW(), 1, 2500.00, 'ELABORADO', 1, 1),
       (2, NOW(), 1, 1500.00, 'ELABORADO', 1, 1),
       (3, NOW(), 1, 1000.00, 'FINALIZADO', 1, 1);

INSERT INTO invoice_series (id, created_at, updated_at, created_by, updated_by, series_name, series_value, status)
VALUES (1, NOW(), NOW(), 1, 1, 'Serie A', 'PRUEBA', 'ACTIVO'),
       (2, NOW(), NOW(), 1, 1, 'Serie B', 'PRUEBA', 'ACTIVO');

# INSERT INTO document_sequence
#     (id, document_type)
# VALUES
#     (1, 'FACTURA'),
#     (2, 'FACTURA'),
#     (3, 'FACTURA'),
#     (4, 'FACTURA'),
#     (5, 'FACTURA'),
#     (6, 'FACTURA'),
#     (7, 'FACTURA'),
#     (8, 'FACTURA'),
#     (9, 'FACTURA'),
#     (10, 'FACTURA'),
#     (11, 'FACTURA'),
#     (12, 'FACTURA'),
#     (13, 'FACTURA'),
#     (14, 'FACTURA'),
#     (15, 'FACTURA'),
#     (16, 'FACTURA'),
#     (17, 'FACTURA'),
#     (18, 'FACTURA'),
#     (19, 'FACTURA'),
#     (20, 'FACTURA'),
#     (21, 'FACTURA'),
#     (22, 'FACTURA'),
#     (23, 'FACTURA'),
#     (24, 'FACTURA'),
#     (25, 'FACTURA'),
#     (26, 'FACTURA'),
#     (27, 'FACTURA'),
#     (28, 'FACTURA'),
#     (29, 'FACTURA'),
#     (30, 'FACTURA'),
#     (31, 'FACTURA'),
#     (32, 'FACTURA'),
#     (33, 'FACTURA'),
#     (34, 'FACTURA'),
#     (35, 'FACTURA'),
#     (36, 'FACTURA'),
#     (37, 'FACTURA');

INSERT INTO receipts
(id, created_at, updated_at, created_by, updated_by, object_type, receipt_address_id, receipt_date, receipt_settlement_id,
 receipt_total, receipt_total_discount, status, client_id, serial_number, currency_id, receipt_iva, invoice_series_id, exchange_rate, balance)
VALUES
(11, '2020-11-13 13:02:28', '2020-11-13 14:11:54', 2, 2, 'LIBRE', 2, '2020-11-13 13:02:13', null, 50785.28, 0, 'ANULADO', 5, '2226340448', 1, 5441.28, 1, 1.0, 50785.28),
(12, '2020-11-13 14:14:03', '2020-11-13 14:18:01', 2, 2, 'LIBRE', 3, '2020-11-13 14:13:49', null, 51027.2, 0, 'ANULADO', 6, '430393604', 1, 5467.2, 1, 1.0, 51027.2),
(13, '2020-11-13 14:30:57', '2020-11-13 14:31:21', 2, 2, 'LIBRE', 3, '2020-11-13 14:30:16', null, 42571.2, 0, 'GENERADA', 6, '4268901233', 1, 4561.2, 1, 1.0, 42571.2),
(14, '2020-11-13 15:23:36', '2020-11-13 18:38:58', 2, 2, 'LIBRE', 3, '2020-11-13 15:23:18', null, 53503.35, 0, 'GENERADA', 6, '3649455513', 1, 5732.50, 1, 1.0, 53503.35),
(15, '2020-11-13 20:49:57', '2020-11-13 20:50:09', 2, 2, 'LIBRE', 2, '2020-11-13 20:49:41', null, 7465.92, 0, 'GENERADA', 5, '936921797', 1, 799.92, 1, 1.0, 7465.92),
(16, '2020-11-13 20:55:17', '2020-11-13 20:57:49', 2, 2, 'LIBRE', 3, '2020-11-13 20:55:03', null, 13826.4, 0, 'GENERADA', 6, '3243327902', 1, 1481.4, 1, 1.0, 13826.4);

INSERT INTO receipt_details
(id, description, line_amount, line_discount, line_total, status, use_isr, use_iva, receipt_id)
VALUES
(1, 'Servicios Profesionales y gastos incurridos en concepto de elaboración de arrendamientos de tierras de las fincas propiedad de las señoras Lucía Herrera, Lucrecia Herrera, Mónica Herrera y Hilda Herrera', 45344, 0, 50785.28, 'ACTIVO', false, true, 11),
(2, 'Servicios Profesionales y gastos incurridos en concepto de elaboración de arrendamientos de tierras de las fincas propiedad de las señoras Lucía Herrera, Lucrecia Herrera, Mónica Herrera y Hilda Herrera', 45560, 0, 51027.2, 'ACTIVO', false, true, 12),
(3, 'Servicios Profesionales y gastos incurridos en concepto de elaboración de arrendamientos de tierras de las fincas propiedad de las señoras Lucía Herrera, Lucrecia Herrera, Mónica Herrera y Hilda Herrera', 34560, 0, 38707.2, 'ACTIVO', false, true, 13),
(4, 'Por servicios legales prestados para el mes de Octubre/Noviembre', 3450, 0, 3864, 'ACTIVO', false, true, 13),
(5, 'Servicios Profesionales y gastos incurridos en concepto de elaboración de arrendamientos de tierras de las fincas propiedad de las señoras Lucía Herrera, Lucrecia Herrera, Mónica Herrera y Hilda Herrera', 45465, 0, 53503.350000000006, 'ACTIVO', true, true, 14),
(6, 'Servicios Profesionales y gastos incurridos en concepto de elaboración de arrendamientos de tierras de las fincas propiedad de las señoras Lucía Herrera, Lucrecia Herrera, Mónica Herrera y Hilda Herrera', 6666, 0, 7465.92, 'ACTIVO', false, true, 15),
(7, 'Servicios Profesionales y gastos incurridos en concepto de elaboración de arrendamientos de tierras de las fincas propiedad de las señoras Lucía Herrera, Lucrecia Herrera, Mónica Herrera y Hilda Herrera', 12345, 0, 13826.4, 'ACTIVO', false, true, 16);

INSERT INTO nomenclatures
(id, parent_id, code, name, status, type, created_at, created_by)
VALUES
(1 ,NULL ,'1' ,'ACTIVO', 'ACTIVO', 1, NOW(), 1),
(2 ,1 ,'01' ,'ACTIVO CIRCULANTE', 'ACTIVO', 1, NOW(), 1),
(3 ,2 ,'01' ,'CAJA Y BANCOS', 'ACTIVO', 1, NOW(), 1),
(4 ,3 ,'01' ,'CAJA', 'ACTIVO', 1, NOW(), 1),
(5 ,4 ,'001' ,'Caja General', 'ACTIVO', 1, NOW(), 1),
(6 ,4 ,'002' ,'Caja Chica', 'ACTIVO', 1, NOW(), 1),
(7 ,4 ,'003' ,'Efectivo por depositar', 'ACTIVO', 1, NOW(), 1),
(8 ,3 ,'02' ,'BANCO', 'ACTIVO', 1, NOW(), 1),
(9 ,8 ,'001' ,'Banco Reformador Cta. 12-12431-83', 'ACTIVO', 1, NOW(), 1),
(10 ,8 ,'002' ,'Banco Agromercantil Cta. 213-000961-5', 'ACTIVO', 1, NOW(), 1),
(11 ,8 ,'003' ,'Banco Agromercantil Cta. 13-800131-5', 'ACTIVO', 1, NOW(), 1),
(12 ,8 ,'004' ,'Banco Agromercantil Cta. 49-10644-0', 'ACTIVO', 1, NOW(), 1),
(13 ,8 ,'005' ,'Banco Industrial Cta. 053-497694-0', 'ACTIVO', 1, NOW(), 1),
(14 ,8 ,'006' ,'Banco Industrial Cta. 46-00064552-00001-2 PE', 'ACTIVO', 1, NOW(), 1),
(15 ,8 ,'007' ,'BAC Cta. 104056429 US$', 'ACTIVO', 1, NOW(), 1),
(16 ,8 ,'008' ,'Complemento BAC Cta. 104056429 US$', 'ACTIVO', 1, NOW(), 1),
(17 ,8 ,'009' ,'Banco G&T Continental Cta. 66-18078-6', 'ACTIVO', 1, NOW(), 1),
(18 ,8 ,'010' ,'Banco Industrial ahorro MYE Cta. 053-03-94059', 'ACTIVO', 1, NOW(), 1),
(19 ,8 ,'011' ,'BAC Cta. 902485713 Tarjetas', 'ACTIVO', 1, NOW(), 1),
(20 ,8 ,'012' ,'Banco Industrial Cta. 053-002935-5 US$ ', 'ACTIVO', 1, NOW(), 1),
(21 ,8 ,'013' ,'Complemento B. Industrial Cta. 053-002935-5 US$', 'ACTIVO', 1, NOW(), 1),
(22 ,2 ,'02' ,'CUENTAS POR COBRAR', 'ACTIVO', 1, NOW(), 1),
(23 ,22 ,'01' ,'CLIENTES', 'ACTIVO', 1, NOW(), 1),
(24 ,23 ,'001' ,'Clientes 1', 'ACTIVO', 1, NOW(), 1),
(25 ,22 ,'02' ,'PRESTAMOS A EMPLEADOS', 'ACTIVO', 1, NOW(), 1),
(26 ,25 ,'001' ,'Prestamos a empleados 1', 'ACTIVO', 1, NOW(), 1),
(27 ,22 ,'03' ,'ANTICIPOS', 'ACTIVO', 1, NOW(), 1),
(28 ,27 ,'001' ,'Anticipo proveedores', 'ACTIVO', 1, NOW(), 1),
(29 ,27 ,'002' ,'Sueldos anticipados', 'ACTIVO', 1, NOW(), 1),
(30 ,22 ,'04' ,'CUENTAS POR COBRAR DIVERSAS', 'ACTIVO', 1, NOW(), 1),
(31 ,30 ,'001' ,'Cuentas varias por cobrar', 'ACTIVO', 1, NOW(), 1),
(32 ,30 ,'002' ,'Devolución de ISR por cobrar a empleados', 'ACTIVO', 1, NOW(), 1),
(33 ,30 ,'003' ,'Seguro empleados por cobrar', 'ACTIVO', 1, NOW(), 1),
(34 ,2 ,'03' ,'INVENTARIOS', 'ACTIVO', 1, NOW(), 1),
(35 ,34 ,'01' ,'INVENTARIOS DIVERSOS', 'ACTIVO', 1, NOW(), 1),
(36 ,35 ,'001' ,'Inventario', 'ACTIVO', 1, NOW(), 1),
(37 ,2 ,'04' ,'CREDITO FISCAL', 'ACTIVO', 1, NOW(), 1),
(38 ,37 ,'01' ,'CREDITO FISCAL', 'ACTIVO', 1, NOW(), 1),
(39 ,38 ,'001' ,'IVA Crédito Fiscal ', 'ACTIVO', 1, NOW(), 1),
(40 ,38 ,'002' ,'IVA retenciones por compensar', 'ACTIVO', 1, NOW(), 1),
(41 ,38 ,'003' ,'Exenciones de IVA por compensar', 'ACTIVO', 1, NOW(), 1),
(42 ,1 ,'02' ,'ACTIVO FIJO', 'ACTIVO', 1, NOW(), 1),
(43 ,42 ,'01' ,'INVERSIONES', 'ACTIVO', 1, NOW(), 1),
(44 ,43 ,'01' ,'TITULOS Y VALORES', 'ACTIVO', 1, NOW(), 1),
(45 ,44 ,'001' ,'Títulos y valores', 'ACTIVO', 1, NOW(), 1),
(46 ,42 ,'02' ,'INSTALACIONES, PLANTA Y EQUIPO', 'ACTIVO', 1, NOW(), 1),
(47 ,46 ,'01' ,'INSTALACIONES, PLANTA Y EQUPO', 'ACTIVO', 1, NOW(), 1),
(48 ,47 ,'001' ,'Instalaciones no adheridas a edificios', 'ACTIVO', 1, NOW(), 1),
(49 ,47 ,'002' ,'Edificios', 'ACTIVO', 1, NOW(), 1),
(50 ,47 ,'003' ,'Mobiliario y equipo de oficina', 'ACTIVO', 1, NOW(), 1),
(51 ,47 ,'004' ,'Equipo de computación', 'ACTIVO', 1, NOW(), 1),
(52 ,47 ,'005' ,'Vehículos', 'ACTIVO', 1, NOW(), 1),
(53 ,47 ,'006' ,'Sistemas de computación', 'ACTIVO', 1, NOW(), 1),
(54 ,1 ,'03' ,'ACTIVO DIFERIDO', 'ACTIVO', 1, NOW(), 1),
(55 ,54 ,'01' ,'CARGOS DIFERIDOS', 'ACTIVO', 1, NOW(), 1),
(56 ,55 ,'01' ,'CARGOS DIFERIDOS DIVERSOS', 'ACTIVO', 1, NOW(), 1),
(57 ,56 ,'001' ,'Impuestos diferidos', 'ACTIVO', 1, NOW(), 1),
(58 ,56 ,'002' ,'Otros impuestos', 'ACTIVO', 1, NOW(), 1),
(59 ,54 ,'02' ,'GASTOS DIFERIDOS', 'ACTIVO', 1, NOW(), 1),
(60 ,55 ,'01' ,'GASTOS PAGADOS POR ANTICIPADO', 'ACTIVO', 1, NOW(), 1),
(61 ,60 ,'001' ,'Anticipo a proveedores', 'ACTIVO', 1, NOW(), 1),
(62 ,60 ,'002' ,'Cuentas por liquidar', 'ACTIVO', 1, NOW(), 1),
(63 ,60 ,'003' ,'Anticipo a abogados', 'ACTIVO', 1, NOW(), 1),
(64 ,60 ,'004' ,'Anticipo a Socios', 'ACTIVO', 1, NOW(), 1),
(65 ,1 ,'04' ,'OTROS ACTIVOS', 'ACTIVO', 1, NOW(), 1),
(66 ,65 ,'01' ,'OTROS ACTIVOS', 'ACTIVO', 1, NOW(), 1),
(67 ,66 ,'01' ,'GASTOS DE ORGANIZACIÓN', 'ACTIVO', 1, NOW(), 1),
(68 ,67 ,'001' ,'Gastos de organización', 'ACTIVO', 1, NOW(), 1),
(69 ,NULL ,'2' ,'PASIVO', 'ACTIVO', 1, NOW(), 1),
(70 ,69 ,'01' ,'PASIVO CIRCULANTE', 'ACTIVO', 1, NOW(), 1),
(71 ,70 ,'01' ,'CUENTAS POR PAGAR', 'ACTIVO', 1, NOW(), 1),
(72 ,71 ,'01' ,'PROVEEDORES', 'ACTIVO', 1, NOW(), 1),
(73 ,72 ,'001' ,'Proveedores', 'ACTIVO', 1, NOW(), 1),
(74 ,72 ,'002' ,'Reserva para cuentas incobrales', 'ACTIVO', 1, NOW(), 1),
(75 ,71 ,'02' ,'PRESTACIONES A EMPLEDOS POR PAGAR', 'ACTIVO', 1, NOW(), 1),
(76 ,75 ,'001' ,'Indemnización por pagar', 'ACTIVO', 1, NOW(), 1),
(77 ,75 ,'002' ,'Aguinaldo por pagar', 'ACTIVO', 1, NOW(), 1),
(78 ,75 ,'003' ,'Bonificación Dto. 42-92 por pagar', 'ACTIVO', 1, NOW(), 1),
(79 ,75 ,'004' ,'Vacaciones por pagar', 'ACTIVO', 1, NOW(), 1),
(80 ,71 ,'03' ,'OTRAS CUENTAS POR PAGAR', 'ACTIVO', 1, NOW(), 1),
(81 ,80 ,'001' ,'Cuentas varias por pagar', 'ACTIVO', 1, NOW(), 1),
(82 ,70 ,'02' ,'IMPUESTOS POR PAGAR', 'ACTIVO', 1, NOW(), 1),
(83 ,82 ,'01' ,'IMPUESTOS Y CUOTAS POR PAGAR', 'ACTIVO', 1, NOW(), 1),
(84 ,83 ,'001' ,'ISR por pagar', 'ACTIVO', 1, NOW(), 1),
(85 ,83 ,'002' ,'IVA por pagar', 'ACTIVO', 1, NOW(), 1),
(86 ,83 ,'003' ,'Retenciones por pagar', 'ACTIVO', 1, NOW(), 1),
(87 ,83 ,'004' ,'Cuota laboral IGSS por pagar', 'ACTIVO', 1, NOW(), 1),
(88 ,83 ,'005' ,'Cuota patronal IGSS por pagar', 'ACTIVO', 1, NOW(), 1),
(89 ,69 ,'02' ,'PASIVO FIJO', 'ACTIVO', 1, NOW(), 1),
(90 ,89 ,'01' ,'PRESTAMOS', 'ACTIVO', 1, NOW(), 1),
(91 ,90 ,'01' ,'PRESTAMOS FIDUCIARIOS', 'ACTIVO', 1, NOW(), 1),
(92 ,91 ,'001' ,'Prestamos fiduciarios', 'ACTIVO', 1, NOW(), 1),
(93 ,69 ,'03' ,'PASIVO DIFERIDO', 'ACTIVO', 1, NOW(), 1),
(94 ,93 ,'01' ,'ANTICIPOS RECIBIDOS', 'ACTIVO', 1, NOW(), 1),
(95 ,94 ,'01' ,'ANTICIPO DE CLIENTES', 'ACTIVO', 1, NOW(), 1),
(96 ,95 ,'001' ,'Anticipo de clientes', 'ACTIVO', 1, NOW(), 1),
(97 ,93 ,'02' ,'DEPRECIACIONES ACUMULADAS', 'ACTIVO', 1, NOW(), 1),
(98 ,97 ,'01' ,'DEPRECIACIONES ACUMULADAS', 'ACTIVO', 1, NOW(), 1),
(99 ,98 ,'001' ,'Depreciación acumulada Instalaciones', 'ACTIVO', 1, NOW(), 1),
(100 ,98 ,'002' ,'Depreciación acumulada edificios', 'ACTIVO', 1, NOW(), 1),
(101 ,98 ,'003' ,'Depreciación acumulada mobiliario y equipo de oficina', 'ACTIVO', 1, NOW(), 1),
(102 ,98 ,'004' ,'Depreciación acumulada equipo de computación', 'ACTIVO', 1, NOW(), 1),
(103 ,98 ,'005' ,'Depreciación acumulada vehículos', 'ACTIVO', 1, NOW(), 1),
(104 ,98 ,'006' ,'Depreciación acumulada Sistemas de computo', 'ACTIVO', 1, NOW(), 1),
(105 ,NULL ,'3' ,'CAPITAL Y RESERVAS', 'ACTIVO', 1, NOW(), 1),
(106 ,105 ,'01' ,'CAPITAL', 'ACTIVO', 1, NOW(), 1),
(107 ,106 ,'01' ,'PATRIMONIO', 'ACTIVO', 1, NOW(), 1),
(108 ,107 ,'01' ,'CAPITAL SOCIAL', 'ACTIVO', 1, NOW(), 1),
(109 ,108 ,'001' ,'Capital autorizado', 'ACTIVO', 1, NOW(), 1),
(110 ,108 ,'002' ,'Acciones por sucribir', 'ACTIVO', 1, NOW(), 1),
(111 ,108 ,'003' ,'Suscriptores de acciones', 'ACTIVO', 1, NOW(), 1),
(112 ,107 ,'02' ,'RESULTADO DEL EJERCICIO', 'ACTIVO', 1, NOW(), 1),
(113 ,112 ,'001' ,'Utilidad del ejercicio', 'ACTIVO', 1, NOW(), 1),
(114 ,112 ,'002' ,'Pérdida del ejercicio', 'ACTIVO', 1, NOW(), 1),
(115 ,107 ,'03' ,'RESULTADO DE EJERCICIOS ANTERIORES', 'ACTIVO', 1, NOW(), 1),
(116 ,115 ,'001' ,'Utilidades retenidas', 'ACTIVO', 1, NOW(), 1),
(117 ,115 ,'002' ,'Pérdida acumulada', 'ACTIVO', 1, NOW(), 1),
(118 ,107 ,'04' ,'RESERVA LEGAL', 'ACTIVO', 1, NOW(), 1),
(119 ,118 ,'001' ,'Reserva Legal', 'ACTIVO', 1, NOW(), 1),
(120 ,NULL ,'4' ,'INGRESOS', 'ACTIVO', 1, NOW(), 1),
(121 ,120 ,'01' ,'INGRESOS POR VENTAS', 'ACTIVO', 1, NOW(), 1),
(122 ,121 ,'01' ,'VENTA DE BIENES', 'ACTIVO', 1, NOW(), 1),
(123 ,122 ,'01' ,'VENTAS VARIAS', 'ACTIVO', 1, NOW(), 1),
(124 ,123 ,'001' ,'Venta de bienes', 'ACTIVO', 1, NOW(), 1),
(125 ,121 ,'02' ,'VENTA DE SERVICIOS', 'ACTIVO', 1, NOW(), 1),
(126 ,125 ,'01' ,'VENTA DE SERVICIOS LEGALES', 'ACTIVO', 1, NOW(), 1),
(127 ,126 ,'001' ,'Prestación de servicios legales', 'ACTIVO', 1, NOW(), 1),
(128 ,121 ,'03' ,'OTROS INGRESOS', 'ACTIVO', 1, NOW(), 1),
(129 ,128 ,'01' ,'VENTA DE ACTIVOS', 'ACTIVO', 1, NOW(), 1),
(130 ,129 ,'001' ,'Venta de activos', 'ACTIVO', 1, NOW(), 1),
(131 ,120 ,'02' ,'DEVOLUCIONES Y REBAJAS', 'ACTIVO', 1, NOW(), 1),
(132 ,131 ,'01' ,'DEVOLUCIONES SOBRE VENTAS', 'ACTIVO', 1, NOW(), 1),
(133 ,132 ,'01' ,'DEVOLUCIONES SOBRE VENTAS', 'ACTIVO', 1, NOW(), 1),
(134 ,133 ,'001' ,'Devoluciones sobre ventas', 'ACTIVO', 1, NOW(), 1),
(135 ,131 ,'02' ,'REBAJAS SOBRE VENTAS', 'ACTIVO', 1, NOW(), 1),
(136 ,135 ,'01' ,'REBAJAS SOBRE VENTAS', 'ACTIVO', 1, NOW(), 1),
(137 ,136 ,'001' ,'Rebajas sobre ventas', 'ACTIVO', 1, NOW(), 1),
(138 ,NULL ,'5' ,'COSTO DE PRODUCCION Y VENTAS', 'ACTIVO', 1, NOW(), 1),
(139 ,138 ,'01' ,'COSTO DE VENTAS', 'ACTIVO', 1, NOW(), 1),
(140 ,139 ,'01' ,'COSTO DE VENTAS', 'ACTIVO', 1, NOW(), 1),
(141 ,140 ,'01' ,'COSTO DE VENTAS', 'ACTIVO', 1, NOW(), 1),
(142 ,141 ,'001' ,'Inventario I', 'ACTIVO', 1, NOW(), 1),
(143 ,141 ,'002' ,'Compras', 'ACTIVO', 1, NOW(), 1),
(144 ,141 ,'003' ,'Inventario II', 'ACTIVO', 1, NOW(), 1),
(145 ,NULL ,'6' ,'EGRESOS', 'ACTIVO', 1, NOW(), 1),
(146 ,145 ,'01' ,'GASTOS DE PRODUCCION', 'ACTIVO', 1, NOW(), 1),
(147 ,146 ,'01' ,'GASTOS DE PRODUCCION', 'ACTIVO', 1, NOW(), 1),
(148 ,147 ,'01' ,'CONSUMO DE MATERIAS PRIMAS', 'ACTIVO', 1, NOW(), 1),
(149 ,148 ,'001' ,'Materia prima directa', 'ACTIVO', 1, NOW(), 1),
(150 ,145 ,'02' ,'GASTOS DE OPERACION', 'ACTIVO', 1, NOW(), 1),
(151 ,150 ,'01' ,'GASTOS DE VENTAS', 'ACTIVO', 1, NOW(), 1),
(152 ,151 ,'01' ,'GASTOS DE ADMINISTRACION', 'ACTIVO', 1, NOW(), 1),
(153 ,152 ,'01' ,'SUELDOS', 'ACTIVO', 1, NOW(), 1),
(154 ,153 ,'001' ,'Sueldos ordinarios administración', 'ACTIVO', 1, NOW(), 1),
(155 ,153 ,'002' ,'Sueldos extraordinarios administración', 'ACTIVO', 1, NOW(), 1),
(156 ,152 ,'02' ,'BONIFICACIONES', 'ACTIVO', 1, NOW(), 1),
(157 ,156 ,'001' ,'Bonificación incentivo administración', 'ACTIVO', 1, NOW(), 1),
(158 ,156 ,'002' ,'Bonificación anual (Bono 14) administración', 'ACTIVO', 1, NOW(), 1),
(159 ,156 ,'003' ,'Otras bonificaciones administración', 'ACTIVO', 1, NOW(), 1),
(160 ,152 ,'03' ,'PRESTACIONES EMPLEADOS ADMINISTRACIÓN', 'ACTIVO', 1, NOW(), 1),
(161 ,160 ,'001' ,'Indemnización administración', 'ACTIVO', 1, NOW(), 1),
(162 ,160 ,'002' ,'Aguinaldo administración', 'ACTIVO', 1, NOW(), 1),
(163 ,160 ,'003' ,'Vacaciones administración', 'ACTIVO', 1, NOW(), 1),
(164 ,160 ,'004' ,'Cuota patronal IGSS administración', 'ACTIVO', 1, NOW(), 1),
(165 ,152 ,'04' ,'SERVICIOS Y ARRENDAMIENTOS', 'ACTIVO', 1, NOW(), 1),
(166 ,165 ,'001' ,'Energía eléctrica', 'ACTIVO', 1, NOW(), 1),
(167 ,165 ,'002' ,'Agua', 'ACTIVO', 1, NOW(), 1),
(168 ,165 ,'003' ,'Teléfono', 'ACTIVO', 1, NOW(), 1),
(169 ,165 ,'004' ,'Internet', 'ACTIVO', 1, NOW(), 1),
(170 ,165 ,'005' ,'Alquiler de bienes', 'ACTIVO', 1, NOW(), 1),
(171 ,165 ,'006' ,'Honorarios profesionales administración', 'ACTIVO', 1, NOW(), 1),
(172 ,165 ,'007' ,'Alquiler de parqueos plaza', 'ACTIVO', 1, NOW(), 1),
(173 ,165 ,'008' ,'Alquiler de parqueos para empleados', 'ACTIVO', 1, NOW(), 1),
(174 ,165 ,'009' ,'Arrendamiento de equipo telefónico', 'ACTIVO', 1, NOW(), 1),
(175 ,165 ,'010' ,'Servicios de Leasing con Outsourcing fortigate', 'ACTIVO', 1, NOW(), 1),
(176 ,165 ,'011' ,'Consumo de copias (2 fotocopiadores)', 'ACTIVO', 1, NOW(), 1),
(177 ,165 ,'012' ,'Servicios profesionales ', 'ACTIVO', 1, NOW(), 1),
(178 ,165 ,'013' ,'Servicios varios (CGLM)', 'ACTIVO', 1, NOW(), 1),
(179 ,165 ,'014' ,'Traducciones', 'ACTIVO', 1, NOW(), 1),
(180 ,165 ,'015' ,'Arrendamiento fotocopiadora (leasing)', 'ACTIVO', 1, NOW(), 1),
(181 ,152 ,'05' ,'OTROS GASTOS DE OPERACION', 'ACTIVO', 1, NOW(), 1),
(182 ,181 ,'001' ,'Papeleria y útiles', 'ACTIVO', 1, NOW(), 1),
(183 ,181 ,'002' ,'Combustibles y lubricantes', 'ACTIVO', 1, NOW(), 1),
(184 ,181 ,'003' ,'Reparación y mantenimiento ', 'ACTIVO', 1, NOW(), 1),
(185 ,181 ,'004' ,'Gastos de limpieza', 'ACTIVO', 1, NOW(), 1),
(186 ,181 ,'005' ,'Gastos varios administrativos', 'ACTIVO', 1, NOW(), 1),
(187 ,181 ,'006' ,'Servicios contables ', 'ACTIVO', 1, NOW(), 1),
(188 ,181 ,'007' ,'Gastos de procuración', 'ACTIVO', 1, NOW(), 1),
(189 ,181 ,'008' ,'Seguros', 'ACTIVO', 1, NOW(), 1),
(190 ,181 ,'009' ,'Servicios de correo (envíos)', 'ACTIVO', 1, NOW(), 1),
(191 ,181 ,'010' ,'Servicios de pequeos contribuyentes', 'ACTIVO', 1, NOW(), 1),
(192 ,181 ,'011' ,'Gastos por el cliente', 'ACTIVO', 1, NOW(), 1),
(193 ,181 ,'012' ,'Mantenimiento impresoras', 'ACTIVO', 1, NOW(), 1),
(194 ,181 ,'013' ,'Mantenimiento aire acondicionado', 'ACTIVO', 1, NOW(), 1),
(195 ,181 ,'014' ,'Capacitaciones', 'ACTIVO', 1, NOW(), 1),
(196 ,181 ,'015' ,'Comision de tarjetas', 'ACTIVO', 1, NOW(), 1),
(197 ,181 ,'016' ,'No deducibles', 'ACTIVO', 1, NOW(), 1),
(198 ,181 ,'017' ,'Impuesto sobre la renta (ISR) gasto', 'ACTIVO', 1, NOW(), 1),
(199 ,181 ,'018' ,'Protocolos y timbres', 'ACTIVO', 1, NOW(), 1),
(200 ,181 ,'019' ,'Atención al personal', 'ACTIVO', 1, NOW(), 1),
(201 ,181 ,'020' ,'Atención a Clientes', 'ACTIVO', 1, NOW(), 1),
(202 ,181 ,'021' ,'Cuentas incobrables', 'ACTIVO', 1, NOW(), 1),
(203 ,181 ,'022' ,'Suscripciones ', 'ACTIVO', 1, NOW(), 1),
(204 ,181 ,'023' ,'Servicios informáticos', 'ACTIVO', 1, NOW(), 1),
(205 ,181 ,'024' ,'Pago en exceso', 'ACTIVO', 1, NOW(), 1),
(206 ,181 ,'025' ,'Servicios de terceros por contratación de personal', 'ACTIVO', 1, NOW(), 1),
(207 ,152 ,'06' ,'DEPRECIACIONES ', 'ACTIVO', 1, NOW(), 1),
(208 ,152 ,'001' ,'Depreciación instalaciones', 'ACTIVO', 1, NOW(), 1),
(209 ,208 ,'002' ,'Depreciación edificios', 'ACTIVO', 1, NOW(), 1),
(210 ,208 ,'003' ,'Depreciación mobiliario y equipo', 'ACTIVO', 1, NOW(), 1),
(211 ,208 ,'004' ,'Depreciación equipo de computación', 'ACTIVO', 1, NOW(), 1),
(212 ,208 ,'005' ,'Depreciación vehículos', 'ACTIVO', 1, NOW(), 1),
(213 ,208 ,'006' ,'Depreciación Sistemas de computo', 'ACTIVO', 1, NOW(), 1),
(214 ,152 ,'07' ,'IMPUESTOS ', 'ACTIVO', 1, NOW(), 1),
(215 ,214 ,'001' ,'Impuesto Unico Sobre Inmuebles', 'ACTIVO', 1, NOW(), 1),
(216 ,214 ,'002' ,'Impuesto de vehículos', 'ACTIVO', 1, NOW(), 1),
(217 ,NULL ,'7' ,'OTROS GASTOS FINANCIEROS', 'ACTIVO', 1, NOW(), 1),
(218 ,217 ,'01' ,'OTROS GASTOS FINANCIEROS', 'ACTIVO', 1, NOW(), 1),
(219 ,218 ,'01' ,'OTROS GASTOS FINANCIEROS', 'ACTIVO', 1, NOW(), 1),
(220 ,219 ,'01' ,'CARGOS FINANCIEROS', 'ACTIVO', 1, NOW(), 1),
(221 ,220 ,'001' ,'ISR sobre intereses ganados', 'ACTIVO', 1, NOW(), 1),
(222 ,220 ,'002' ,'Cobro estados de cuenta', 'ACTIVO', 1, NOW(), 1),
(223 ,200 ,'003' ,'Diferencial cambiario gasto', 'ACTIVO', 1, NOW(), 1),
(224 ,NULL ,'8' ,'OTROS INGRESOS FINANCIEROS', 'ACTIVO', 1, NOW(), 1),
(225 ,224 ,'01' ,'OTROS INGRESOS FINANCIEROS', 'ACTIVO', 1, NOW(), 1),
(226 ,225 ,'01' ,'OTROS INGRESOS FINANCIEROS', 'ACTIVO', 1, NOW(), 1),
(227 ,226 ,'01' ,'INTERESES BANCARIOS', 'ACTIVO', 1, NOW(), 1),
(228 ,227 ,'001' ,'Intereses ganados ', 'ACTIVO', 1, NOW(), 1),
(229 ,227 ,'002' ,'Diferencial cambiario ganancia', 'ACTIVO', 1, NOW(), 1);

INSERT INTO bank (id, created_at, created_by, name, status)
VALUES (1, NOW(), 1, 'Banco Industrial', 'ACTIVO'),
       (2, NOW(), 1, 'Banrural', 'ACTIVO'),
       (3, NOW(), 1, 'Banco Citybank', 'ACTIVO'),
       (4, NOW(), 1, 'Banco GyT Continental', 'ACTIVO');

INSERT INTO transaction_type (id, created_at, created_by, name, status)
VALUES (1, NOW(), 1, 'Transferencia Bancaria', 'ACTIVO'),
       (2, NOW(), 1, 'Cheque de caja', 'ACTIVO'),
       (3, NOW(), 1, 'Cheque', 'ACTIVO'),
       (4, NOW(), 1, 'Efectivo', 'ACTIVO');
