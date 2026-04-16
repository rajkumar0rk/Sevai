import dotenv from 'dotenv';

dotenv.config();

const getEnv=(key:string,defaultValue?:string):string=>{
  const value= process.env[key] || defaultValue;
  if(value === undefined) throw Error(`${key} value doesn't exits in environment variable`)
  return value
}


export const PORT:number= Number(getEnv("PORT","3000"))
