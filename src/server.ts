import app from './app'

const port: number = 3001;

const server = new app().Start(port)
  .then(port => console.log(`Server running on port ${port}`))
  .catch(error => {
    console.log(error)
    process.exit(1);
  });

export default server;