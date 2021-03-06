import { createSwitchNavigator, createAppContainer } from "react-navigation"
import Login from './pages/Login'
import Home from './pages/Home'

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login,
      Home
    },
    {
      initialRouteName: 'Login'
    }
  )
)

export default Routes
