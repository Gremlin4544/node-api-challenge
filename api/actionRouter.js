const express = require('express');

const actionModel = require('../data/helpers/actionModel')

const router = express.Router();

router.get('/:id', validateActionId, (req, res) => {
    actionModel.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({error: "failed to get project"})
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    actionModel.remove(req.params.id)
        .then(recNumbsDeleted => {
            res.status(200).json(recNumbsDeleted)
        })
        .catch(() => {
            res.status(500).json({error: "failed to delete action"})
        })
})

router.put('/:id', validateActionId, (req, res) => {
    actionModel.update(req.params.id, req.body)
        .then(updateAction => {
            res.status(200).json(updateAction)
        })
        .catch(() => {
            res.status(500).json({error: "failed to update project"})
        })
})

function validateActionId(req, res, next){
    actionModel.get(req.params.id)
        .then(action => {
            if (action){
                next()
            }else{
                res.status(500).json({error: "failed to find that action ID"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "failed to get action with that ID"})
        })
}

module.exports = router;