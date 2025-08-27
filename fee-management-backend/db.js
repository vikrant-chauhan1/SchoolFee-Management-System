import pg from "pg";
const {Pool} = pg;  // extracting the pool class from pg library 

const pool = new Pool({
    user: "postgres",
    host:"localhost",
    database:"School_Fee",
    password:"Avon@123",
    port:"5432"
});

export default pool;