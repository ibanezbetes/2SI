/////////////////// PROVIDER //////////////////
// Title: Provider AWS
// Description: Define el proveedor de AWS que usará Terraform. 
//              Las credenciales NO se escriben en el código.
//              Se leen de variables de entorno, perfiles del AWS CLI o IAM roles.
/////////////////// PROVIDER //////////////////

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.6.0"
}

provider "aws" {
  region = var.region
  # Usa AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY y AWS_SESSION_TOKEN 
  # exportados en tu terminal o configurados en ~/.aws/credentials
}

/////////////////// VARIABLES //////////////////
// Title: Variables
// Description: Definen parámetros personalizables del despliegue (región, clave SSH, rango SSH).
/////////////////// VARIABLES //////////////////

variable "region" {
  type        = string
  description = "Región AWS donde se desplegará (ej. us-east-1)"
  default     = "us-east-1"
}

variable "ssh_key_name" {
  type        = string
  description = "Nombre del KeyPair existente en la región para acceder por SSH"
  default     = "terraform-amazon"
}

variable "allowed_ssh_cidr" {
  type        = string
  description = "IP/CIDR desde la que se permitirá SSH (ej. 1.2.3.4/32)"
  default     = "0.0.0.0/0"
}

/////////////////// SECURITY GROUP //////////////////
// Title: Security Group
// Description: Grupo de seguridad que permite SSH (22) y HTTP (80).
/////////////////// SECURITY GROUP //////////////////

resource "aws_security_group" "web_sg" {
  name        = "tf-web-sg"
  description = "Permitir SSH y HTTP"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Salida a internet"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "tf-web-sg" }
}

/////////////////// EC2 //////////////////
// Title: EC2 Instance (Amazon Linux 2)
// Description: Crea una instancia EC2 con Amazon Linux 2, 
//              instala Nginx al arrancar y publica una página de prueba.
/////////////////// EC2 //////////////////

# AMI más reciente de Amazon Linux 2 (propietario oficial de Amazon)
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["137112412989"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "web" {
  ami                         = data.aws_ami.amazon_linux_2.id
  instance_type               = "t3.micro"
  key_name                    = var.ssh_key_name
  vpc_security_group_ids      = [aws_security_group.web_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              set -e
              yum update -y
              amazon-linux-extras enable nginx1
              yum install -y nginx
              systemctl enable nginx
              systemctl start nginx
              echo "Hola desde Terraform + Amazon Linux 2" > /usr/share/nginx/html/index.html
              EOF

  tags = { Name = "tf-amzn2-nginx-demo" }
}

/////////////////// OUTPUTS //////////////////
// Title: Outputs
// Description: Muestra la IP pública y el DNS de la instancia EC2 
//              para comprobar el acceso al servidor web.
/////////////////// OUTPUTS //////////////////

output "public_ip" {
  description = "IP pública de la instancia"
  value       = aws_instance.web.public_ip
}

output "public_dns" {
  description = "DNS público de la instancia"
  value       = aws_instance.web.public_dns
}