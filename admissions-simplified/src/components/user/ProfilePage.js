import React, { useContext } from "react";
import { auth } from "../../back-end/firebase";
import { UserContext } from '../../providers/UserProvider'
import './ProfilePage.css'
import { Link, useHistory } from "react-router-dom"

import { btn_theme } from '../../styling/paletteTheme'

import { makeStyles , ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    height:500,
    backgroundColor: "#e8cb8f",
  },
  media: {
    height: 140,
  },
});


const ProfilePage = () => {
  const classes = useStyles();

  const user = useContext(UserContext);
  const history = useHistory();
  
  //Redirects to homepage if no user
  if (!user) {
    history.push("/");
    return(<div></div>);
  }
  
  const {photoURL, displayName, email} = user;
  const signOut = () => {
    auth.signOut();
    // Redirection to homepage after logout
    history.push("/")
  }
  return (
      <div className = "global-wrapper">
        <ThemeProvider theme={btn_theme}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={photoURL || '../../assets/images/user/user_logo.webp'}
                title="User Photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {displayName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" >
                  Email: {email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/update-info" style={{ textDecoration: 'none' }}>
                <Button size="medium" color="secondary">
                  Update Info
                </Button>
              </Link>
              <Link to={{pathname:"/password-reset", state:{fromProfilePage:true} }} style={{textDecoration: 'none'}}>
                <Button size="medium" color="secondary">
                  Reset Password
                </Button>
              </Link>
              <Button size="medium" color="primary" onClick={()=>signOut()}>
                Sign Out
              </Button>
            </CardActions>
          </Card>
        </ThemeProvider>
        
      </div>
  ) 
};
export default ProfilePage;