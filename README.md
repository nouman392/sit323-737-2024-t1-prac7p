# 📐 Calculator Microservice with MongoDB Integration

This project is a Node.js-based calculator microservice extended with MongoDB support and deployed in a Kubernetes environment. It supports basic and advanced arithmetic operations and persists calculation data in a MongoDB database.

---

## 🚀 Features

- ✅ REST API for basic & advanced arithmetic (add, subtract, multiply, divide, exponentiation, sqrt, modulo)
- ✅ MongoDB-backed persistent storage for all calculations
- ✅ Full CRUD API: Create, Read, Update, Delete
- ✅ Kubernetes-native deployment with:
  - Secrets for sensitive credentials
  - Persistent storage for MongoDB
  - ConfigMaps for MongoDB initialization
- ✅ Docker + Docker Compose support for local development

---

## 🛠️ Tech Stack

- **Node.js** with Express.js  
- **MongoDB** for database  
- **Mongoose** for MongoDB client  
- **Docker** for containerization  
- **Kubernetes** for orchestration  
- **Winston** for logging

---

## 📁 Folder Structure

├── server.js
├── Dockerfile
├── docker-compose.yml
├── mongo-init.js
├── mongo-configmap.yaml
├── mongo-secret.yaml
├── mongo-pv.yaml
├── mongo-pvc.yaml
├── mongodb-deployment.yaml
├── mongodb-service.yaml
├── calculator-deployment.yaml
├── service.yaml

 Kubernetes Setup
Apply MongoDB storage & config
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f mongo-secret.yaml
Deploy MongoDB
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml
Deploy Calculator Microservice
kubectl apply -f calculator-deployment.yaml
kubectl apply -f service.yaml