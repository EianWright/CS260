import { useOutletContext } from "react-router-dom";

const AllMemes = () => {
  const [props] = useOutletContext();

  return (
    <>
      <h2>All Memes</h2>
    </>
  )
}

export default AllMemes;