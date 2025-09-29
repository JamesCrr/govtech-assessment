# Node Hello World

Simple node.js app that servers "hello world"

Great for testing simple deployments to the cloud

## Run It

`npm start`

## I chose ECS Fargate over EC2 for several reasons:

1. Operational Overhead
   With EC2, I'd need to manage the underlying servers - patching, scaling, monitoring OS health. ECS Fargate abstracts this away, letting me
   focus on the application rather than infrastructure maintenance.

2. Cost Efficiency
   For this workload, Fargate's pay-per-use model is more cost-effective than running dedicated EC2 instances. I only pay for the exact
   CPU/memory my container uses (256 CPU, 512MB), without paying for idle EC2 capacity.

3. Automatic Scaling
   ECS integrates seamlessly with Application Auto Scaling. If I need to scale based on CPU or custom metrics, ECS handles the container
   orchestration automatically. With EC2, I'd need to build this scaling logic myself.

4. High Availability
   The current setup deploys across two AZs automatically. If there's an AZ failure, ECS will reschedule the container in the healthy AZ. With
   EC2, I'd need additional complexity for multi-AZ deployments.

5. Container-First Design
   Since this is already a containerized Node.js app, ECS is the natural choice. It provides native Docker support without needing to install
   and manage Docker on EC2 instances.

When I'd Choose EC2:

- If I needed persistent storage or stateful applications
- For legacy applications that can't be containerized
- When I need full control over the operating system
- For specialized instance types (GPU, high-memory workloads)
