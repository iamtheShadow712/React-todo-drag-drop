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

        stage('Audit NPM Dependency'){
            steps{
                sh "npm audit --audit-level=critical"
            }
        }

        stage('Build Docker Image'){
            steps{
                sh 'docker build -t venom712/todo-app:$GIT_COMMIT .'
            }
        }

        stage('Trivy Vulnerability Scan'){
            steps {
                sh '''
                    trivy image venom712/todo-app:$GIT_COMMIT \
                    --severity LOW,MEDIUM \
                    --exit-code 0 \
                    --quiet \
                    --format json 
                    -o trivy-image-MEDIUM-results.json
                    
                    trivy image venom712/todo-app:$GIT_COMMIT \
                    --severity HIGH,CRITICAL \
                    --exit-code 1 \
                    --quiet \
                    --format json 
                    -o trivy-image-CRITICAL-results.json
                '''
            }

            post{
                always{
                    sh '''
                        trivy image \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-MEDIUM-results.html trivy-image-MEDIUM-results.json

                        trivy image \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-CRITICAL-results.html trivy-image-CRITICAL-results.json

                        trivy image \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-MEDIUM-results.xml trivy-image-MEDIUM-results.json

                        trivy image \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-CRITICAL-results.xml trivy-image-CRITICAL-results.json
                    '''
                }
            }
        }
    }

}