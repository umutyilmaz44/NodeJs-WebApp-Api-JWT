require('dotenv').config();

const checkUserThemeColor = (req, res, next) => {
  
  if(req.userData && req.userData.themeColor){
    res.locals.themeColor = req.userData.themeColor;
  }
  else if(process.env.Default_Theme_Color){
    res.locals.themeColor = process.env.Default_Theme_Color;
  }
  else{
    res.locals.themeColor = 'blue';
  }
  next(); // pass the execution off to whatever request the client intended

}


module.exports = checkUserThemeColor;