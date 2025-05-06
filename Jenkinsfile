pipeline{
    agent any
    tools {nodejs 'node22.12.0'}

    stages{
        stage('Install dependencies'){
            steps{
                dir('frontend/CRM'){
                    sh 'npm indtall'
                }
            }
        }
        stage('Run Tests'){
            steps{
                dir('frontend/CRM'){
                    sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
                }
            }
        }
        stage('Build Angular App') {
            steps {
                dir('frontend/CRM') {
                    sh 'npm run build'
                }
            }
        }
    }
    post {
        success {
            echo "✅ Frontend build completed successfully."
        }
        failure {
            echo "❌ Frontend build failed."
        }
    }
}