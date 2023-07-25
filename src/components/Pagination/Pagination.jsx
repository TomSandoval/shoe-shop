import "./Pagination.css";
import Link from "next/link";



export default function Pagination() {




  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li className="pagination-list-item">
          <Link className="pagination-list-link" href="#">
            Previous
          </Link>
        </li>
        <li className="pagination-list-item">
          <Link className="pagination-list-link" href="#">
            1
          </Link>
        </li>
        <li className="pagination-list-item">
          <Link className="pagination-list-link" href="#">
            2
          </Link>
        </li>
        <li className="pagination-list-item">
          <Link className="pagination-list-link" href="#">
            3
          </Link>
        </li>
        <li className="pagination-list-item">
          <Link className="pagination-list-link" href="#">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
