import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

function Read() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.app);
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading</h2>;
  }
  return (
    <div>
      <div>
        {showPopup && (
          <CustomModal
            id={id}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        )}
      </div>
      <div>
        {users &&
          users.map((ele) => (
            <div key={ele.id} className="card w-50 mx-auto my-2">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.gender}</p>
                <button
                  className="card-link"
                  onClick={() => [setId(ele.id), setShowPopup(true)]}
                >
                  View
                </button>
                <Link to={`/edit/${ele.id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  onClick={() => dispatch(deleteUser(ele.id))}
                  className="card-link"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Read;
