import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import Image from 'next/image'
import Head from 'next/head'

import { api } from "./../services/api"

import 'react-toastify/dist/ReactToastify.css';


const YourComponent = () => (
  <Image
    src="/images/profile.jpeg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
)

const HomePage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [shoterUrl, setShoterUrl] = useState('');
  const [shoterLoading, setShoterLoading] = useState(false);
  const [shoterSuccess, setShoterSuccess] = useState(false);

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
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
        <link rel='stylesheet' href='/styles/style.css' />
      </Head>
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
      {/* <ToastContainer /> */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"></script>
    </>
  )
}

export default HomePage