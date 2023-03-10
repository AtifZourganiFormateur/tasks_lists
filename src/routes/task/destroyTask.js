const auth = require('../../authentification/auth')

module.exports = (app, Task) => {
    app.delete('/tasks/:id',auth, async (req,res) => {
        const id = parseInt(req.params.id);
        try{
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'täche introuvable' });
            }
            await task.destroy()
                .then(()=>{
                    res.json(`la tâche est supprimé`);
                }) 
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'erreur interne, recommencez ultérieurement', data: error});
        }
    })
}