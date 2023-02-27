module.exports = (app, Taskslist) => {
    app.put('/taskslists/:id', (req,res) => {
        const id = req.params.id;
        const {title, description} = req.body;     
        try{
            Taskslist.findByPk(id)
            .then(taskslist => {
                if(!taskslist){
                    return res.status(404).json({message: 'cette liste de tache est introuvable'})
                }
                taskslist.update({title, description})
                    .then(()=>{
                        res.json({message: `liste de tache ${title} modifié`, data: taskslist})
                    })
            })
        }catch(err){
            console.error(err);
            res.status(500).json({message: 'error 500', data: error});
        }
    })
}