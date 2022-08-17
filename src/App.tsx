import { AuthProvider } from 'Context/auth/AuthProvider'
import { DirectionProvider } from 'Context/Direction/DirectionProvider'
import { ListProvider } from 'Context/List/ListProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { OrderProvider } from 'Context/Order/OrderProvider'
import { ProductProvider } from 'Context/Product/ProductProvider'
import { SocketProvider } from 'Context/Socket/SocketProvider'
import RouterApp from 'router/RouterApp'
import 'app.css'
import { gapi } from 'gapi-script'

window.addEventListener('DOMContentLoad', () => {
  gapi.client
    .init({
      apiKey: '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',
      clientId:
        '653478787151-rtiim08kirr2rrqjg5ld1j5jju5f081k.apps.googleusercontent.com',
      ux_mode: 'redirect'
    })
    .then(function (e) {
      console.log(e)
    })
})

function App() {
  return (
    <AuthProvider>
      <ListProvider>
        <ProductProvider>
          <DirectionProvider>
            <OrderProvider>
              <SocketProvider>
                <Router>
                  <RouterApp />
                </Router>
              </SocketProvider>
            </OrderProvider>
          </DirectionProvider>
        </ProductProvider>
      </ListProvider>
    </AuthProvider>
  )
}

export default App
