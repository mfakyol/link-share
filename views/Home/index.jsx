import classes from "./style.module.scss";
import Navbar from "@components/Navbar";

function HomeView() {
  return (
    <div className={classes.page}>
      <Navbar />
      <div className={classes.pageContent}>
        <div className={classes.leftContent}>
          <h1 className={classes.title}>All links about you, now a single link in bio.</h1>
          <p className={classes.description}>
            Join now and easily share your links to your followers and view traffic statistics.
          </p>
        </div>
        <div className={classes.rightContent}>
          <img className={classes.phone} src="/images/phone.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default HomeView;
