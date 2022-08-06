terraform {
  required_version = ">= 1.0"

  required_providers {
    linode = {
      source  = "linode/linode"
      version = "~> 1.28"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "noodle-cloud"

    workspaces {
      name = "silly-goose"
    }
  }
}

provider "linode" {
  token = var.linode_token
}
