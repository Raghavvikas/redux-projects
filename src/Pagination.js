import React, { useEffect, useState } from "react";

const Pagination = ({ limit, total, paginate }) => {
  const number = [];
  const [current, setCurrent] = useState(1);

  for (let i = 1; i < limit; i++) {
    number.push(i);
  }

  return (
    <div className="">
      <nav className="p-5">
        <ul className="pagination">
          <li className="page-item">
            <button onClick={() => paginate(current - 1)} className="page-link">
              Prev
            </button>
          </li>
          {number.map((num) => {
            return (
              <>
                {() => setCurrent(num)}
                <li className="page-item" key={num}>
                  <button className="page-link" onClick={() => paginate(num)}>
                    {num}
                  </button>
                </li>
              </>
            );
          })}
          <li className="page-item">
            <a onClick={() => paginate(current + 1)} className="page-link">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
