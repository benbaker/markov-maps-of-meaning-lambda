module.exports = {
  dev: () => {
    const aws_account = ''
    return {
      space: '',
      subspace: '',
      env: 'dev',
      provider: {
        name: 'aws',
        runtime: 'nodejs4.3',
        stage: 'local',
        region: 'us-east-1',
        deploymentBucket: '',
        role: ``
      },
      optimize: {
        global: true,
        plugins: ['remove-comments']
      }
    }
  }
}
