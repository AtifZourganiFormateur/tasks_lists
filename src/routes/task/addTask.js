const auth = require('../../authentification/auth')

module.exports = (app, Task) => {
    app.post('/taskslists/:id/tasks',auth, (req,res) => {
        const id = parseInt(req.params.id);
        let {name, description, amount} = req.body;
        try{
            if(!name){
                return res.status(400).json({message: 'Votre tâche necessite un nom'});
            }
            if(description === ""){
                description = 'Description non précisé';
            }
            if(!amount){
                return res.status(400).json({message: 'Votre tâche necessite une quantité'});
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