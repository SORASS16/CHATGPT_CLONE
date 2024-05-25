// import Image from "next/image";
// import InputField from "../components/InputField";
// import NavBar from "../components/NavBar";
'use client';
import InputForm from '../components/InputForm';
import Chat from '../components/Chat';
import { useAuth } from '../hooks/useAuth';
import GoogleSignInButton from '../components/GoogleSignIn';

export default function Home() {
  const { session } = useAuth();
  return (
    <main>
      {!session ? <GoogleSignInButton /> :<Chat/> }
      {/* <NavBar /> */}
      {/* <InputField /> */}
      <Chat />
    </main>
  );
}
