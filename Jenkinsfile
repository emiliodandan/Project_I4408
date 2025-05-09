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
        stage('Run lint') {
            steps {
                dir('frontend/CRM') {
                    bat 'npm lint'
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
