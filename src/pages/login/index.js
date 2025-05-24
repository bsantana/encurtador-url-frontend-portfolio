import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
// import Header from "./Header";
import Link from 'next/link'

import MyButton from "./components/button";

import styles from './../../../styles/Form.module.css'

import 'react-toastify/dist/ReactToastify.css';


export default function Auth() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const { signIn } = useContext(AuthContext)

  // const onSubmit = (data) => {
  //   setData(JSON.stringify(data))
  // }

  const handleSignIn = async (data) => {
    setData(JSON.stringify(data))
    try {
      await signIn(data)
    } catch (err) {
      notify(err)
    }
  }

  const notify = (e) => {
    toast(e.response.data.message)
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
      {/* <Header /> */}
      <input {...register("email")} placeholder="Insira o e-mail" className={styles.field} />
      <input {...register("password")} placeholder="Inserir senha" type="password" className={styles.field} />
      <div style={{display: 'flex', margin: '20px 27px'}}>
        <input {...register("checkConfirm")} type="checkbox" id="check" />
        <label htmlFor="check" style={{marginLeft: 10}}>Lembrar de mim</label>
      </div>
      {data && <p>{data}</p>}
      <input type="submit" value='Entrar' className={styles.field} />
      <br />
      <hr />
      <br />
      <p className="align-center">Não tem uma conta?</p>
      <Link href="/register" passHref>
        <MyButton title="Clique aqui para fazer seu registro" style={{width: 248, margin: '0 auto', display: 'block', textDecoration: 'underline'}} />
      </Link>
      <ToastContainer />
    </form>
  );
}
