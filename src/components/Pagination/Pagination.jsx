import "./Pagination.css";
import Link from "next/link";

export default function Pagination({ currentPage, hasPrevPage, hasNextPage }) {
  const pages = [];

  if (hasPrevPage) {
    pages.push(currentPage - 1);
  }

  pages.push(currentPage);

  if (hasNextPage) {
    pages.push(currentPage + 1);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li className="pagination-list-item">
          {hasPrevPage ? (
            <Link
              className="pagination-list-link"
              href={`/shop?page=${currentPage - 1}`}
            >
              Previous
            </Link>
          ) : (
            <button className="pagination-list-button" disabled>
              Previous
            </button>
          )}
        </li>
        {pages.map((page, index) => {
          return (
            <li
              key={index}
              className={
                currentPage === page
                  ? "pagination-list-item-active"
                  : "pagination-list-item"
              }
            >
              <Link
                href={`/shop?page=${page}`}
                className={"pagination-list-link"}
              >
                {page}
              </Link>
            </li>
          );
        })}
        <li className="pagination-list-item">
          {hasNextPage ? (
            <Link className="pagination-list-link" href={`/shop?page=${currentPage+1}`}>
              Next
            </Link>
          ) : (
            <button className="pagination-list-button">Next</button>
          )}
        </li>
      </ul>
    </nav>
  );
}
