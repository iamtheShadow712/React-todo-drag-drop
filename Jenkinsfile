pipeline{
    agent any

    tools{
        nodejs "nodejs-23.10.0"
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

        stage("Docker Login"){
            steps{
                sh """
                    echo "${DOCKER_CREDENTIAL_PAS}" | docker login -u "${DOCKER_CREDENTIAL_USR}" --password-stdin
                """
            }
        }

        stage('Build Docker Image'){
            steps{
                sh 'printenv'
                sh "docker build -t venom712/react-todo-app:${GIT_COMMIT} ."
            }
        }
    }

}