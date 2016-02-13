module.exports = function(db){
    var notFound = function(req, res){
        res.render("front/testForm.jade");
    };

    return {
        index: function(req, res){
            res.render("front/home.jade");
        },
        form: function(req, res){
            db.find({ _id: req.params.id }, function(err, docs){
                if(err || docs.length == 0){
                    notFound(req, res);
                }else{
                    res.render("front/form.jade", { form: docs[0] });
                }
            });
        },
        send: function(req, res){
            notFound(req, res);
        },
        fourOhFour: function(req, res){
            notFound(req, res);
        }
    }
}
