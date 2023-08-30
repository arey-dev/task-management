import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    localStorage.setItem("user", JSON.stringify(user));

    return redirect("/");
  } catch (error) {
    return error;
  }
}
