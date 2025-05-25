import Link from 'next/link'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Encurtaki
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link href="/" className="nav-link active" aria-current="page">
              Início
            </Link>
            <a className="nav-link">Preços</a>
            <Link href="/login" className="nav-link">
              Entrar
            </Link>
            <Link href="/register" className="nav-link">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}