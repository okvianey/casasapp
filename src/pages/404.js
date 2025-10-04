import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Typography } from "@mui/material"

const paragraphStyles = {
  marginBottom: 48,
}

const NotFoundPage = () => {
  return (
    <Layout>
      <main>
        <Typography variant="h1">Página no encontrada</Typography>
        <p style={paragraphStyles}>
          Lo sentimos 😔, no pudimos encontrar lo que estás buscando.
          <Link to="/"> Ir al inicio </Link>.
        </p>
      </main>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
