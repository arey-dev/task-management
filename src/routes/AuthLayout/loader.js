export async function loader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
}
