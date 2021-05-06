import { db } from "../components/auth/FirebaseAuth";
import {
  PuppyInfo,
  getStaticPropsFunction,
  PuppyPageProps,
  SnapShotType,
  DbImage,
} from "../types";
import Styles from "../styles/Id.module.css";
import { useRouter } from "next/router";

export const PuppyPage: React.FC<PuppyPageProps> = ({
  puppyInfo: { puppyName, puppyImageUrl },
}) => {
  const router = useRouter();
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <h1 className={Styles.puppyName}>{puppyName}</h1>
        <img
          src={puppyImageUrl}
          className={Styles.img}
          width={400}
          height={300}
          alt="puppy image"
        />
        <p>
          <span className={Styles.firstWord}>Lodem</span> ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate aspernatur dolorem fugit
          voluptas quibusdam facere reiciendis, sequi iste culpa expedita
          dolorum a dolor rerum ducimus laboriosam cumque distinctio alias!
          Accusamus.
        </p>
      </div>
    </div>
  );
};

export default PuppyPage;

export async function getStaticPaths() {
  let ids: string[];
  await db
    .collection("Images")
    .get()
    .then((snapshot) => {
      ids = snapshot.docs.map((image: SnapShotType) => {
        const data: DbImage = image.data();
        return data.Id;
      });
    });
  const paths = await ids.map((id) => ({
    params: { id },
  }));
  return { paths, fallback: false };
}

export const getStaticProps: getStaticPropsFunction = async (args) => {
  let puppyInfo: PuppyInfo;
  await db
    .collection("Images")
    .doc(args.params.id)
    .get()
    .then((snapshot: SnapShotType) => {
      const data: DbImage = snapshot.data();
      puppyInfo = {
        puppyName: data.name,
        puppyImageUrl: data.ImageUrl,
      };
    });

  return {
    props: { puppyInfo },
  };
};
