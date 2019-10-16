let Quote = require('../models/quote');

module.exports = {

    index: function (req, res) {
        if (!req.session.quoteErr) {
            req.session.quoteErr = "";
        }
        if (!req.session.nameErr) {
            req.session.nameErr = "";
        }
        res.locals.nameErr = req.session.nameErr;
        res.locals.quoteErr = req.session.quoteErr;
        res.render('index');
    },

    quotePage: function (req, res) {
        Quote.find({}).sort({ createdAt: 'desc' }).find(function (err, quotes) {
            if (err) {
                console.log(err);
            }
            else {
                res.render('quote', {
                    quotes: quotes,
                });
            }
        });
    },

    addQuote: function (req, res) {
        req.session.quoteErr = "";
        req.session.nameErr = "";
        console.log(req.body);
        if (req.body.name.length < 3) {
            req.session.nameErr = "Name is too short";
            console.log(req.session.nameErr);
            res.redirect("/");
        }
        if (req.body.quote.length < 5) {
            req.session.quoteErr = "Quote is too short";
            console.log(req.session.quoteErr);
            res.redirect("/");

        }
        const quote = new Quote(req.body);
        quote.save()
            .then(() => res.redirect('/quotes'));
    }
}