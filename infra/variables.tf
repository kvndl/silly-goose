variable "linode_token" {
}

variable "name" {
  default = "silly-goose"
}

variable "region" {
  default = "us-east"
}

variable "public_key" {
}

variable "instance_root_pass" {
}

variable "instance_image" {
  default = "linode/rocky9"
}

variable "db_type" {
  default = "postgresql"
}

variable "db_engine_id" {
  default = "postgresql/13.2"
}

variable "db_cluster_size" {
  default = 1
}

variable "db_encrypted" {
  default = true
}
