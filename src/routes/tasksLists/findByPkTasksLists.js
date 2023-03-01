const auth = require('../../authentification/auth')

module.exports = (app, Taskslist, Task) => {
    app.get('/taskslists/:id',auth, (req,res)=>{
        try{
            const id = req.params.id;
            Taskslist.findByPk(id, {
                include: {
                    model: Task
                }
            })
            .then(taskslist => {
                if(!taskslist){
                    return res.status(404).json({ message: 'La taskslist est introuvable.'});
                }
                return res.json(taskslist);
            });
        }catch(err){
            console.error(err);
            res.status(500).json({message: 'La requete envoyé par le navigateur'})
        }
    })
} 