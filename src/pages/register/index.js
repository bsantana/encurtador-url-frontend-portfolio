import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
// import Header from "./Header";

import Link from 'next/link'

import MyButton from "./../login/components/button"

import styles from './../../../styles/Form.module.css'

import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from 'next/router'

    


export default function Auth() {
  const { register, handleSubmit } = useForm()
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signUp } = useContext(AuthContext)
  const router = useRouter()

  // const onSubmit = (data) => {
  //   setData(JSON.stringify(data))
  // }

  // useEffect(() => {
  //   router.push({
  //       pathname: '/login',
  //       query: {data: 'title'}
  //     }, '/login'
  //   )
  // }, [])

  

  const handleSignUp = async (data) => {
    setData(JSON.stringify(data))
    setLoading(true)
    console.log('data', data)
    try {
      await signUp(data)
      setSuccess(true)
      router.push({
          pathname: '/login',
          query: { registerCreateSuccessfully: true }
        }, '/login'
      )
    } catch (err) {
      // toast(err)
      // toast('eeeeee')
      console.log('ERR:', err)
      // alert('eee')
    }
    setLoading(false)
  }


  // to-do
  // Redireciona ele para a tela de login com o seguinte texto com fundo verde:
  // Um e-mail foi enviado para ativar sua conta.
  // Por favor, verifique sua pasta de spam se você não o recebeu.
  
  // exemplo de link enviado por email: https://bityli.com/user/activate/HXnTgNgVsmOCDhicZEnbjpxKmOeLMiSx

  // Ao clicar no link a cima redirecionar para a tela de login com uma mensagem no fundo verde:
  // Seu e-mail foi verificado com sucesso.


//   Verify Your Email Address
// Before proceeding, please check your email for a verification link.

// If you did not receive the email, check your spam folder, or click here to request another.

// Connect Your Accounts


// REFESH
// TinyURL
// Verify Your Email Address
// A fresh verification link has been sent to your email address.
// Before proceeding, please check your email for a verification link.

// If you did not receive the email, check your spam folder, or click here to request another.

// Connect Your Accounts
   

// TinyURL
// Verify Your Email Address
// Email successfully verified
// Connect Your Accounts
  // if(success) {
  //   return (
  //     <div className={styles.form}>
  //       CADASTRADO COM SUCESSO!
  //     </div>
  //   )
  // }
  

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className={styles.form}>
      {/* <Header /> */}
      <input {...register("name")} placeholder="Insira o nome de usuário" className={styles.field} />
      <input {...register("email")} placeholder="Insira o e-mail" className={styles.field} />
      <input {...register("password")} placeholder="Inserir senha" type="password" className={styles.field} />
      <input {...register("re-password")} placeholder="Repetir senha" type="password" className={styles.field} />
      <div style={{display: 'flex', margin: '20px 27px'}}>
        <input {...register("checkConfirm")} placeholder="Repetir senha" type="checkbox" id="check" />
        <label htmlFor="check" style={{marginLeft: 10}}>Eu concordo com os <a href="#" target="_blank" style={{color: 'red'}}>Termos de Serviço</a>.</label>
      </div>

      {/* {data && <p>{data}</p>} */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
        }}>
        <input type="submit" value={!loading && 'Criar conta'} className={styles.field} style={{borderRadius: 3, border: '1px solid', backgroundColor: loading && 'black'}} />
        {loading && <div className="icon-loader" style={{marginBottom: 5}}></div>}
      </div>
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
