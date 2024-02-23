import Layout from "./components/Layout/Layout"
import Header from "./components/Header/Header"
import Content from "./routes/Routes"
import Footer from "./components/Footer/Footer"

const App = () => {
  const header = <Header />
  const content = <Content />
  const footer = <Footer />

  return <Layout header={header} content={content} footer={footer} />
}

export default App
