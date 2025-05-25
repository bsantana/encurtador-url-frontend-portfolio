import { useContext, useState, useEffect } from "react";

import { useRouter } from 'next/router'
import nookies,{ parseCookies } from "nookies"
import { ToastContainer, toast } from 'react-toastify'

import { getAPIClient } from "./../../../services/axios"
import Custom404 from './../../404'

import { AuthContext } from "../../../contexts/AuthContext";


// const notify = () => toast("Wow so easy!");

export default function verifyHashToken({ notFound }) {
  const { test } = useContext(AuthContext)

  const router = useRouter()
    useEffect(() => {
      if(true) {
        router.push({
            pathname: '/login',
            query: { registerEmailVerifySuccessfully: true }
          }, '/login'
        )
      }
    });

  const { hashToken } = router.query
  // console.log('props:', props)
  return <div></div>
  return <div>CODE: {hashToken}</div>
}

export const getServerSideProps = async (ctx) => {
  const { hashToken } = ctx.query
  const apiClient = getAPIClient(ctx)
  const { ['edu.token']: token } = parseCookies(ctx)
  // let payment = false
  let success = false
  let errors = false

  try {
    const response = await apiClient.get(`/register/emails/verify/${hashToken}`)
    console.log('RESPONSE DATA ', response.data)
    success = true
  } catch (err) {
    // console.log('message:>', err.message)
    // console.log('status:>', err.response)
    errors = true
    if(err.response?.status === 404) {
      return {
        notFound: true
      }
    }
  }

  return {
    props: { success, errors }
  }  
}