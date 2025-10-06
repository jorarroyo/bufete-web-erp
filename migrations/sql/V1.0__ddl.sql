CREATE TABLE activities (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  name varchar(150) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE activity_settlement (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  assign_date datetime DEFAULT NULL,
  comments varchar(255) DEFAULT NULL,
  invoice_currency int(11) DEFAULT NULL,
  invoice_description varchar(255) DEFAULT NULL,
  invoice_name varchar(255) DEFAULT NULL,
  invoice_num varchar(255) DEFAULT NULL,
  invoice_range varchar(255) DEFAULT NULL,
  invoice_total double DEFAULT NULL,
  invoice_type int(11) DEFAULT NULL,
  proctor_agenda_id bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE activity_settlement_detail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  activity_settlement_id bigint(20) DEFAULT NULL,
  case_activity_id bigint(20) DEFAULT NULL,
  cost_detail double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE addresses (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  address varchar(150) DEFAULT NULL,
  address_type int(11) NOT NULL,
  entity_id bigint(20) NOT NULL,
  entity_type int(11) NOT NULL,
  municipality_id bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  zone varchar(3) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE app_config (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  company_id bigint(20) DEFAULT NULL,
  config_name varchar(255) DEFAULT NULL,
  config_value varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE app_options (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE case_activity (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  activity_cost double DEFAULT NULL,
  activity_end_date datetime DEFAULT NULL,
  activity_id bigint(20) DEFAULT NULL,
  activity_start_date datetime DEFAULT NULL,
  activity_time double DEFAULT NULL,
  assign_date datetime DEFAULT NULL,
  case_activity_type varchar(20) DEFAULT NULL,
  check_amount double DEFAULT NULL,
  check_number varchar(255) DEFAULT NULL,
  comment varchar(255) DEFAULT NULL,
  currency_type int(11) DEFAULT NULL,
  employee_id bigint(20) DEFAULT NULL,
  institution_id bigint(20) DEFAULT NULL,
  proctor_agenda_id bigint(20) DEFAULT NULL,
  file_record_id bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE clients (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  acronym varchar(10) DEFAULT NULL,
  client_type int(11) NOT NULL,
  last_name varchar(100) DEFAULT NULL,
  name varchar(100) DEFAULT NULL,
  nit varchar(10) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE companies (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  name varchar(150) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE configurations (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  name varchar(100) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  value varchar(150) DEFAULT NULL,
  company_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  KEY FK8ggexvkmm47n6fa5wkk6if49 (company_id),
  CONSTRAINT FK8ggexvkmm47n6fa5wkk6if49 FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE contact_entity (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  contact_address varchar(150) DEFAULT NULL,
  contact_email varchar(100) DEFAULT NULL,
  entity_id bigint(20) NOT NULL,
  entity_type int(11) NOT NULL,
  contact_name varchar(150) DEFAULT NULL,
  contact_phone varchar(30) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  contact_type int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE countries (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  country_code varchar(255) DEFAULT NULL,
  country_name varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE currencies (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  exchange_value double DEFAULT NULL,
  name varchar(100) DEFAULT NULL,
  short_name varchar(10) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  company_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  KEY FKio9vluochrb0a0oa14bu3srx6 (company_id),
  CONSTRAINT FKio9vluochrb0a0oa14bu3srx6 FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE departments (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE document_sequence (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  document_type varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE employees (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  academic_level varchar(70) DEFAULT NULL,
  address varchar(100) DEFAULT NULL,
  employee_adminission datetime DEFAULT NULL,
  amount_per_hour double DEFAULT NULL,
  cel_phone varchar(10) DEFAULT NULL,
  child_no int(11) DEFAULT NULL,
  civil_status varchar(10) DEFAULT NULL,
  home_phone varchar(10) DEFAULT NULL,
  igss varchar(10) DEFAULT NULL,
  languages varchar(100) DEFAULT NULL,
  last_name varchar(100) DEFAULT NULL,
  name varchar(100) DEFAULT NULL,
  nit varchar(10) DEFAULT NULL,
  position bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  title varchar(70) DEFAULT NULL,
  village varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE providers (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  code varchar(15) DEFAULT NULL,
  name varchar(150) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_28cpfg46e512vvygoxitxb2h6 (code)
) ENGINE=InnoDB AUTO_INCREMENT=484 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE concepts (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  code varchar(15) DEFAULT NULL,
  name varchar(150) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  type varchar(1) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_4x7kwmf1rxdtbj0py682w5itn (code)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE file_manager (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  entity_id bigint(20) DEFAULT NULL,
  entity_type int(11) DEFAULT NULL,
  file_content_type varchar(255) DEFAULT NULL,
  file_full_name varchar(255) DEFAULT NULL,
  file_name varchar(255) DEFAULT NULL,
  file_path varchar(200) DEFAULT NULL,
  file_size bigint(20) DEFAULT NULL,
  file_type varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE institutions (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  name varchar(150) DEFAULT NULL,
  short_name varchar(50) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE invoice_series (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  series_name varchar(255) DEFAULT NULL,
  series_value varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_kbeuhalf35afue03tebdak3s1 (series_value)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE municipalities (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  department_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  KEY FKbv7fvmtec7tpmhxb6ojlhgm6m (department_id),
  CONSTRAINT FKbv7fvmtec7tpmhxb6ojlhgm6m FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=908 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE personal_info (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  birthday datetime DEFAULT NULL,
  doc_emmit varchar(255) DEFAULT NULL,
  doc_num varchar(255) DEFAULT NULL,
  doc_type int(11) DEFAULT NULL,
  entity_id bigint(20) NOT NULL,
  entity_type int(11) NOT NULL,
  lawyer bigint(20) DEFAULT NULL,
  lawyer_assistant bigint(20) DEFAULT NULL,
  lawyer_jr bigint(20) DEFAULT NULL,
  observation varchar(255) DEFAULT NULL,
  sex_type int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE phone_contact (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  entity_id bigint(20) NOT NULL,
  entity_type int(11) NOT NULL,
  phone_number varchar(16) DEFAULT NULL,
  phone_type int(11) NOT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE proctor_agenda (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  agenda_invoice_amount_local double DEFAULT NULL,
  agenda_invoice_amount_outer double DEFAULT NULL,
  agenda_return_amount_local double DEFAULT NULL,
  agenda_return_amount_outer double DEFAULT NULL,
  assign_date datetime DEFAULT NULL,
  comment varchar(255) DEFAULT NULL,
  employee_id bigint(20) DEFAULT NULL,
  proctor_agenda_cost_local double DEFAULT NULL,
  proctor_agenda_cost_outer double DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE proctor_agenda_detail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  activity_cost double DEFAULT NULL,
  case_activity_id bigint(20) DEFAULT NULL,
  comment varchar(255) DEFAULT NULL,
  currency_type int(11) DEFAULT NULL,
  proctor_agenda_id bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE product_movement (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  action varchar(20) DEFAULT NULL,
  inventory_id bigint(20) DEFAULT NULL,
  product_id bigint(20) DEFAULT NULL,
  quantity double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE product_property (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_type varchar(20) DEFAULT NULL,
  property_column_name varchar(255) DEFAULT NULL,
  property_name varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE products (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  min_quantity double DEFAULT NULL,
  product_code varchar(255) DEFAULT NULL,
  product_existence double DEFAULT NULL,
  product_inv_type varchar(20) DEFAULT NULL,
  product_name varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  unit_value double DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_922x4t23nx64422orei4meb2y (product_code)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE products_detail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) DEFAULT NULL,
  product_property bigint(20) DEFAULT NULL,
  property_value varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE receipts (
  id bigint(20) NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  exchange_rate double DEFAULT NULL,
  object_type varchar(20) DEFAULT NULL,
  receipt_address_id bigint(20) DEFAULT NULL,
  receipt_date datetime DEFAULT NULL,
  receipt_iva double DEFAULT NULL,
  receipt_settlement_id bigint(20) DEFAULT NULL,
  receipt_total double DEFAULT NULL,
  receipt_total_discount double DEFAULT NULL,
  serial_number varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  client_id bigint(20) DEFAULT NULL,
  currency_id bigint(20) DEFAULT NULL,
  invoice_series_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FKcjqb6i39fwtry5rgmvft2ihjf (client_id),
  KEY FK9eg3m4gd9xspbnkfaqwh56ief (currency_id),
  KEY FK7rgs8q7n1uvs8lcg38mevimmf (invoice_series_id),
  CONSTRAINT FK7rgs8q7n1uvs8lcg38mevimmf FOREIGN KEY (invoice_series_id) REFERENCES invoice_series (id),
  CONSTRAINT FK9eg3m4gd9xspbnkfaqwh56ief FOREIGN KEY (currency_id) REFERENCES currencies (id),
  CONSTRAINT FKcjqb6i39fwtry5rgmvft2ihjf FOREIGN KEY (client_id) REFERENCES clients (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE receipt_details (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  description varchar(255) DEFAULT NULL,
  line_amount double DEFAULT NULL,
  line_discount double DEFAULT NULL,
  line_total double DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  use_isr bit(1) DEFAULT NULL,
  use_iva bit(1) DEFAULT NULL,
  receipt_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FKgg9qo0w1vjcu9ridx36dyrhn2 (receipt_id),
  CONSTRAINT FKgg9qo0w1vjcu9ridx36dyrhn2 FOREIGN KEY (receipt_id) REFERENCES receipts (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE receipt_settlement (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  receipt_total double DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  type varchar(20) DEFAULT NULL,
  client_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FKqg0njhrqc6h0s42ob1pbnvnif (client_id),
  CONSTRAINT FKqg0njhrqc6h0s42ob1pbnvnif FOREIGN KEY (client_id) REFERENCES clients (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE receipt_settlement_detail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  activity_time double DEFAULT NULL,
  comment varchar(255) DEFAULT NULL,
  cost_detail double DEFAULT NULL,
  cost_per_hour double DEFAULT NULL,
  discount double DEFAULT NULL,
  discount_type bit(1) DEFAULT NULL,
  employee_id bigint(20) DEFAULT NULL,
  exchange_value double DEFAULT NULL,
  object_type varchar(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  total double DEFAULT NULL,
  use_billing bit(1) DEFAULT NULL,
  use_isr bit(1) DEFAULT NULL,
  use_iva bit(1) DEFAULT NULL,
  receipt_settlement_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FKk5w025mrefxql6ibx8cr2gxa4 (receipt_settlement_id),
  CONSTRAINT FKk5w025mrefxql6ibx8cr2gxa4 FOREIGN KEY (receipt_settlement_id) REFERENCES receipt_settlement (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE receipt_settlement_report (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  client_name varchar(255) DEFAULT NULL,
  document_date varchar(255) DEFAULT NULL,
  file_num varchar(255) DEFAULT NULL,
  footer_text varchar(255) DEFAULT NULL,
  header_text varchar(1000) DEFAULT NULL,
  receipt_settlement_id bigint(20) DEFAULT NULL,
  total double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE record_file (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  closing_date datetime DEFAULT NULL,
  confidential bit(1) DEFAULT NULL,
  file_num varchar(255) DEFAULT NULL,
  judgement_no varchar(255) DEFAULT NULL,
  location varchar(255) DEFAULT NULL,
  observations varchar(255) DEFAULT NULL,
  opening_date datetime DEFAULT NULL,
  priority varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  sub_type bigint(20) DEFAULT NULL,
  subject varchar(255) DEFAULT NULL,
  type bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_6ttktnr2tr9rrumpv4qvu3kan (file_num)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE record_file_details (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  entity_id bigint(20) DEFAULT NULL,
  entity_type int(11) DEFAULT NULL,
  file_record_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE record_subtype (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(150) DEFAULT NULL,
  record_type_id bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE record_type (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(150) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE roles (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  name varchar(60) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_ofx66keruapi6vyqpv6f2or37 (name)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE role_app_options (
  app_option_id bigint(20) NOT NULL,
  role_id bigint(20) NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (app_option_id,role_id),
  KEY FKa6rkfpqkldfynr31ej4yvh585 (role_id),
  CONSTRAINT FKa6rkfpqkldfynr31ej4yvh585 FOREIGN KEY (role_id) REFERENCES roles (id),
  CONSTRAINT FKftq11oncnl2o6e74e3g3f7ysy FOREIGN KEY (app_option_id) REFERENCES app_options (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE shared_catalog (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  parent_id bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  type int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE stamp_duty (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  designation_type bigint(20) DEFAULT NULL,
  stamp_type bigint(20) DEFAULT NULL,
  total_stamp_number double DEFAULT NULL,
  year int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE stamp_duty_action (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  action varchar(20) DEFAULT NULL,
  activity_id bigint(20) DEFAULT NULL,
  comment varchar(255) DEFAULT NULL,
  employee_id bigint(20) DEFAULT NULL,
  form_number varchar(255) DEFAULT NULL,
  form_range varchar(255) DEFAULT NULL,
  purchase_date datetime DEFAULT NULL,
  stamp_id bigint(20) DEFAULT NULL,
  stamp_number double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE stamp_inventory (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  inventory_type varchar(20) DEFAULT NULL,
  receipt_number varchar(255) DEFAULT NULL,
  file_record_id bigint(20) DEFAULT NULL,
  reference varchar(255) DEFAULT NULL,
  request_date datetime DEFAULT NULL,
  request_type int(11) DEFAULT NULL,
  requester_id bigint(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  total double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE stamp_inventory_detail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  inventory_id bigint(20) DEFAULT NULL,
  product_id bigint(20) DEFAULT NULL,
  quantity_request double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE status_flow (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  entity_type int(11) DEFAULT NULL,
  next_status varchar(20) DEFAULT NULL,
  prev_status varchar(20) DEFAULT NULL,
  privilege varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE status_history (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  comment varchar(255) DEFAULT NULL,
  entity_id bigint(20) DEFAULT NULL,
  entity_type int(11) DEFAULT NULL,
  next_status varchar(20) DEFAULT NULL,
  prev_status varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE users (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  email varchar(40) DEFAULT NULL,
  employee_id bigint(20) NOT NULL,
  name varchar(40) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  username varchar(15) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UKr43af9ap4edm43mmtq01oddj6 (username),
  UNIQUE KEY UK6dotkott2kjsp8vw4d0m25fb7 (email)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_role_company (
  company_id bigint(20) NOT NULL,
  role_id bigint(20) NOT NULL,
  user_id bigint(20) NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  PRIMARY KEY (company_id,role_id,user_id),
  KEY FKqppnp2wscbk9fv51fw0q7fstm (role_id),
  KEY FKfwb8ki3sxim1h97st9wyg6fy9 (user_id),
  CONSTRAINT FKfwb8ki3sxim1h97st9wyg6fy9 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT FKphw81aw2yy9mok62jghuq4c2y FOREIGN KEY (company_id) REFERENCES companies (id),
  CONSTRAINT FKqppnp2wscbk9fv51fw0q7fstm FOREIGN KEY (role_id) REFERENCES roles (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE expenses (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  exchange_rate double DEFAULT NULL,
  expenses_date datetime DEFAULT NULL,
  expenses_num varchar(255) DEFAULT NULL,
  expenses_total double DEFAULT NULL,
  expenses_type int(11) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  concept_id bigint(20) DEFAULT NULL,
  expenses_currency bigint(20) DEFAULT NULL,
  provider_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FKlcfdnqy465k2ibxywvrcv3uo6 (concept_id),
  KEY FKlwmvfy8jiw94lswoer5tnwy02 (expenses_currency),
  KEY FKjvehij9pqccuykap9ffhjrskp (provider_id),
  CONSTRAINT FKjvehij9pqccuykap9ffhjrskp FOREIGN KEY (provider_id) REFERENCES providers (id),
  CONSTRAINT FKlcfdnqy465k2ibxywvrcv3uo6 FOREIGN KEY (concept_id) REFERENCES concepts (id),
  CONSTRAINT FKlwmvfy8jiw94lswoer5tnwy02 FOREIGN KEY (expenses_currency) REFERENCES currencies (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE expenses_detail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  created_by bigint(20) DEFAULT NULL,
  updated_by bigint(20) DEFAULT NULL,
  expense_value double DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  expenses_id bigint(20) DEFAULT NULL,
  file_record_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FKs0lbgswjjpv5qoscybudti7oh (expenses_id),
  KEY FKromfkdf1l8rlshpn38pttfq9r (file_record_id),
  CONSTRAINT FKromfkdf1l8rlshpn38pttfq9r FOREIGN KEY (file_record_id) REFERENCES record_file (id),
  CONSTRAINT FKs0lbgswjjpv5qoscybudti7oh FOREIGN KEY (expenses_id) REFERENCES expenses (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE fees_receipt_settlement (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  updated_at datetime DEFAULT NULL,
  object_id bigint(20) DEFAULT NULL,
  object_type varchar(20) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  receipt_settlement_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FK4qpuo1ff6lbkns8opu7gkgo9p (receipt_settlement_id),
  CONSTRAINT FK4qpuo1ff6lbkns8opu7gkgo9p FOREIGN KEY (receipt_settlement_id) REFERENCES receipt_settlement (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table if not exists record_file_merge_history
(
	id bigint auto_increment
		primary key,
	created_at datetime not null,
	updated_at datetime null,
	created_by bigint null,
	updated_by bigint null,
	merge_record_id bigint null,
	original_record_id bigint null
);


