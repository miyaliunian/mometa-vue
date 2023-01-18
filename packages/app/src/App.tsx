const Item = (props: any) => (
  <div style={{ color: 'white', fontSize: '18px' }}>你猜</div>
)

const App = () => {
  const data = ['react', 'vue', 'WebPack']
  return (
    <div>
        {data}
    </div>
  )
}

export default App
