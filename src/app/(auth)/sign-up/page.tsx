import { getCurrent } from "@/features/auth/actions";
import SignUpCard from "@/features/auth/SignUpCard"
import { redirect } from "next/navigation";

const SingUpPage = async() => {
  const user = await getCurrent();
  if(user) redirect('/');

  return (
    <SignUpCard/>
  )
}

export default SingUpPage