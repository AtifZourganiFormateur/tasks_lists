const auth = require('../../authentification/auth')

module.exports = (app, Task) => {
    app.put('/tasks/:id',auth, async (req,res) => {
        try{
            const id = parseInt(req.params.id);
            const taskToModify = await Task.findByPk(id);
            if(!taskToModify){
                return res.status(404).json({error: 'tâche introuvable'});
            }
            const taskUpdate = {}
            if(req.body.name){
                taskUpdate.name = req.body.name;
            }
            if(req.body.description){
                taskUpdate.description = req.body.description;
            }
            if(req.body.amount){
                taskUpdate.amount = req.body.amount;
            }
            await taskToModify.update(taskUpdate);
            const message = `Tâche ${taskToModify.name} modifié avec succes`;
            return res.status(200).json({message, taskToModify});
        }catch(error){
            console.error(error);
            const message = "Erreur interne"
            return res.status(500).json({message, data: error});
        }
    })
}