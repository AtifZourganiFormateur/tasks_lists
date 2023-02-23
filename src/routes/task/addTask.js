module.exports = (app, Task) => {
    app.post('/taskslists/:id/tasks', (req,res) => {
        const id = parseInt(req.params.id);
        const {name, description, amount} = req.body;
        try{
            if(!name){
                return res.status(400).json({message: 'Votre tâche necessite un nom'});
            }
            if(!description){
                description = 'Description non précisé';
            }
            if(!amount){
                amount = 0;
            }
            Task.create({
                name,
                active : true,
                description,
                amount,
                articleId: id
            }).then(newTask => {
                res.status(201).json({message: `Votre tâche ${name} a ete ajouté`, data: newTask});
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'erreur interne, recommencez ultérieurement', data: error});
        }
    })
}