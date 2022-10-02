const Addimage = (props) => {
  console.log("hi");
  let url = prompt("enter url");
  return (
    <p {...props.attributes}>
      {props.children}
      <br></br>
      <img width="500px" src={url} alt="img1"></img>
    </p>
  );
};
export default Addimage;