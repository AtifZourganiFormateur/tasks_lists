module.exports = (app, Task) => {
    app.get('/tasks/:id', async (req,res) => {
        const id = parseInt(req.params.id);
        try{
            const task = await Task.findByPk(id);
            if(!task){
                const message = 'Tâche introuvable';
                return res.status(404).json({message})
            }
            const message = 'tâche trouvé'
            return res.status(200).json({message, data: task})
        }catch(error){
            console.error(error);
            const message = 'erreur interne, veuillez recommencer ultérieurement';
            return res.status(500).json({message, data: error})
        }
    })
}