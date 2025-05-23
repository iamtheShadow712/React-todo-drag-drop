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

        stage('Audit NPM Dependencies'){
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
                    --format json \
                    -o trivy-image-MEDIUM-results.json
                    
                    trivy image venom712/todo-app:$GIT_COMMIT \
                    --severity HIGH,CRITICAL \
                    --exit-code 1 \
                    --quiet \
                    --format json \
                    -o trivy-image-CRITICAL-results.json
                '''
            }

            post{
                always{
                    sh '''
                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-MEDIUM-results.html trivy-image-MEDIUM-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-CRITICAL-results.html trivy-image-CRITICAL-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output trivy-image-MEDIUM-results.xml trivy-image-MEDIUM-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output trivy-image-CRITICAL-results.xml trivy-image-CRITICAL-results.json
                    '''
                }
            }
        }

        stage('Push Image to Registry'){
            steps{
                withDockerRegistry(credentialsId: 'docker_credentials', url: '') {
                    sh "docker push venom712/todo-app:$GIT_COMMIT"
                }
            }
        }
    }

    post{
        always {
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-MEDIUM-results.html', reportName: 'Trivy Image Scan Medium HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-CRITICAL-results.html', reportName: 'Trivy Image Scan CRITICAL HTML Report', reportTitles: '', useWrapperFileDirectly: true])

            junit allowEmptyResults: true, keepProperties: true, testResults: 'trivy-image-MEDIUM-results.xml'
            junit allowEmptyResults: true, keepProperties: true, testResults: 'trivy-image-CRITICAL-results.xml'
        }
    }

}