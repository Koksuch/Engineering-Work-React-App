export type LayoutProps = {
  header: React.ReactNode
  content: React.ReactNode
  footer: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <div>{props.header}</div>
      <div className=" mt-5 w-full p-5">{props.content}</div>
      <div>{props.footer}</div>
    </div>
  )
}

export default Layout
