pipeline{
    agent any

    tools{
        nodejs "nodejs-23.10.0"
    }

    stages{
        stage('Install Dependency'){
            steps{
                sh "npm install --no-audit"
            }
        }

        stage('Audit Dependency'){
            steps{
                sh "npm audit --audit-level=critical"
            }
        }
    }

}