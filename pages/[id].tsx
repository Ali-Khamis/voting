import { db } from "../firebase";

export interface TestProps {
  puppyInfo: { puppyName: string; puppyImageUrl: string };
}

const PuppyPage: React.FC<TestProps> = ({
  puppyInfo: { puppyName, puppyImageUrl },
}) => {
  return (
    <div>
      <h1>{puppyName}</h1>
      <img src={puppyImageUrl} alt="puppy image" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        aspernatur dolorem fugit voluptas quibusdam facere reiciendis, sequi
        iste culpa expedita dolorum a dolor rerum ducimus laboriosam cumque
        distinctio alias! Accusamus.
      </p>
    </div>
  );
};

export default PuppyPage;

// This function gets called at build time
export async function getStaticPaths() {
  let ids: string[];
  await db
    .collection("Images")
    .get()
    .then((snapshot) => {
      ids = snapshot.docs.map((image) => image.data().Id);
    });
  const paths = await ids.map((id) => ({
    params: { id },
  }));
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  let puppyInfo: { puppyName: string; puppyImageUrl: string };
  await db
    .collection("Images")
    .doc(params.id)
    .get()
    .then((snapshot) => {
      puppyInfo = {
        puppyName: snapshot.data().name,
        puppyImageUrl: snapshot.data().ImageUrl,
      };
    });

  return {
    props: { puppyInfo },
  };
}
