node
{
    stage("code")
    {
        git branch: 'main', url: 'https://github.com/charan-kilana/Netflix-SignUp-Page-Jenkins-Tomcat-Freestyle.git'
    }
}
node
{
    stage("Build")
    {
        def mavenHome = tool name: "maven3", type: "maven"
        def mavenCMD = "${mavenHome}/bin/mvn"
        sh "${mavenCMD} clean package"
    }
}
node
{
    stage("CQA")
    {
        withSonarQubeEnv('mysonar')
        {
            def mavenHome = tool name: "maven3", type: "maven"
            def mavenCMD = "${mavenHome}/bin/mvn"
            sh "${mavenCMD} sonar:sonar"
        }
    }
}
node
{
    stage("Artifact")
    {
        nexusArtifactUploader artifacts: [[artifactId: 'junit', classifier: '', file: 'target/1.1.0.war', type: 'war']], credentialsId: 'nexus', groupId: 'junit', nexusUrl: '3.94.52.58:8081', nexusVersion: 'nexus3', protocol: 'http', repository: 'myapp-release', version: '3.8.1'
    }
}
node
{
    stage("Deploy")
    {
        sshagent(['slave']) 
        {
            sh "scp -o StrictHostKeyChecking=no target/*.war ec2-user@3.80.255.148:/home/ec2-user/apache-tomcat-9.0.95/webapps"
        }
    }
}
