import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainPage } from './pages/Main'
import { Route, Router, Switch } from 'wouter'
import { Header } from './components/Header'
import { Layout } from './components/Layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout
        header={<Header />}
        main={
          <Router base="/db-wiki-md2wiki">
            <Switch>
              <Route path="/"><MainPage /></Route>
            </Switch>
          </Router>
        }
      />
    </QueryClientProvider>
  )
}

export default App
