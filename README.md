# 🚀 SIT737 – Cloud-Native Application Development  
**Task 6.2C – Interacting with Kubernetes Cluster**

---

Overview  
In this task, we extended the deployment from Task 6 by actively interacting with the **Kubernetes cluster** using the `kubectl` CLI and **Kubernetes Dashboard**.  
The task involved verifying the application status, using port forwarding to access the service locally, and finally updating the microservice by modifying its code and redeploying it with a new image tag.

---

## 🧰 Tools Used  
- [Node.js](https://nodejs.org/en/)  
- [Docker](https://www.docker.com/)  
- [Kubernetes](https://kubernetes.io/)  
- `kubectl` – Kubernetes CLI  
- [Visual Studio Code](https://code.visualstudio.com/)  
- [Docker Hub](https://hub.docker.com/) or GCR for container registry

---


## ✅ Part I – Interacting with the Deployed Application

### 🔹 1. Verify Kubernetes Resources
Run the following to check if your pods and services are active:

kubectl get pods
kubectl get services

 2. Port-Forward the Application
Forward your service to a local port (e.g., localhost:8080):
kubectl port-forward service/calculator-service 8080:80

 3. Access Through Browser
Open a browser and test:
http://localhost:8080/add?num1=10&num2=5

## ✅ Part II – Updating the Application
1. Modify the Node.js Code
Open server.js and update the response format, logging, or add a new endpoint (e.g., /version).

app.get('/version', (req, res) => {
    res.json({ version: "v2.0" });
});
2. Rebuild Docker Image with New Tag
docker build -t calculator-microservice:v2 .
docker tag calculator-microservice:v2 your-dockerhub/calculator-microservice:v2
docker push your-dockerhub/calculator-microservice:v2
3. Update Kubernetes Deployment
Edit your deployment.yaml and change the image tag:

containers:
  - name: calculator
    image: your-dockerhub/calculator-microservice:v2
Apply the updated deployment:
kubectl apply -f deployment.yaml
4. Verify the Update
Check if the new pods are running:
kubectl get pods
Port-forward again if needed:
kubectl port-forward service/calculator-service 8080:80
Test the new endpoint:
http://localhost:8080/version

