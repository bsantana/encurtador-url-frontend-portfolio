import { useRouter } from 'next/router'
import { parseCookies } from "nookies"
import { ToastContainer, toast } from 'react-toastify'

import { getAPIClient } from "./../services/axios"
import Custom404 from './404'

// const notify = () => toast("Wow so easy!");

export default function ShorterRedirect({ payment, shoterNotFound }) {
  const router = useRouter()

  if(shoterNotFound) {
    return <Custom404 />
  }

  const { code } = router.query
  // console.log('props:', props)
  return <div>CODE: {code}</div>
}

export const getServerSideProps = async (ctx) => {
  const { code } = ctx.query
  const apiClient = getAPIClient(ctx)
  const { ['edu.token']: token } = parseCookies(ctx)
  let payment = false
  let shoterNotFound = false

  if(!token) {
    console.log('sem token', code)
    // return {props: {}}
    // return {
    //   redirect: {
    //     destination: '/login',
    //     pernament: false
    //   }
    // }
  }

  try {
    const response = await apiClient.get(`/short/${code}`)
    console.log('RESPONSE DATA ', response.data)
    if(response.data.user) {
      payment = response.data.user.payment
    }
    
    // notify()
    return {
      redirect: {
        destination: response.data.url,
        pernament: false
      }
    }
  } catch (err) {
    // console.log('message:>', err.message)
    // console.log('status:>', err.response)
    console.log('data:>', err.response?.data)
    if(err.response?.status === 404) {
      shoterNotFound = true
    }
    // notify()
  }

  return {
    props: { payment, shoterNotFound }
  }  
}