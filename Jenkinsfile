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
        stage('Run Tests') {
            steps {
                dir('frontend/CRM') {
                    bat 'npm run test -- --watch=false'
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
