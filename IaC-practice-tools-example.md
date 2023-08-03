# Code, Practice and Tools used in implementing Infrastructure as Code (IaC)

The following are  few examples of the code, practices, and tools used in Infrastructure as Code. 

## Using Terraform

- Code
```
# Example Terraform code to create an AWS EC2 instance
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  tags = {
    Name = "Example Instance"
  }
}


```

- Practice:Define your infrastructure as declarative code, where you specify the desired state of your infrastructure, and the IaC tool takes care of creating and managing the resources to achieve that state. Emphasize version control to track changes and collaborate effectively.

## AWS CloudFormation
AWS CloudFormation is a native IaC service from Amazon Web Services. It allows you to define infrastructure as JSON or YAML templates and manage the entire AWS stack in a version-controlled manner.

- Code
```
# Example AWS CloudFormation YAML template to create an S3 bucket
Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-example-bucket


```

- Practice: Use templates to define the complete infrastructure stack, including resources and their configurations. Implement parameterization to make the templates reusable across different environments.

## Ansible

 Ansible is a powerful IaC tool that uses YAML-based playbooks to automate infrastructure management, configuration, and application deployment across multiple systems.

 - Code

```
# Example Ansible playbook to install and configure Nginx on remote servers
- hosts: web_servers
  become: yes

  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: Configure Nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf

```
- Practice:  Use Ansible playbooks to describe the desired state of servers and applications, automating the setup and configuration process.

## Pulumi

Pulumi is a multi-cloud IaC tool that allows you to define infrastructure and resources using popular programming languages. It supports multiple cloud providers like AWS, Azure, Google Cloud, and Kubernetes.

- Code:

```
// Example Pulumi code to create an Azure Virtual Machine
import * as azure from "@pulumi/azure";

const resourceGroup = new azure.core.ResourceGroup("example-rg");

const vm = new azure.compute.VirtualMachine("example-vm", {
    resourceGroupName: resourceGroup.name,
    vmSize: "Standard_B1s",
    osDisk: {
        storageAccountType: "Standard_LRS",
        createOption: "FromImage",
    },
    osProfile: {
        computerName: "example-vm",
        adminUsername: "adminuser",
        adminPassword: "P@ssword1234!",
    },
    storageImageReference: {
        publisher: "Canonical",
        offer: "UbuntuServer",
        sku: "16.04-LTS",
        version: "latest",
    },
    networkInterfaceIds: [
        exampleNic.id,
    ],
});

export const vmName = vm.name;

```
- Practice: Use Pulumi to define infrastructure as real code using familiar programming languages like TypeScript, Python, or Go. This enables greater flexibility and allows you to use existing code libraries and tools.
   
