const express = require('express')
const app = express()
const port = 3000
const host = '0.0.0.0';
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')

async function generateName() {
    const list =  [
            "Jacob",
            "Michael",
            "Ethan",
            "Joshua",
            "Daniel",
            "Alexander",
            "Anthony",
            "William",
            "Christopher",
            "Matthew",
            "Jayden",
            "Andrew",
            "Joseph",
            "David",
            "Noah",
            "Aiden",
            "James",
            "Ryan",
            "Logan",
            "John"
        ]

    return list[Math.floor(Math.random() * list.length)];
}

app.get('/', async (req, res) => {
    const connection = mysql.createConnection(config)

    const name = await generateName()

    await connection.query(`INSERT INTO people(name) values('${name}')`)

    const people = function (result) {
        const response = result.map(element => `<li>${element.name}</li>`)
        res.send(`<h1>Full Cycle Rocks!!</h1> <ul>${response.join(' ')}</ul>`)
    }

    await connection.query('SELECT name FROM people', function (error, results, fields) {
        if (error) throw error;

        people(JSON.parse(JSON.stringify(results)))
    });

    connection.end()
})

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
