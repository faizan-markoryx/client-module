import { useSelector } from 'react-redux'
import './App.css'
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import NavigationHeader from './component/header/NavigationHeader';

function App() {

  const { userData } = useSelector((state: any) => state?.user);
  const isUser = userData.isActive === 1 ? true : false
  const isAdmin = userData.role == 0 ? true : false


  const routing = useRoutes(routes(isUser, isAdmin));

  return (
    <>
    {isUser ? <NavigationHeader/> : null}
    {routing}
    </>
    )
    
    
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
    
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper