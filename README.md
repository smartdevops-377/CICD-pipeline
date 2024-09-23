# CICD-pipeline
(GIT, Maven, Sonar, Nexus, Tomcat)

Deployment of an Application in Tomcat Using Jenkins as the Integration Tool

Tools used in this project are:
GIT: A distributed version control system that allows multiple developers to work on the same project efficiently. It tracks changes to the codebase and enables easy collaboration through branches and merging.
MAVEN: It helps in managing project dependencies, building the code, and generating the final artifact (e.g., a WAR or JAR file).
SONAR: A platform for continuous inspection of code quality. It helps in detecting bugs, security vulnerabilities, and code smells, ensuring that the code adheres to best practices.
NEXUS: A repository manager used to store and manage artifacts generated during the build process. It acts as a centralized storage for managing binaries, libraries, and dependencies.
TOMCAT: An open-source Java servlet container that is used to deploy Java-based web applications. It hosts the application and ensures that it runs in a reliable, scalable environment.
JENKINS: An open-source automation server that integrates with various tools in the CI/CD pipeline. It automates the building, testing, and deployment processes, ensuring smooth software delivery.

Precaution to be taken before deployment
Backups: Ensure that backups of current builds and databases are taken before deployment.
Environment Isolation: Provide isolated environments for development, testing, and production to avoid interference.
Rollback Capability: Be prepared to roll back if the deployment fails at any stage.
Correct Environment Deployment: Confirm that the correct environment and client application are being deployed to avoid issues.


Deployment Architecture for Continuous Integration and Application Deployment
 
Step-1: Launch Four Instances
Jenkins (t2.micro)
Tomcat (t2.micro)
Sonar (t2.medium with 20GB of EBS volume)
Nexus (t2.medium with 20GB of EBS volume)
 
Step-2: Setup Services in Their Respective Servers.
Jenkins
Tomcat
Nexus
Sonar
 
Step-3: Install Plugins
SONAR SCANNER: For scanning and analyzing code quality.
NEXUS ARTIFACTORY UPLOADER: To upload and store build artifacts in Nexus.
SSH AGENT: To securely transfer files between servers.

Step-4: Create a Pipeline
For this project, we are using scripted pipelines to define and automate the code, build, test (CQA), store (Artifact) and deployment processes.
 

Script Pipeline Phases
The pipeline will consist of the following phases:
1.	Code: Pull the latest code from the GitHub repository.
2.	Build: Use Maven to build the source code.
3.	Test: Run SonarQube analysis for code quality testing.
4.	Upload: Store the build artifacts (WAR/JAR) in Nexus Artifactory.
5.	Deploy: Deploy the application to the Tomcat server.

Stage 1: Retrieve the code from GitHub to the CI server.
Install git on Jenkins server

Stage-2: Build the Source Code
Since Java OpenJDK 11 is already installed on the Jenkins server, we need to avoid version conflicts. Therefore, we will simply install Maven through the Jenkins dashboard to manage the build process without overlapping Java installations.
To install Maven on Jenkins:
Go to Manage Jenkins >> Global Tool Configuration >> Maven >> Add Maven >> Specify the name and version, then save the configuration. Maven will now be available for builds.

Stage-3: Scan the source code.
Integrate SonarQube with Jenkins
Go to Manage Jenkins >> Configure System >> SonarQube Servers.
Add a SonarQube server: name it (e.g., mysonar), and enter the URL (http://<public-IP>:9000).
Add credentials using the secret key generated in SonarQube, then save the configuration.

Stage-4: Create a Maven2 (hosted) repository in Nexus, name it (e.g., maven2-hosted).
In Jenkins, go to Pipeline Syntax >> Nexus Artifact Uploader, fill in the Nexus details, and generate the pipeline script.
Use this script in your Jenkins pipeline to upload build artifacts to Nexus after the build.
 
Final Stage
In Jenkins, go to Pipeline Syntax >> select SSH Agent as the step.
Copy and paste the .pem file (private key) for SSH access in the appropriate field.
Generate the script and use it in the deploy stage of your pipeline to securely connect and deploy to remote servers.
 
 

 

 
 

