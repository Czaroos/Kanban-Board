pipeline {
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
    }
}