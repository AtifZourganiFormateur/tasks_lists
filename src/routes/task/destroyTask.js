module.exports = (app, Task) => {
    app.delete('/tasks/:id', async (req,res) => {
        const id = req.params.id;
        try{
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'täche introuvable' });
            }
            await task.destroy().then(_ =>{
                res.status(204).json({message: `la tâche est supprimé`});
            }) 
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'erreur interne, recommencez ultérieurement', data: error});
        }
    })
}