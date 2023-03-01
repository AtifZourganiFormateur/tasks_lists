const auth = require('../../authentification/auth')

module.exports = (app, TasksList, Task) => {
    app.delete('/taskslists/:id', auth, (req,res) => {
        const id = req.params.id;
        try{
            TasksList.findByPk(id)
                .then(taskslist => {
                    if(taskslist === null){
                        return res.status(404).json({message: 'element introuvable'})
                    }
            Task.destroy({where: {articleId: id}})
                .then(()=>{
                    taskslist.destroy()
                        .then(()=>{
                            res.json({message: 'liste de tache supprimé'})
                        })
                })  
                })
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'requete client non aboutis'});
        }
    })
}