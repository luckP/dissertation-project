const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const con = require('./db')

// app.use(express.text())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create_user', async(req, res) => {
    console.log("post");
    try {
        console.log(req.body);
        const { cli } = req.body
        const query = `INSERT INTO client_project.client (cli) VALUES ('${cli}');`
        console.log(cli, query);

        con.connect((err) => {
            console.log("Connected!");
            con.query(query, function(err, result) {
                console.log("1 record inserted");
            });
        })

        // const val = await con.query(query)
        res.send("POST Request Called")
    } catch (err) {
        console.log(err);
    }
})

app.get('/create_user', async(req, res) => {
    console.log('test');
    res.send('ok')
})


// ROUTES

// get distrito, concelho and freguesia from a point
// app.post('/get_single', async (req, res) => {
//     try{
//         const { coord } = req.body
//         const query =  `SELECT distrito, concelho, freguesia 
//         FROM cont_aad_caop2018
//         WHERE ST_Contains(proj_boundary,
//             ST_GeometryFromText('POINT(${coord[0]} ${coord[1]})',3763))`
//         const val = await pool.query(query)
//         res.json(val.rows[0])
//         // console.log('get_single => ', coord, ' | ', val.rows);
//         console.log(query);
//     }
//     catch(err) {
//         console.error(err.message);
//         res.json({})
//     }
// })

// // get distrito, concelho, freguesia from a group of points in the form data = [[x1, y1],... [xn, yn]]
// app.post('/get_group', async (req, res) => {
//     console.log('get_group');

//     try{
//         const { data } = req.body
//         // console.log(data);
//         let vals = {distrito: [], concelho: [], freguesia: []}
//         for(let d of data){
//             const query =  `SELECT distrito, concelho, freguesia 
//                 FROM cont_aad_caop2018
//                 WHERE ST_Contains(proj_boundary,
//                 ST_GeometryFromText('POINT(${d[0]} ${d[1]})',3763))`
//             const val = await pool.query(query)
//             vals.distrito.push(val.rows[0].distrito)
//             vals.concelho.push(val.rows[0].concelho)
//             vals.freguesia.push(val.rows[0].freguesia)
//         }
//         res.json(vals)
//     }
//     catch(err) {
//         console.error(err.message);
//         res.json({})
//     }
// })

const port = 80
app.listen(port, _ => {
    console.log(`server is listening on port ${port}`);
});