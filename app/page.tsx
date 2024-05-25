// import Image from "next/image";
// import InputField from "../components/InputField";
// import NavBar from "../components/NavBar";
import InputForm from "../components/InputForm";
import Chat from "../components/Chat";
import { useAuth } from '../hooks/useAuth';
import GoogleSignInButton from '../components/GoogleSignIn';


export default function Home() {
  // const {user} = useAuth();
  return (
    <main>
      {/* {user?<Chat />:<GoogleSignInButton/>} */}
      {/* <NavBar /> */}
      {/* <InputField /> */}
      <Chat/>
    </main>
  );
}
