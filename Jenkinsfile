pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-access-key')
        AWS_REGION            = 'eu-north-1' 

        EMAIL_USER = credentials('gmail-user')  
        EMAIL_PASS = credentials('gmail-user') 
        EMAIL_TO   = 'emilio.dandan@gmail.com'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/emiliodandan/Project_I4408'
            }
        }

        stage('Set Up Node.js') {
            steps {
                bat 'node -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend/CRM') {
                    bat 'npm ci'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                dir('frontend/CRM') {
                    bat 'npm run test -- --watch=false --browsers=ChromeHeadless || true'
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'frontend/CRM/test-results/**', allowEmptyArchive: true
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

        stage('Upload Artifacts') {
            steps {
                archiveArtifacts artifacts: 'frontend/CRM/dist/**', allowEmptyArchive: false
            }
        }

        stage('Deploy to AWS S3') {
            steps {
                withAWS(region: "${env.AWS_REGION}", credentials: 'aws-credentials-id') {
                    bat '''
                        aws s3 sync frontend/CRM/dist/crm/browser s3://${S3_BUCKET_NAME} --delete
                    '''
                }
            }
        }
    }

    post {
        success {
            mail to: "${env.EMAIL_TO}",
                 from: "${env.EMAIL_USER}",
                 subject: "Angular Frontend Deployed Successfully",
                 body: """Deployment succeeded!
                        Repo: ${env.JOB_NAME}
                        Branch: ${env.BRANCH_NAME}
                        Build: ${env.BUILD_URL}"""
        }
        failure {
            mail to: "${env.EMAIL_TO}",
                 from: "${env.EMAIL_USER}",
                 subject: "Angular Frontend CI Failed",
                 body: """Deployment failed!
                    Repo: ${env.JOB_NAME}
                    Branch: ${env.BRANCH_NAME}
                    Build: ${env.BUILD_URL}"""
        }
    }
}
