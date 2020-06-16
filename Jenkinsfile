pipeline {
    environment {
      DOCKER = credentials('docker-hub')
    }
    agent {
        docker {
            image 'node:12'
            args '-p 5000:5000'
        }
    }
    stages {
        stage('Build') {
            steps {
                echo 'Backend build'
                sh 'cd backend && npm install'
                echo 'Frontend build'
                sh 'cd frontend && npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'cd frontend && npm test ./__tests__'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker login --username $DOCKER_USR --password $DOCKER_PSW'
                echo 'Docker build & publish backend'
                sh 'cd backend && docker build -t michalzdev/kanbak_production_backend:latest'
                sh 'docker push michalzdev/kanbak_production_backend:latest'
                echo 'Docker build & publish frontend'
                sh 'cd frontend && docker build -t michalzdev/kanbak_production_frontend:latest'
                sh 'docker push michalzdev/kanbak_production_frontend:latest'
            }
        }
    }
}