pipeline {
  agent any
  stages {
    stage('checkout code') {
      steps {
        git(branch: 'main', url: 'https://github.com/Kennycode4lyfe/Blog-app')
      }
    }

    stage('log') {
      steps {
        sh 'ls -la'
      }
    }

    stage('unit test') {
      steps {
        tool(name: 'node-js', type: 'npm')
      }
    }

  }
}