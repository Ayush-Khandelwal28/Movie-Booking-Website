import mysql from 'mysql2';
// const mysql=require('mysql2');
import dotenv from 'dotenv';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// const dotenv=require('dotenv');
dotenv.config();
const pool= mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
}).promise();

// const [rows]=await pool.query("SELECT * from actor");
// const rows=result[0];
// console.log(rows);
async function getActors(){
    const [rows]=await pool.query("SELECT * from actor");
    return rows;
}
async function getActorById(id){
    const [rows]=await pool.query("SELECT * from actor where act_id=?",[id]);
    return rows;
}
const notes=await getActorById(1);
console.log(notes);