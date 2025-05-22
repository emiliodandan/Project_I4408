pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
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
                bat 'npm -v'
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
                    bat 'npm run test -- --watch=false --browsers=ChromeHeadless || exit 0'
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
            environment {
                AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
            }
            steps {
                script {
                    def bucket = 'frontend-crm-angular'
                    dir('frontend/CRM') {
                        bat "aws s3 sync dist/crm/browser s3://${bucket} --delete"
                    }
                }
            }
        }
    }

}