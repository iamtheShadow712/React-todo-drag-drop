pipeline{
    agent any

    tools{
        nodejs "nodejs-23.10.0"
        dockerTool 'docker'
    }

    environment{
        DOCKER_CREDENTIAL = credentials('docker_credentials')
    }

    stages{
        stage('Install Dependency'){
            steps{
                sh "npm install --no-audit"
            }
        }

        stage('Audit Dependencies'){
            steps{
                sh "npm audit --audit-level=critical"
            }
        }

        stage('Build Docker Image'){
            steps{
                sh 'printenv'
                sh 'docker build -t venom712/todo-app:$GIT_COMMIT .'
            }
        }
    }

}