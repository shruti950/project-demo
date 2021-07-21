import React from "react";
import { useParams } from "react-router-dom";
import UserContainerUpdate from "./UserContainerUpdate";

function Post() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <UserContainerUpdate id={id} />
    </div>
  );
}

export default Post;
