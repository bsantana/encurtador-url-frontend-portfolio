import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { getAPIClient } from "../../services/axios"

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Posts({ posts }) {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    // api.get('/users')
  }, [])

  const notify = () => toast("Wow so easy!");

  return (
    <ul>
      <div>
        <img src={user?.avatar_url} style={{width: 50}} />
      </div>
      List:{' '}
      {posts && posts.map((post, index) => {
        return <li key={index}>{post.title}</li>
      })}

      {!posts ? 'Sem dados no momento!' : ''}
      {/* <ToastContainer /> */}
    </ul>
  )
}

// This function gets called at build time
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const posts = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }


const notify = () => toast("Wow so easy!");

export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['edu.token']: token } = parseCookies(ctx)

  if(!token) {
    return {
      redirect: {
        destination: '/login',
        pernament: false
      }
    }
  }

  try {
    const response = await apiClient.get('/users')
    console.log('response:>', response.data)
    notify()
  } catch (error) {
    console.log('message:>', error.message)
    console.log('status:>', error.response)
    console.log('data:>', error.response?.data)
    notify()
  }

  return {
    props: {}
  }
}

export default Posts