import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

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
    return user;
  } catch (error) {
    return error;
  }
}
