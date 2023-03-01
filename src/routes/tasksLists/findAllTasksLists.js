const auth = require('../../authentification/auth')

module.exports = (app, TasksList, Task) => {
    app.get('/taskslists',auth, (req,res) => {
        try{
            const taskslists = TasksList.findAll({
                include: {
                    model: Task
                },
                order: [['created', 'DESC']]
            })
            .then(taskslists => res.json(taskslists))
        }catch (error) {
            console.error(error);
            res.status(500).json({message: 'la requete a échoué'})
        }
    }) 
} 
