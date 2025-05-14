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
                    bat 'npm test --watch=false --browsers=ChromeHeadless'
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
