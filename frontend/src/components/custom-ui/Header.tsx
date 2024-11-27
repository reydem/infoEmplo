// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/custom-ui/Header.tsx
import { Component } from "react";
import Logo from '../../assets/Logo.png';
import { Button } from '../ui';

export class Header extends Component {
  render() {
    return (
        <header className="shrink-0 border-b border-gray-200 bg-white mt-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <img
            alt="Your Company"
            src={Logo}
            className="h-8 w-auto"
          />
          <div>
            <Button color="dark">
              Entrar
            </Button>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
