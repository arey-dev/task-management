import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { redirect } from "react-router-dom";
import { addUser } from "../../utilities";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await addUser(user);

    return redirect("/login");
  } catch (error) {
    return error;
  }
}
