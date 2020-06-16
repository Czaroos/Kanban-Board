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
                sh 'pwd'
                echo 'Frontend build'
                sh 'cd fronend && npm install'
            }
        }
    }
}