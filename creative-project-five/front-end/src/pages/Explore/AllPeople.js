import { useOutletContext } from "react-router-dom";

const AllPeople = () => {
  const [props] = useOutletContext();

  return (
    <>
      <h2>All People</h2>
    </>
  )
}

export default AllPeople;