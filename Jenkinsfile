pipeline {
  agent any
  stages {
    stage('checkout code') {
      steps {
        git(branch: 'main', url: 'https://github.com/Kennycode4lyfe/Blog-app')
      }
    }

    stage('log') {
      parallel {
        stage('log') {
          steps {
            sh 'ls -la'
            sh 'node --version'
          }
        }

        stage('check if python is installed') {
          steps {
            sh 'python --version'
          }
        }

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