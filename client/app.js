import React from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />

      <StripeProvider apiKey="pk_test_Ps27Rz88orWwoLpKW4ZyiuL600L8nGpOL0">
        <Elements>
          <Routes />
        </Elements>
      </StripeProvider>
    </div>
  )
}

export default App
