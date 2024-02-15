import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";

const Posts = () => {
  const [place, setPlace] = useState([]);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [prev, SetPrev] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(() => {
    SetIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5")
      .then((data) => data.json())
      .then((res) => {
        setPlace(res);
        SetIsLoading(false);
      });
  }, []);

  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPost = place.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="table table-striped table-dark table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        </thead>

        <tbody>
          {currentPost.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            );
          })}
        </tbody>
        <Pagination limit={limit} total={place.length} paginate={paginate} />
      </table>
    </div>
  );
};

export default Posts;
