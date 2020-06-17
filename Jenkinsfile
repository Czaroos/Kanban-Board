pipeline {

    environment {
      DOCKER = credentials('docker-hub')
    }
    agent none
    stages {
        stage('Build') {
            agent { docker 'node:12'}
            steps {
                echo 'Backend build'
                sh 'cd backend && npm install'
                echo 'Frontend build'
                sh 'cd frontend && npm install'
            }
        }
        stage('Test') {
            agent { docker 'node:12'}
            steps {
                sh 'cd frontend && npm test ./__tests__'
            }
        }
        stage('Publish Backend') {
            agent any 
            steps {
                sh 'docker login --username $DOCKER_USR --password $DOCKER_PSW'
                echo 'Docker build & publish backend'
                sh 'cd backend && docker build -t michalzdev/kanbak_production_backend:latest .'
                sh 'docker push michalzdev/kanbak_production_backend:latest'
            }
        }
        stage('Publish Frontend'){
            agent any 
            steps {
                sh 'docker login --username $DOCKER_USR --password $DOCKER_PSW'
                echo 'Docker build & publish frontend'
                sh 'cd frontend && docker build -t michalzdev/kanbak_production_frontend:latest .'
                sh 'docker push michalzdev/kanbak_production_frontend:latest'
            }
        }
        stage('Deploy'){
            agent any
            steps {
                sh 'docker-compose up'
            }
        }
    }
}