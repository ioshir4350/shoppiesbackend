const axios = require('axios')
const User = require('../models/User')

function nominate(req, res){
    
    const movieID = req.body.movieID

    const email = req.body.email
    
    User.findOne({email: email}, (err, foundUser) => {
        if (err) console.log(err);
        else{
                if (foundUser.nominations.includes(movieID)){
                    res.json({'status': 'already nominated'})
                }
                else{
                    foundUser.nominations.push(movieID)
                    foundUser.save()
                    res.json({'status': 'foundUser'})
                }
        }
    })
}

function remove(req, res){
    const movieID = req.body.movieID
    const email = req.body.email
    User.findOne({email: email}, (err, foundUser) => {
        if (err) console.log(err);
        else{
            foundUser.nominations.splice(foundUser.nominations.indexOf(movieID), 1)
            foundUser.save()
            res.json({'status': 'removed'})
        }
})
}

function getNominations(req, res){
    const email = req.params.email
    console.log(email);
    User.findOne({email: email}, async (err, foundUser) => {
        if (err) console.log(err);
        else{
            if (foundUser) {
                let nominations = []

                for (let i = 0; i <= foundUser.nominations.length; i++){
                    const movieObj = await axios.get('http://www.omdbapi.com/?i='+ foundUser.nominations[i] +'&apikey=4bf894c9')
                    await nominations.push({
                        'Poster': movieObj.data.Poster,
                        'Title': movieObj.data.Title,
                        'Type': movieObj.data.Type,
                        'Year': movieObj.data.Year,
                        'imdbID': movieObj.data.imdbID
                    })
                    if (i == foundUser.nominations.length-1){
                        res.json({'nominations': nominations})
                   }
                }
            }
            else{
                res.json({'nominations': []})
            }
        }
    })
}

exports.nominate = nominate
exports.remove = remove
exports.getNominations = getNominations