import Config from '../../config';
import { Container } from 'unstated';

interface State {
  isLogin: boolean;
  userName: string;
}
class GlobalState extends Container<State> {
  state = {
    isLogin: false,
    userName: ''
  };
  login(userName: string, password: string) {
    for (const user of Config.users) {
      if (user.userName === userName && user.password === password) {
        localStorage.setItem('userName', userName);
        this.setState({
          isLogin: true,
          userName: userName
        });
        return true;
      }
    }
    this.setState({ isLogin: false });
    return false;
  }

  logout() {
    this.setState({ isLogin: false, userName: '' });
    localStorage.removeItem('userName');
    return;
  }
}
const global = new GlobalState();
export { global as default, GlobalState };
