const pg = require('pg');
const {Client} = pg;
const client = new Client ('postgres://localhost/users_db')
const faker = require('faker')
const uuid = require('uuid')
client.connect();

const generateIds = (...names) => {
    return names.reduce((acc, name) => {
        acc[name] = uuid.v4()
        return acc;
    }, {})
}

const ids = generateIds('Dep1_id','Dep2_id','Dep3_id','Dep4_id','User1_id','User2_id','User3_id','User4_id')
const Dep1_Name = faker.commerce.department()
const Dep2_Name = faker.commerce.department()
const Dep3_Name = faker.commerce.department()
const Dep4_Name = faker.commerce.department()
const User1_Name = faker.name.firstName()
const User2_Name = faker.name.firstName()
const User3_Name = faker.name.firstName()
const User4_Name = faker.name.firstName()

const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    department_id UUID REFERENCES departments(id) NULL
);

INSERT INTO departments(id, name) VALUES ('${ids.Dep1_id}', '${Dep1_Name}');
INSERT INTO departments(id, name) VALUES ('${ids.Dep2_id}', '${Dep2_Name}');
INSERT INTO departments(id, name) VALUES ('${ids.Dep3_id}', '${Dep3_Name}');
INSERT INTO departments(id, name) VALUES ('${ids.Dep4_id}', '${Dep4_Name}');

INSERT INTO users(id, name, department_id) VALUES ('${ids.User1_id}', '${User1_Name}','${ids.Dep1_id}');
INSERT INTO users(id, name, department_id) VALUES ('${ids.User2_id}', '${User2_Name}','${ids.Dep2_id}');
INSERT INTO users(id, name, department_id) VALUES ('${ids.User3_id}', '${User3_Name}','${ids.Dep1_id}');
INSERT INTO users(id, name) VALUES ('${ids.User4_id}', '${User4_Name}');
`

const sync = async() => {
    await client.query(SQL)
    console.log('success')
}

const getAllDepartments = async() => {
    const response = await client.query('SELECT * FROM departments');
    return response.rows;
}

const getAllUsers = async() => {
    const response = await client.query('SELECT * FROM users');
    return response.rows;
}


module.exports = {
    sync,
    getAllDepartments,
    getAllUsers
};
