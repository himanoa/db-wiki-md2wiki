import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainPage } from './pages/Main'
import { Route, Router, Switch } from 'wouter'
import { Header } from './components/Header'
import { Layout } from './components/Layout'
import { ChangelogPage } from './pages/Changelog'

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
              <Route path="/changelog"><ChangelogPage /></Route>
            </Switch>
          </Router>
        }
      />
    </QueryClientProvider>
  )
}

export default App
