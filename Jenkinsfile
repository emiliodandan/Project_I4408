pipeline {
    agent any
    stages {
        stage('Install dependencies') {
            steps {
                dir('frontend/CRM') {
                    bat 'npm install'
                }
            }
        }
        stage('Lint Code') {
            steps {
                echo 'Running linter...'
                bat 'npm run lint'
            }
        }
        stage('Run Tests') {
            steps {
                dir('frontend/CRM') {
                    bat 'npm run test'
                }
            }
        }
        stage('Build Angular App') {
            steps {
                dir('frontend/CRM') {
                    bat 'npm run build'
                }
            }
        }
    }

    post {
        success {
            echo "Frontend build completed successfully."
        }
        failure {
            echo "Frontend build failed."
        }
    }
}
