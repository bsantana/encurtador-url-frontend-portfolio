import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import nookies, {parseCookies} from "nookies"
import { AuthContext } from "../../contexts/AuthContext";
// import Header from "./Header";
import Link from 'next/link'
import Head from 'next/head'

import MyButton from "./components/button";
import Header from './../../components/header'

import styles from './../../../styles/Form.module.css'

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'


export default function Auth() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  let [triggerVerify, setTriggerVerify] = useState(0)
  let [triggerCreate, setTriggerCreate] = useState(0)
  const { signIn } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if(router.query.registerEmailVerifySuccessfully && triggerVerify === 0) {
      toast.success('Seu e-mail foi verificado com sucesso. Entre com sua conta.')
      setTriggerVerify(triggerVerify++)
    }
    if(router.query.registerCreateSuccessfully && triggerCreate === 0) {
      toast.success('Um e-mail foi enviado para ativar sua conta. Por favor, verifique sua pasta de spam se você não o recebeu.')
      setTriggerCreate(triggerCreate++)
    }
  })

  // const onSubmit = (data) => {
  //   setData(JSON.stringify(data))
  // }

  const handleSignIn = async (data) => {
    setData(JSON.stringify(data))
    setTriggerVerify(1)
    setTriggerCreate(1)
    try {
      await signIn(data)
    } catch (err) {
      // notify(err)
    }
  }

  // const Header = () => {
  //   return (
  //     // <div>
  //     //   <ul>
  //     //     <li>Home</li>
  //     //     <li>Preços</li>
  //     //     <li>Entrar</li>
  //     //     <li>Criar conta</li>
  //     //   </ul>
  //     // </div>
  //     <nav className="navbar navbar-expand-lg bg-light">
  //       <div className="container">
  //         <a className="navbar-brand" href="/">Encurtaki</a>
  //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
  //           <div className="navbar-nav">
  //             <a className="nav-link active" aria-current="page" href="/">Início</a>
  //             <a className="nav-link">Preços</a>
  //             <Link href="/login">
  //               <a className="nav-link">Entrar</a>
  //             </Link>
  //             <a className="nav-link disabled">Criar conta</a>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   )
  // }

  

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
        <link rel='stylesheet' href='/styles/style.css' />
      </Head>
      <Header />
      <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
        {/* <Header /> */}
        <input {...register("email")} placeholder="Insira o e-mail" className={styles.field} />
        <input {...register("password")} placeholder="Inserir senha" type="password" className={styles.field} />
        <div style={{display: 'flex', margin: '20px 27px'}}>
          <input {...register("checkConfirm")} type="checkbox" id="check" />
          <label htmlFor="check" style={{marginLeft: 10}}>Lembrar de mim</label>
        </div>
        {/* {data && <p>{data}</p>} */}
        <input type="submit" value='Entrar' className={styles.field} />
        <br />
        <hr />
        <br />
        <p className="align-center">Não tem uma conta?</p>
        <Link href="/register" passHref>
          <MyButton title="Clique aqui para fazer seu registro" style={{width: 248, margin: '0 auto', display: 'block', textDecoration: 'underline'}} />
        </Link>
        <ToastContainer position="top-center" />
      </form>
    </div>
  );
}