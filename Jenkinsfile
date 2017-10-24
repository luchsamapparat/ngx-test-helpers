#!groovy

properties([
        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
        disableConcurrentBuilds()
])

final String BRANCH = env.BRANCH_NAME

node('') {
    def nodeHome = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    def customEnv = [
            "PATH+NODE=${nodeHome}/bin"
    ]
    step([$class: 'WsCleanup'])

    try {
        withEnv(customEnv) {
            stage('Checkout SCM') {
                echo "Running for branch ${BRANCH}"
                checkout scm
                def GIT_COMMIT_AUTHOR = sh(returnStdout: true, script: 'git --no-pager show -s --format="%an"').trim()
                env.GIT_COMMIT_AUTHOR = "${GIT_COMMIT_AUTHOR}"
                env.GIT_COMMIT = '' + sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
            }
            if (env.GIT_COMMIT_AUTHOR == 'LHT jenkins LHT.build (tiebs)') {
                echo "Last change was commit by Jenkins (${env.GIT_COMMIT_AUTHOR}), exiting to prevent infinite loop."
                currentBuild.result = 'SUCCESS'
                return
            }

            stage('Build App') {
                sh "npm install"
                sh "npm run build"
            }

            stage('Publish') {
                configFileProvider([configFile(fileId: 'npm_publish_settings', targetLocation: '.npmrc')]) {
                    if (BRANCH == 'master') {
                        def version = shWithResult("node -p -e \"require('./package.json').version\"")
                        currentBuild.displayName = version

                        sshagent(credentials: ['community_write'], ignoreMissing: true) {
                            sh("npm publish dist && git push --tags origin HEAD:" + BRANCH)
                        }
                    }
                }
            }
        }
    } catch (final e) {
        mailNotification()
        throw e
    } finally {
        echo "finished"
    }
}

def mailNotification() {
    final def buildStatus = "FAILURE"
    if (buildStatus != "SUCCESS") {
        stage('Mail Notification') {
            echo "Notifying culprits of build ${buildStatus.toLowerCase()}"
            final String subject = "${buildStatus}: Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
            final String details = "${subject}:\nCheck console output at ${env.BUILD_URL}"

            emailext attachLog: true, subject: "[JENKINS] ${subject}", body: details, recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'DevelopersRecipientProvider']]
        }
    }
}