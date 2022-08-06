output "frontend_ip" {
  value = linode_instance.frontend.ip_address
}

output "backend_ip" {
  value = linode_instance.backend.ip_address
}

output "db_host" {
  value = linode_database_postgresql.db.host_primary
}