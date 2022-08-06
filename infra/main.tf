locals {
  tags = [
    "terraform",
    var.name
  ]
}

# 
# Instance - Frontend
# 

resource "linode_instance" "frontend" {
  label           = "${var.name}-frontend"
  image           = var.instance_image
  region          = var.region
  type            = "g6-nanode-1"
  authorized_keys = [var.public_key]
  root_pass       = var.instance_root_pass

  group = var.name
  tags  = local.tags
}

# 
# Instance - Backend
# 

resource "linode_instance" "backend" {
  label           = "${var.name}-backend"
  image           = var.instance_image
  region          = var.region
  type            = "g6-nanode-1"
  authorized_keys = [var.public_key]
  root_pass       = var.instance_root_pass

  group = var.name
  tags  = local.tags
}

# 
# Database PostgreSQL
# 

resource "linode_database_access_controls" "db_ac" {
  database_id   = linode_database_postgresql.db.id
  database_type = var.db_type
  allow_list = [
    linode_instance.frontend.ip_address,
    linode_instance.backend.ip_address,
  ]
}

resource "linode_database_postgresql" "db" {
  label     = "${var.name}-db"
  engine_id = var.db_engine_id
  region    = var.region
  type      = "g6-nanode-1"

  cluster_size = var.db_cluster_size
  encrypted    = var.db_encrypted

  updates {
    day_of_week   = "monday"
    duration      = 1
    frequency     = "monthly"
    hour_of_day   = 6
    week_of_month = 2
  }
}