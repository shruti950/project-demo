function Post(props) {
  const { id, title, body } = props.data;
  return (
    <div className="post">
      <small>{id}</small>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

export default Post;
