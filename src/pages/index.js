import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { parseCookies } from "nookies"

import Image from 'next/image'
import Head from 'next/head'

import Header from './../components/header'

import { api } from "./../services/api"
import { getAPIClient } from "./../services/axios"


import 'react-toastify/dist/ReactToastify.css';
const delay = (amount = 2000) => new Promise(resolve => setTimeout(resolve, amount))

const YourComponent = () => (
  <Image
    src="/images/profile.jpeg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
)

const HomePage = (props) => {
  const { register, handleSubmit, setValue } = useForm();
  const [shoterUrl, setShoterUrl] = useState('');
  const [shoterLoading, setShoterLoading] = useState(false);
  const [shoterSuccess, setShoterSuccess] = useState(false);
  console.log('PROPS:', props)

  // useEffect(async () => {
    // try {
    //   const result = await api.get('/users')
    //   console.log('RESULTx: ', result)
    // } catch (err) {
    //   console.log('ERR: ', err)
    // }
    
  // }, [])

  const handleShort = async (data) => {
    try {
      if(!data.url) {
        return notify('Por favor, insira uma URL válida.')
      }

      setShoterLoading(true)
      const result = await api.post('/links', { url: data.url })
      const url = `${result.data.domain}/${result.data.code}`
      setValue('url', url)
      setShoterUrl(url)
      // setShoterSuccess(true)
    } catch (err) {
      notify(err)
    }
    setShoterLoading(false)
  }

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleCopy = () => {
    copyToClipboard(shoterUrl)
    // setShoterSuccess(false)
    setShoterUrl('')
    setValue('url', '')
    
  }

  const notify = (e) => {
    toast(e.response?.data?.message || e.message || e)
  }

  // const handleSignIn = async (data) => {
  //   setData(JSON.stringify(data))
  //   try {
  //     await signIn(data)
  //   } catch (err) {
  //     notify(err)
  //   }
  // }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          Encurtaki
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
        <link rel='stylesheet' href='/styles/style.css' />
      </Head>
      <Header />
      <div className="container">
        <div className="header">
          <img src="/images/web_server.png" alt="<%= title %>" className="icon" />
          <h1>
            Encurtaki
          </h1>
          <p>Seu novo encurtador de URL!</p>
        </div>
        <div className="content">
          <form onSubmit={handleSubmit(handleShort)}>
            <div className="mb-3 input-group">
              <input {...register("url")} placeholder="Digite a URL a ser encurtada" name="url" className="form-control" />
              <div className="input-group-append">
                {shoterUrl &&
                  <button className="btn btn-primary" type="button" onClick={handleCopy}>Copiar</button>
                }
                <button className="btn btn-primary" type="submit" style={{ display: shoterUrl ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{visibility: shoterLoading && 'hidden'}}>Encurtar</span>{shoterLoading && <div className="icon-loader"></div>}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"></script>
    </>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  console.log('POSTS: ', posts[0])
  // await delay(9000)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      // posts,
      API_URL: process.env.API_URL
    },
  }
}

// export const getServerSideProps = async (ctx) => {
//   const { code } = ctx.query
//   const apiClient = getAPIClient(ctx)
//   const { ['edu.token']: token } = parseCookies(ctx)
//   let payment = false
//   let shoterNotFound = false

//   if(!token) {
//     console.log('sem token', code)
//     await delay(9000)
//     // return {props: {}}
//     // return {
//     //   redirect: {
//     //     destination: '/login',
//     //     pernament: false
//     //   }
//     // }
//   }

//   try {
//     const response = await apiClient.get(`/short/${code}`)
//     console.log('RESPONSE DATA ', response.data)
//     if(response.data.user) {
//       payment = response.data.user.payment
//     }
    
//     // notify()
//     return {
//       redirect: {
//         destination: response.data.url,
//         pernament: false
//       }
//     }
//   } catch (err) {
//     // console.log('message:>', err.message)
//     // console.log('status:>', err.response)
//     console.log('data:>', err.response?.data)
//     if(err.response?.status === 404) {
//       shoterNotFound = true
//     }
//     // notify()
//   }

//   return {
//     props: { payment, shoterNotFound }
//   }  
// }

export default HomePage