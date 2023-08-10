export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData));
  return null;
}
