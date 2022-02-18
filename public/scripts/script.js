function deleteMessage(e) {
  e.preventDefault();
  e.stopPropagation();
  let conf = confirm("Are you sure you want to delete this message?");
  if (conf) {
    let id = e.target.parentElement.parentElement.id;
    console.log(id);
    console.log(id);
    fetch(`http://127.0.0.1:8080/new?id=${id}`, {
      method: "DELETE",
    });
    setTimeout(() => {
      window.location.reload();
    });
  }
}
