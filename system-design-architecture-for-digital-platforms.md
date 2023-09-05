# System Design Architecture for scalable robust digital platforms
There are many recognized architectural patterns and styles, among them:


```

1. Client-server ( 2-tier, 3-tier, n-tier, cloud computing exhibit this style)

2. Layered (or multilayered architecture)

3. Microservices architecture

4. Event Driven  / Implicit invocation 

5. Monolithic application : A monolithic application describes a single-tiered software application in which the user interface and data access code are combined into a single program from a single platform. A monolithic application is self-contained, and independent from other computing applications.

6. Micro-kernael (COTS/Plugin)

7. Publish/Subscribe

8. Component-based

9. Data-centric

```
By combining the technologies, methodologies and practices below, you can successfully build a digital platform that will be highly scalable, reliable, and maintainable. The platform could efficiently handle growing user loads, recover from failures, and provide actionable insights through comprehensive monitoring and observability. This approach will ensure the platform's resilience and responsiveness, meeting the demands of a dynamic digital landscape.

- Software System Design Architecture: Start by carefully designing the architecture of the digital platform. follow established software engineering standard methodologies such as the SOLID principles, Domain-Driven Design (DDD) to ensure a maintainable and scalable system and also Security andProject Management methodolgies and guidelines like OWASP, TOGAF, Agile etc.

- Cloud Technology: Leveraging cloud services, particularly AWS, Azure, or Google Cloud, architecting the platform for scalability and reliability. Cloud-native solutions will allow for easy scaling and disaster recovery planning.

- Node.js and TypeScript: Node.js was chosen as the backend runtime due to its efficiency and non-blocking I/O. TypeScript was employed to bring strong typing and improved maintainability to the codebase.

- Microservices and Event-Driven APIs: Divide the platform into microservices (where necessary), each responsible for a specific domain or functionality. Event-driven architecture using message queues like RabbitMQ or Kafka facilitated asynchronous communication between these microservices.

- Integration and DevOps: Common integration tasks were streamlined by implementing CI/CD pipelines. Tools like Jenkins or GitLab CI were used to automate testing and deployments. Infrastructure as Code (IaC) with tools like Terraform or AWS CloudFormation was employed for infrastructure provisioning.

- Kubernetes: Containerization using Docker and orchestration with Kubernetes enabled easy management and scaling of microservices. Kubernetes provided features like load balancing, self-healing, and rolling updates.

- Monitoring and Observability: I implemented monitoring and observability solutions using Prometheus and Grafana. This allowed for real-time monitoring of application health, resource utilization, and the ability to set up alerts for proactive issue resolution.


## Principles of Software Design Architecture

- https://github.com/kukuu/AGILITY/raw/master/white-paper/principles-of-sw-architecture.png


i. Identify Business goals 
       
ii. Quality Attributes 
       
iii. Architecture

iv. Design

v. Code (Implementation)

## Design decision

- https://github.com/kukuu/AGILITY/raw/master/white-paper/software-architecture-main.jpg


##  How to convert monolithic to Microservices

1. Look for probable targets by researching the Monolith and warm up with a simple and fairly decoupled capability. 
   i.e Authentication and then Profile

2. Minimize Dependency Back to the Monolith. i.e Buying and promotion. 
   Buying has dependencies including promotion. Decouple promotions from buying.

3. Split Sticky Capabilities Early.

4. Decouple Vertically and Release the Data Early.

5. Decouple What is Important to the Business and Changes Frequently.

6. Decouple Capability and not Code.

7. Go Macro First, then Micro.

## NodeJS Microservice

- https://github.com/kukuu/microservices

- https://github.com/kukuu/microservices/tree/master/microservice-nodejs-express

![image](https://github.com/kukuu/integration/assets/10147828/cd910655-6da1-4a00-ba00-16efabc7b0a2)

## SPRING BOOT JAVA Microservice

![image](https://github.com/kukuu/integration/assets/10147828/e48fa1d1-8fe2-4c30-8e8d-43274d263898)


## CI/CD

- ![image](https://github.com/kukuu/integration/assets/10147828/e06f4212-8d1e-4782-9a9c-2f11b8b54616)

## Kubernetes Orchestration

![image](https://github.com/kukuu/integration/assets/10147828/116fd731-8f01-4c0b-9f95-ed02d7bc726c)

## Further reading

- https://github.com/kukuu/integration
- https://github.com/kukuu/system-design-architecture/blob/master/README.md
- https://github.com/kukuu/integration/blob/main/jwt.md
- https://github.com/kukuu/AGILITY/raw/master/white-paper/JWT-architecture.png
