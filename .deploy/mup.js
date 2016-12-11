module.exports = {
  servers: {
    one: {
      host: 'coil.ink',
      username: 'ubuntu',
      pem: 'coil-website.pem'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'coil-website',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://coil.ink',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base', 
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};