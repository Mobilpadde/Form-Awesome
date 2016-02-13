module.exports = function(db){
    return {
        new: function(req, res){
            res.render("creator/new.jade");
        },
        create: function(req, res){
            res.json(req.body);
        },
        me: function(req, res){
            res.render("creator/me.jade");
        },
        responses: function(req, res){
            res.sendStatus(404).end();
        },
        documentation: function(req, res){
            res.render("creator/documentation.jade");
        }
    }
}
