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
        sh 'node --version'
        sh 'python3 --version'
      }
    }

    stage('install dependencies') {
      steps {
        sh 'cd src'
        sh 'cd src && npm install'
      }
    }

  }
  tools {
    nodejs 'node-js'
  }
}