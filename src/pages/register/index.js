import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
// import Header from "./Header";

import Link from 'next/link'

import MyButton from "./../login/components/button";

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

  // to-do
  // Redireciona ele para a tela de login com o seguinte texto com fundo verde:
  // Um e-mail foi enviado para ativar sua conta.
  // Por favor, verifique sua pasta de spam se você não o recebeu.
  
  // exemplo de link enviado por email: https://bityli.com/user/activate/HXnTgNgVsmOCDhicZEnbjpxKmOeLMiSx

  // Ao clicar no link a cima redirecionar para a tela de login com uma mensagem no fundo verde:
  // Seu e-mail foi verificado com sucesso.
  

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
      {/* <Header /> */}
      <input {...register("email")} placeholder="Insira o e-mail" className={styles.field} />
      <input {...register("password")} placeholder="Inserir senha" type="password" className={styles.field} />
      <input {...register("re-password")} placeholder="Repetir senha" type="password" className={styles.field} />
      <div style={{display: 'flex', margin: '20px 27px'}}>
        <input {...register("checkConfirm")} placeholder="Repetir senha" type="checkbox" id="check" />
        <label htmlFor="check" style={{marginLeft: 10}}>Eu concordo com os <a href="#" target="_blank" style={{color: 'red'}}>Termos de Serviço</a>.</label>
      </div>

      {data && <p>{data}</p>}
      <input type="submit" value='Criar conta' className={styles.field} />
      <br />
      <hr />
      <br />
      <p className="align-center">Já tem uma conta?</p>
      <Link href="/login" passHref>
        <MyButton title="Clique aqui para entrar" style={{width: 165, margin: '0 auto', display: 'block', textDecoration: 'underline'}} />
      </Link>
      <ToastContainer />
    </form>
  );
}
