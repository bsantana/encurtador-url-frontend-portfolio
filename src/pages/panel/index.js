import nookies, {parseCookies} from "nookies"
import { getAPIClient } from "./../../services/axios"

function PanelPage() {
  return (
    <>
      <h1>Panel Page</h1>
      <div style={{border: '1px solid black', width: '180px', textAlign: 'center'}}>
        <p>Meus Links</p>
        <p>0</p>
        <p>+0 Hoje</p>
      </div>
      <div style={{border: '1px solid black', width: '180px', textAlign: 'center'}}>
        <p>Cliques</p>
        <p>0</p>
        <p>+0 Hoje</p>
      </div>
      <div style={{border: '1px solid black', width: '180px', textAlign: 'center'}}>
        <p>Cliques recentes</p>
        <p>CHART</p>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  // const { hashToken } = ctx.query
  // const apiClient = getAPIClient(ctx)
  const apiClient = getAPIClient(ctx);
  // const { ['edu.token']: token } = parseCookies(ctx)
  const token = parseCookies(ctx)
  const cookies = nookies.get(ctx)

  console.log('cookies:1', cookies)
  console.log('cookies success:1', cookies.registerSuccessful)
  console.log('token:1', JSON.stringify(token['edu.token']))

  // nookies.set(ctx, 'registerSuccessful', 'ok', {
  //   maxAge: 60 * 60 * 1, // 1 hour
  // })

  try {
    const response = await apiClient.get('/users')
    console.log('response:>', response.data)
    // notify()
  } catch (error) {
    console.log('message:>', error.message)
    console.log('status:>', error.response)
    console.log('data:>', error.response?.data)
    // notify()
  }

  

  return {
    props: {}
  }  
}

export default PanelPage