// import './App.css'
// import styles from 'styles.module.css';

import { useState } from "react"
import { FormMachine } from "../FormMachine/FormMachine"
import { ListMachine } from "../ListMachine/ListMachine"


export const App = () => {
  const [reloadList, setReloadList] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <FormMachine setReloadList={setReloadList}/>
      <ListMachine reloadList={reloadList}/>
    </div>
  )
}

export default App
