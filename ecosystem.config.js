module.exports = {
  apps: [
    {
      name: 'api',
      script: 'nest',
      args: 'start hangman-api',
      automation: false,
      instances: 1,
      env: {
        NODE_ENV: 'development'
      },
      exec_mode: 'fork'
      // log_file: '/dev/null',
      // out_file: '/dev/null',
      // error_file: '/dev/null',
      // merge_logs: true
    },
    {
      name: 'mailing',
      script: 'nest',
      args: 'start mailing',
      instances: 1,
      automation: false,
      env: {
        PORT: 3456,
        NODE_ENV: 'development'
      },
      exec_mode: 'fork'
      // log_file: '/dev/null',
      // out_file: '/dev/null',
      // error_file: '/dev/null',
      // merge_logs: true
    }
  ]
}
