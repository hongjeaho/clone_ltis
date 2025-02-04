import { useState } from "react"

interface stateInfo {
  food?: string
}

const Home: React.FC = () => {
  const [state, setState] = useState<stateInfo>({});


  return <div>
    <div>{JSON.stringify(state)}</div>
    <Chlid setState={setState} state={state}></Chlid>
  </div>
}


interface ChildProps {
  state: stateInfo,
  setState: React.Dispatch<React.SetStateAction<stateInfo>>
}

const Chlid: React.FC<ChildProps> = ({state, setState}) => {

  const setFood = () => {
    setState((pre) => ({...pre, food: 'food'}))
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <button onClick={setFood}> Food 추가 하기 </button>
  </div>
}

export default Home
