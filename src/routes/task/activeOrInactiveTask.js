module.exports = (app, Task) => {
    app.put('/tasks/:id/active', async (req,res) => {
        const id = parseInt(req.params.id);
        try{
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'tâche introuvable' });
            }
            if(task.active === true){
                await task.update({ active: false });
            }else{
                await task.update({ active: true });
            }
            res.status(200).json({message: `le status active de la tache ${task.name} est changé`, data: task});
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'erreur interne, recommencez ultérieurement', data: error});
        }
    })
}