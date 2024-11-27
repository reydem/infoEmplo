// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/custom-ui/Asideleft.tsx
import { Component } from "react";
import Navegacion from "../layout/Navegacion";

export class Asideleft extends Component {
  render() {
    return (
      <aside className="sticky top-8 hidden w-64 shrink-0 lg:block ">
        {/* Left column area */}
        <Navegacion />
      </aside>
    )
  }
}

export default Asideleft
