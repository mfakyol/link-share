import Image from "next/image";
import Shape1 from "@/icons/shape1";
import Shape2 from "@/icons/shape2";
import classes from "./styles.module.scss";
import HomeHeader from "@/components/home/HomeHeader";

function HomeView() {
  return (
    <div className={classes.page}>
      <HomeHeader />
      <main className={classes.main}>
        <section className={classes.section1}>
          <div className={classes.shape1Container}>
            <Shape1 className={classes.shape1} />
          </div>
          <div className={classes.shape2Container}>
            <Shape2 className={classes.shape2} />
          </div>
          <div className={classes.sloganContainer}>
            <h1 className={classes.title}>All about you, now a single link</h1>
            <p className={classes.description}>Join now and easily share your links to your followers and view traffic statistics.</p>
          </div>
          <div className={classes.phoneContainer}>
            <Image
              src="/phone.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", maxWidth: "300px", height: "auto" }}
              alt="App Screen"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomeView;
