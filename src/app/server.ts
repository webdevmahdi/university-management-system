import config from "./config";
import mongoose from 'mongoose';
import app from './app';
import {Server} from 'http'
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  }
  catch(err){
    console.log(err)
  }

}

main()

process.on('unhandledRejection', ()=>{
  console.log('Unhandled rejection server is sutting down...')
  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }
  process.exit(1)
})

process.on('uncaughtException', ()=>{
  console.log('Uncaught exception detected. Server is shuting down...')
  process.exit(1)
})