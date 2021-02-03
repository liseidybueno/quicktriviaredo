let getHomepage = (req, res) => {

  if(req.user){
    return res.render("quiz", {
      user: req.user,
      questionNumber: 0
    });
  } else {
    return res.render("quiz", {
      user: "",
      questionNumber: 0
    });
  }

}

module.exports = {
  getHomepage: getHomepage
}
