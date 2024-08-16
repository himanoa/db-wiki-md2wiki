import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainPage } from './pages/Main'
import { Route, Router, Switch } from 'wouter'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router base="/db-wiki-md2wiki">
        <Switch>
          <Route path="/"><MainPage /></Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App
