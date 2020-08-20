import React, { lazy, useEffect, useState, useRef } from "react";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Button,
  Grid,
  Box
} from "@material-ui/core";
import {
  Info,
  Announcement,
  AttachMoney,
  RoomService,
  PermContactCalendar
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { News } from "./News";
import { Products } from "./Products";

const About = lazy(() =>
  import("./About").then(module => ({ default: module.About }))
);
const Service = lazy(() =>
  import("./Service").then(module => ({ default: module.Service }))
);
const Contacts = lazy(() =>
  import("./Contacts").then(module => ({ default: module.Contacts }))
);
const PostWrapper = lazy(() => import("../commonComponents/PostWrapper"));

const useStyles = makeStyles(theme => ({
  appBar: {
    marginTop: theme.spacing(2)
  },
  tabWrapper: {
    marginTop: theme.spacing(2)
  }
}));

const MainController = () => {
  const classes = useStyles();
  const { page } = useParams();
  const history = useHistory();
  const [tab, setTab] = useState(0);
  const about = useRef(null);
  const news = useRef(null);
  const products = useRef(null);
  const service = useRef(null);
  const contacts = useRef(null);
  const pageArray = [about, news, products, service, contacts];
  const pageMap = ["about", "news", "products", "service", "contacts"];

  useEffect(() => {
    if (page !== undefined) {
      const tab = pageMap.indexOf(page);
      if (tab === -1) {
        history.push("/404");
      } else {
        setTab(tab);
      }
    } else {
      setTab(0);
      history.push("/about");
    }
  }, []);

  const changeTab = (event, tab) => {
    setTab(tab);
    pageArray[tab].current.scrollIntoView();
    history.push(`/${pageMap[tab]}`);
  };

  return (
    <Container>
      <AppBar position="static">
        <Box px={5} justifyContent="flex-end" display="flex">
          <NavLink to="/login">
            <Button color="inherit" style={{ color: "#fff" }}>
              Login
            </Button>
          </NavLink>
          <Button color="inherit">Sign Up</Button>
        </Box>
      </AppBar>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          variant={window.innerWidth <= 850 ? "scrollable" : "fullWidth"}
          centered={window.innerWidth > 850}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          value={tab}
          onChange={changeTab}
        >
          <Tab label="About" icon={<Info />} />
          <Tab label="News" icon={<Announcement />} />
          <Tab label="Products" icon={<AttachMoney />} />
          <Tab label="Service" icon={<RoomService />} />
          <Tab label="Contacts" icon={<PermContactCalendar />} />
        </Tabs>
      </AppBar>

      <div className={classes.tabWrapper} ref={about}>
        <About />
      </div>
      <div className={classes.tabWrapper} ref={news}>
      News:
        <PostWrapper Post={News} postType="article" />
      </div>
      <div className={classes.tabWrapper} ref={products}>
      Products:
        <PostWrapper Post={Products} postType="product" />
      </div>
      <div className={classes.tabWrapper} ref={service}>
        <Service />
      </div>
      <div className={classes.tabWrapper} ref={contacts}>
        <Contacts />
      </div>
    </Container>
  );
};

// <div role='tabpanel' hidden={tab !== 0} className={classes.tabWrapper}>
// {tab === 0 && <About/> }
// </div>
// <div role='tabpanel' hidden={tab !== 1} className={classes.tabWrapper}>
// {tab === 1 && <PostWrapper Post={News} postType='article'/>}
// </div>
// <div role='tabpanel' hidden={tab !== 2} className={classes.tabWrapper}>
// {tab === 2 && <PostWrapper Post={Products} postType='product'/>}
// </div>
// <div role='tabpanel' hidden={tab !== 3} className={classes.tabWrapper}>
// <Service/>
// </div>
// <div role='tabpanel' hidden={tab !== 4} className={classes.tabWrapper}>
// <Contacts/>
// </div>

export default MainController;
