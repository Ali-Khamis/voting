import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../firebase";
export interface TestProps {}

const PuppyPage: React.FC<TestProps> = () => {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState<string>("");
  useEffect(() => {
    db.collection("Images").onSnapshot((snapshot) => {
      snapshot.docs.forEach((element) => {
        if (element.data().Id === router.query.id) {
          setImgUrl(element.data().ImageUrl);
        }
      });
    });
  }, []);
  console.log(router.query.id);

  return (
    <div>
      <h1>Puppy Name</h1>
      <img src={imgUrl} alt="" />
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
